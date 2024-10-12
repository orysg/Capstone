# Use an official Ubuntu base image
FROM ubuntu:20.04

# Set the working directory
WORKDIR /app

# Install necessary packages
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    wget \
    unzip \
    && rm -rf /var/lib/apt/lists/*

# Copy your compiled MATLAB .exe and Python script into the image
COPY apply_generate_pic_to_datasets.exe /app/
COPY app.py /app/

# Copy the extracted MATLAB Runtime files into the image
COPY MATLAB_Runtime_R2024b_win64 /opt/matlab_runtime

# Install MATLAB Runtime (Adjust according to the correct installation path)
RUN /opt/matlab_runtime/install -mode silent -agreeToLicense yes

# Install Python dependencies
COPY requirements.txt /app/
RUN pip3 install -r requirements.txt

# Command to run your app
CMD ["python3", "app.py"]
