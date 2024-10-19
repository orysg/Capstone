
import os
import argparse
import numpy as np
from sklearn import metrics
import torch
import torch.nn as nn
from torch.utils.data import DataLoader
import torchvision.transforms as transforms
import pandas as pd
from itertools import groupby
from dataset import radar_dataset
from itertools import chain
def load_model(model, path):
    # Load model weights from the saved path
    checkpoint = torch.load(path)
    model.load_state_dict(checkpoint,map_location=torch.device('cpu'))  # Load the state dict into the model
    model.eval()  # Set the model to evaluation mode
    return model
os.environ["CUDA_DEVICE_ORDER"] = "PCI_BUS_ID"
os.environ["CUDA_VISIBLE_DEVICES"] = "0,1"

parser = argparse.ArgumentParser(description="LearnToPayAttn-CT2D")
parser.add_argument("--outf", type=str, default="logs", help='path of log files')
parser.add_argument("--attn_mode", type=str, default="RadarGRU_enlarge",
                    help='insert attention modules before OR '
                         'after maxpooling layers')
parser.add_argument("--batch_size", type=int, default=1,
                    help="batch size")  # can be changed to save space if memory is not sufficient
parser.add_argument("--normalize_attn", action='store_true',
                    help='if True, attention map is normalized by softmax; otherwise use sigmoid')

parser.add_argument("--log_images", action='store_true', help='log images and (is available) attention maps')

opt = parser.parse_args()


def main():
    print('\nloading the dataset ...\n')
    num_aug = 1
    im_size_h = 32
    im_size_w = 31

    vgg_data_transform = {
        'train': transforms.Compose([
            transforms.Resize((im_size_h, im_size_w)),
            transforms.ToTensor(),
        ]),
        'val': transforms.Compose([
            transforms.Resize((im_size_h, im_size_w)),
            transforms.ToTensor(),
        ]),
    }
    # data directory
    test_dir = 'Dataset_test'

    # load data set - multi-features
    testset = radar_dataset(test_dir, 'test', ['radar1_0'],
                                      transform=vgg_data_transform[
                                          'val'])

    testloader = DataLoader(testset, batch_size=opt.batch_size, shuffle=False, num_workers=0)

    print('done')

    #criterion = nn.CTCLoss(reduction='mean', zero_infinity=True)
    criterion = nn.CTCLoss(reduction='mean', zero_infinity=True, blank=0)
    print('done')

    ## move to GPU
    print('\nmoving to GPU ...\n')
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    model = torch.load('model_with_architecture.pth')
    # model = load_model(net, os.path.join('logs_test_youzhang_ceiling_1.5m_enlarge/best_model.pth'))
    criterion.to(device)
    print('done')


    total = 0
    correct = 0

    with torch.no_grad():
        # newly added for classification evaluation
        test_labels = []
        test_predictions = []
        score_test_pre = []
        # log scalars
        for i, data in enumerate(testloader, 0):
            images_test, labels_test = data
            # newly added by looking at controller
            images_test = np.stack(images_test, axis=1)
            batch_size = images_test.shape[0]
            images_test = torch.from_numpy(images_test)
            images_test = torch.transpose(images_test, 2, 3)
            images_test, labels_test = images_test.to(device), labels_test.to(
                device)
            # forward
            pred_test = model(images_test)
            # backward
            pred_test = pred_test.view(batch_size, 1 * 32, 10)
            pred_test = pred_test.permute(1, 0, 2)
            labels_test = labels_test.view(batch_size, 1 * 15)
            test_labels.append(labels_test.cpu().numpy().tolist())
            _, max_index = torch.max(pred_test, dim=2)  # max_index.shape == torch.Size([32, 64])
            for k in range(opt.batch_size):
                raw_prediction = list(max_index[:, k].detach().cpu().numpy())  # len(raw_prediction) == 32
                prediction = torch.IntTensor([c for c, _ in groupby(raw_prediction) if c != 0])
                if len(prediction) == len(labels_test[k]):
                    for j in range(len(prediction)):
                        if prediction[j] == labels_test[k,j]:
                            correct += 1
                test_predictions.append(prediction.numpy().tolist())
                total += 15
        test_accuracy = 100 * correct / total
        print("\naccuracy on test data: %.2f%%\n" % (100 * correct / total))
        #print("len:")
        test_labels = list(chain.from_iterable(test_labels))
        test_labels = list(chain.from_iterable(test_labels))
        test_predictions = list(chain.from_iterable(test_predictions))

        pd.DataFrame(test_labels).to_csv('Ground Truth Labels.csv')
        pd.DataFrame(test_predictions).to_csv('Predict Labels.csv')

        if len(test_labels) == len(test_predictions):
            test_acc = metrics.accuracy_score(test_labels, test_predictions)
            recall = metrics.recall_score(test_labels, test_predictions, average='macro')
            precision = metrics.precision_score(test_labels, test_predictions, average='macro')
            cm = metrics.confusion_matrix(test_labels, test_predictions)
            labels_display = [1,2,3,4,5,6,7,8,9]
            # disp = ConfusionMatrixDisplay(confusion_matrix=cm, display_labels=labels_display)
            # disp.plot(cmap=plt.cm.Blues)
            # plt.savefig('confusion_matrix.png', format='png')

            #writer.add_figure("Confusion matrix", disp, epoch)

            test_sens = float(cm[1, 1]) / float(cm[1, 1] + cm[1, 0])
            test_spec = float(cm[0, 0]) / float(cm[0, 0] + cm[0, 1])
            F1 = metrics.f1_score(test_labels, test_predictions, average='macro')
            print("test_acc:", test_acc, '\n', "test_sens:", test_sens, '\n', # "test_auc:", test_auc, '\n',
                  #"test_ave_precision:", test_ave_precision, '\n',
                  "test_F1:", F1, '\n',
                  "test_recall:", recall, '\n', "test_precision:", precision, '\n', "test_spec :", test_spec)

if __name__ == "__main__":
    main()

