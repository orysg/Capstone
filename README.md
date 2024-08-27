# Rudder Tech Fall Detection GUI

## Installation
### 1. Install [VS Code](https://code.visualstudio.com/download)
### 2. Install the [Dev Containers Extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
Additional information on [Dev Containers](https://code.visualstudio.com/docs/devcontainers/containers)
### 2. Install Docker
VS Code will ask you to install this as a requirement for the Dev Containers
It may recommend either [Docker Desktop](https://docs.docker.com/desktop/install/windows-install/), otherwise it may also attempt to install a Docker CLI if for example you have Ubuntu WSL
### 3. Add this repository as a Dev Volume
a) Navigate to the Remote Explorer tab  
b) Near the bottom of this side window there will be a section for Dev Volumes  
c) Create one of this repository
> The reason for using a Dev Volume is that I experienced some issues with line returns and github considering every file modified as a result
