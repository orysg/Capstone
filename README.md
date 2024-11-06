# Rudder Tech Fall Detection GUI

## Overview
This repository contains the code for the Rudder Tech Fall Detection GUI, which includes both frontend and backend services.

## Installation

### 1. Install [VS Code](https://code.visualstudio.com/download)
### 2. Install [Docker Desktop](https://docs.docker.com/desktop/install/windows-install/)

## Running the Application
If docker is up and running, use the following command in the root directory of the project
```bash
docker compose up -d
```

To force a rebuild add the following flag
```bash
docker compose up -d --build
```

And to stop the services
```bash
docker compose down
```

These commands and more are available as vs code tasks.

## Database
The database used by the backend is initiated solely through the docker compose files and is then configured by sequelize in the backend.
It's hosted on [http://localhost:5432](http://localhost:5432)

## Developer Tools
This repository contains a number of tools to aid with development such as a PostgresSQL explorer, Postman, and Docker (extension)
When developing within vscode there you will be suggested extensions that aid in this environment, as well as tasks that can be ran at terminal