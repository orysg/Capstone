# Mock API - Rudder Tech Fall Detection GUI

This is a Flask application that serves as a mock API for the Rudder Tech Fall Detection GUI.

## Getting Started

### Prerequisites
- Python 3.8+
- pip

### Installation

*This is service can be ran either via docker commands or otherwise to run on your own machine install the dependencies as described below*
```bash
pip install -r requirements.txt
```

### Running the Flask App

When in the same directory as the app.py file run
```bash
python app.py
```

You can then access the dashboard at [http://localhost:5000](http://localhost:5000)

### Integration

You can then integrate this by sending web requests to [http://localhost:4000](http://localhost:4000)/api/$ENDPOINT within the backend
Or if hosted elsewhere replace localhost with the public ip.