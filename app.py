from flask import Flask, render_template
import requests

app = Flask(__name__)

@app.route('/api_data')
def get_api_data():
    # Make the API request
    try:
        response = requests.get('https://rudder_api_endpoint')
        #or
        #response = requests.get('https://rudder_api_endpoint', auth=('username', 'password')
        response.raise_for_status()  # Raise an exception for error status codes
        data = response.json() # temporary until we know data format
    except requests.exceptions.RequestException as e:
        # Handle the exception, e.g., log an error or display a message to the user
        print(f"Error: {e}")
    
    # Process the data and return it to the template
    return render_template('index.html', data=data)

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)