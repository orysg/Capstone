function generate_pic(file_path)

part_I_raw_name = 'I_raw';
part_Q_raw_name = 'Q_raw';
file_list = dir(fullfile(file_path, '*.csv'));
I_raw_name = '';
Q_raw_name = '';

for i = 1:numel(file_list)
    if contains(file_list(i).name, part_I_raw_name)
        I_raw_name = file_list(i).name;
    end

    if contains(file_list(i).name, part_Q_raw_name)
        Q_raw_name = file_list(i).name;
    end
end

if isempty(I_raw_name) || isempty(Q_raw_name)
    error('I_raw or Q_raw files not found in the specified directory.');
end

ts = 0.0082; % Sample time in sec

% Read raw data
rm = transpose(readmatrix([file_path, '\', I_raw_name], 'Range', [2, 4]) + ...
               1i .* readmatrix([file_path, '\', Q_raw_name], 'Range', [2, 4]));

[II, JJ, KK] = size(rm);  % Range map vector [rangebins x slowtime samples x five radars]
fprintf('The slowtime bins are: \t%i \nthe range bins are: \t%i\nthe radar nodes are: \t%i\n', JJ, II, KK)

win = ones(size(rm, 1), size(rm, 2));
NTS = II;
fs = NTS / ts;
Tsweep = ts;
Bw = 2.5e+09;

Data_time = rm(:,:);

tmp = fftshift(fft(Data_time .* win), 1);
Data_range(1:NTS/2, :) = tmp(NTS/2 + 1:NTS, :);
ns = oddnumber(size(Data_range, 2)) - 1;
Data_range_MTI = zeros(size(Data_range, 1), ns);

% Apply custom high-pass filter
alpha = 0.1;  % Set your desired alpha value for the filter
for k = 1:size(Data_range, 1)
    Data_range_MTI(k, 1:ns) = simple_high_pass_filter(Data_range(k, 1:ns), alpha);
end

freq = (0:ns-1) * fs / (2 * ns); 
range_axis = (freq * 3e8 * Tsweep) / (2 * Bw);
Data_range_MTI = Data_range_MTI(2:size(Data_range_MTI, 1), :);
Data_range = Data_range(2:size(Data_range, 1), :);

% Spectrogram and image generation
bin_indl = 1;
bin_indu = 93; % 93

MD.PRF = 1 / Tsweep;
MD.TimeWindowLength = 16;
MD.OverlapFactor = 0;
MD.OverlapLength = round(MD.TimeWindowLength * MD.OverlapFactor);
MD.Pad_Factor = 8;
MD.FFTPoints = MD.Pad_Factor * MD.TimeWindowLength;
MD.DopplerBin = MD.PRF / (MD.FFTPoints);
MD.DopplerAxis = -MD.PRF / 2:MD.DopplerBin:MD.PRF / 2 - MD.DopplerBin;
MD.WholeDuration = size(Data_range_MTI, 2) / MD.PRF;
MD.NumSegments = floor((size(Data_range_MTI, 2) - MD.TimeWindowLength) / floor(MD.TimeWindowLength * (1 - MD.OverlapFactor)));

Data_spec_MTI2 = 0;
Data_spec2 = 0;
for RBin = bin_indl:1:bin_indu
    Data_MTI_temp = fftshift(spectrogram(Data_range_MTI(RBin, :), MD.TimeWindowLength, MD.OverlapLength, MD.FFTPoints), 1);
    Data_spec_MTI2 = Data_spec_MTI2 + abs(Data_MTI_temp);                                
    Data_temp = fftshift(spectrogram(Data_range(RBin, :), MD.TimeWindowLength, MD.OverlapLength, MD.FFTPoints), 1);
    Data_spec2 = Data_spec2 + abs(Data_temp);
end

MD.TimeAxis = linspace(0, MD.WholeDuration, size(Data_spec_MTI2, 2));
Data_spec_MTI2 = flipud(Data_spec_MTI2);

sections = 8; % 8
sec_length = floor(size(Data_spec_MTI2, 2) / sections);

figure(1)
for sec = 1:1:sections
    imagesc(MD.TimeAxis, MD.DopplerAxis .* 3e8 / 2 / 5.8e9, 20 * log10(abs(Data_spec_MTI2(:, 1 + (sec - 1) * sec_length:sec * sec_length))));
    set(gca, 'LooseInset', [0, 0, 0, 0]);
    set(gca, 'ytick', [], 'xtick', [], 'yticklabel', [], 'xticklabel', []);
    axis normal;
    pic_path = [file_path, '\radar1_0', num2str(sec), '\'];
    mkdir(pic_path);
    saveas(gcf, [pic_path, num2str(sec), '.jpg']);
end

end

% Custom High-Pass Filter Function
function filteredSignal = simple_high_pass_filter(signal, alpha)
    filteredSignal = zeros(size(signal));
    filteredSignal(1) = signal(1);
    for n = 2:length(signal)
        filteredSignal(n) = alpha * (filteredSignal(n-1) + signal(n) - signal(n-1));
    end
end

% Function to ensure an odd number
function n = oddnumber(num)
    if mod(num, 2) == 0
        n = num + 1;
    else
        n = num;
    end
end
