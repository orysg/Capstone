FROM mathworks/matlab:r2023a

USER root

RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    && rm -rf /var/lib/apt/lists/*

USER matlab

COPY requirements.txt /app/requirements.txt

RUN pip3 install --no-cache-dir -r /app/requirements.txt

# ENV MLM_LICENSE_FILE=
# ENV MATHWORKS_USERNAME_FILE=/run/secrets/mw_username
# ENV MATHWORKS_PASSWORD_FILE=/run/secrets/mw_password

# WORKDIR /app

# COPY . /app

# COPY myscript.m ./

# CMD ["matlab","-batch","myscript"]