
import torch
from torch.utils.data.dataset import Dataset
import os
from PIL import Image
import numpy as np
import re
import pandas as pd
class radar_dataset(Dataset):
    def __init__(self, root, data_type, view_name, transform=None, target_transform=None):
        self.x = []
        self.y = []
        self.root = root
        self.transform = transform
        self.target_transform = target_transform
        # root / <person>  / <action> / <item> / <view>.png
        for person in os.listdir(root):  # Label
            if person != '.DS_Store': #for macOS, skip the hidden file called .ds_store
                for actions in os.listdir(root + '/' + person + '/'):
                    views = []
                    # extract vis index
                    if re.findall(r"[0-9.]+", actions)[0] != '.': #some error found here in MacOS. Folders called '.' so added this check
                        lbls_dir = root + '/' + person +'/' + actions + '/label.csv'
                        lbls = pd.read_csv(lbls_dir, header=None, dtype='int').values
                        for view in range(len(view_name)):
                            for i in range(1,9):
                                imgnum = str(i)
                                img_names = os.listdir(
                                    root + '/' + person + '/' + actions + '/' + view_name[view] +imgnum+ '/')
                                vols = []
                                for img_name in img_names:
                                    vols.append(
                                        root + '/' + person + '/' + actions + '/' + view_name[view] +imgnum+ '/' + img_name)
                                views.append(vols)
                                self.x.append(vols)
                        lbls = lbls.reshape((8, 15)) #Assign each lbls to imgs


                        lbls = torch.from_numpy(lbls)
                        for i in lbls:
                            self.y.append(i)

    def __getitem__(self, index): # decode x,y,z lists
        #print(len(self.x))
        image_names = self.x[index]
        images = []
        # loop through
        for single in image_names:
            im = Image.open(single)
            im = im.convert('RGB')
            if self.transform is not None:
                im = self.transform(im)
            im = np.expand_dims(im, axis=0)
            images.append(im)

        return images, self.y[index]

    # Override to give PyTorch size of dataset
    def __len__(self):
        return len(self.x)

