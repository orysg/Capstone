% Specify the directory path to traverse
baseDir = 'C:\Users\21289364\Desktop\radar\DataCollectionECG (2。28)\ImageGeneration\sample_raw_radar_dataset_without_image';


% Recursively traverse all files in the directory and subdirectories
fileList = getAllFiles(baseDir);


% Filter files based on whether the filename contains "I_raw"
filteredFiles = {};
for i = 1:length(fileList)
    [~, fileName, fileExt] = fileparts(fileList{i});
    if contains(fileName, 'I_raw')
        filteredFiles{end+1} = fileList{i};
    end
end


% Remove the characters after the last backslash (\) in each file path
for i = 1:length(filteredFiles)
    lastBackslash = find(filteredFiles{i} == filesep, 1, 'last');
    if ~isempty(lastBackslash)
        filteredFiles{i} = filteredFiles{i}(1:lastBackslash-1);
    end
end


% Print the file paths that meet the criteria
disp("Files with 'I_raw' in their names:");
disp(filteredFiles);

for i = 1:length(filteredFiles)
    currentFile = filteredFiles{i};
    generate_pic(currentFile);
end



% Function to recursively traverse the directory and subdirectories
function fileList = getAllFiles(dirPath)
    fileList = {};
    dirList = dir(dirPath);
    
    for i = 1:length(dirList)
        if dirList(i).isdir && ~strcmp(dirList(i).name, '.') && ~strcmp(dirList(i).name, '..')
            subDir = fullfile(dirPath, dirList(i).name);
            subFileList = getAllFiles(subDir);
            fileList = [fileList, subFileList];
        else
            fileList = [fileList, fullfile(dirPath, dirList(i).name)];
        end
    end
end

