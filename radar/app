from flask import Flask, render_template, request, abort
from flask_cors import CORS
import requests

USE_MOCK_API = True

# Use env vars
# https://github.com/theskumar/python-dotenv#readme
RUDDER_API_URL = 'https://rudder_api_endpoint'
API_URL = 'http://localhost:5001/mock_api' if USE_MOCK_API else 'https://rudder_api_endpoint'

app = Flask(__name__, template_folder='../templates')
CORS(app, resources={r"/api_data": {"origins": "http://localhost:3000"}})

@app.route('/api_data')
def get_api_data():
    try:
        response = requests.get(API_URL)
        response.raise_for_status()
        data = response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error: {e}")
    
    # for event in data:
    #     if request.args.get('username') in event['responders']:
    #         return data
    # Push server sent events here instead of being request based

    return data

@app.route('/')
def index():
    data = [
        {
            'case': 0,
            'responders': [000, 999],
            'fallen': False
        }
    ]
    return render_template('index.html', data=data)

if __name__ == '__main__':
    app.run(debug=True)