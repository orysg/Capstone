from flask import Flask, jsonify, render_template, request
import os
import pg8000
from datetime import datetime
import threading
import time

app = Flask(__name__, template_folder='templates')

DB_CONFIG = {
    'dbname': os.getenv('POSTGRES_DB', 'mydb'),
    'user': os.getenv('POSTGRES_USER', 'myuser'),
    'password': os.getenv('POSTGRES_PASSWORD', 'mysecret'),
    'host': os.getenv('POSTGRES_HOST', 'db'),  # 'db' is the docker compose service name
    'port': int(os.getenv('POSTGRES_PORT', 5432))
}

def get_db_connection():
    try:
        conn = pg8000.connect(
            database=DB_CONFIG['dbname'],
            user=DB_CONFIG['user'],
            password=DB_CONFIG['password'],
            host=DB_CONFIG['host'],
            port=DB_CONFIG['port']
        )
        return conn
    except Exception as e:
        print(f"Error connecting to the database: {e}")
        return None

def fetch_radar_data():
    conn = get_db_connection()
    if not conn:
        return []

    try:
        cursor = conn.cursor()
        cursor.execute("SELECT radarID FROM Radars")
        radars = cursor.fetchall()
        cursor.close()
        conn.close()

        mock_data = [{'radarID': radar[0], 'lastFallDetected': None} for radar in radars]
        return mock_data
    except Exception as e:
        print(f"Error fetching radar data: {e}")
        return []

MOCK_DATA_RUNTIME = fetch_radar_data()

@app.route('/')
def index():
    return render_template('control_panel.html')

@app.route('/api/mock-data')
def get_mock_api_data():
    return jsonify(MOCK_DATA_RUNTIME)

# non-persistent
@app.route('/api/add-radar', methods=['POST'])
def add_radar():
    radar_id = request.form.get('radarID', type=int)
    if radar_id is None:
        return "radarID parameter is required", 400

    for event in MOCK_DATA_RUNTIME:
        if event['radarID'] == radar_id:
            return f"Radar ID {radar_id} already exists", 400

    MOCK_DATA_RUNTIME.append({
        'radarID': radar_id,
        'lastFallDetected': None
    })
    return f"Radar ID {radar_id} added", 200

# non-persistent
@app.route('/api/remove-radar', methods=['POST'])
def remove_radar():
    radar_id = request.form.get('radarID', type=int)
    if radar_id is None:
        return "radarID parameter is required", 400

    MOCK_DATA_RUNTIME[:] = [r for r in MOCK_DATA_RUNTIME if r['radarID'] != radar_id]
    return f"Radar ID {radar_id} removed", 200

@app.route('/api/trigger-fall', methods=['POST'])
def trigger_fall():
    radar_id = request.form.get('radarID', type=int)
    if radar_id is None:
        return "radarID parameter is required", 400
    
    # Simulate a fall by updating the timestamp in the runtime data
    for event in MOCK_DATA_RUNTIME:
        if event.get('radarID') == radar_id:
            event['lastFallDetected'] = datetime.utcnow().isoformat() + 'Z'
            return jsonify(event), 200
    return f"Radar ID {radar_id} not found", 404

def auto_trigger_fall(radar_id, delay):
    time.sleep(delay)
    for event in MOCK_DATA_RUNTIME:
        if event.get('radarID') == radar_id:
            event['lastFallDetected'] = datetime.utcnow().isoformat() + 'Z'
            print(f"Auto-triggered fall for radar ID {radar_id}")

@app.route('/api/trigger-fall-delay', methods=['POST'])
def trigger_fall_delay():
    radar_id = request.form.get('radarID', type=int)
    delay = request.form.get('delay', type=int, default=5)
    if radar_id is None:
        return "radarID parameter is required", 400
    
    threading.Thread(target=auto_trigger_fall, args=(radar_id, delay)).start()
    return f"Scheduled fall for radar ID {radar_id} in {delay} seconds", 200

# Refresh data to match database
@app.route('/api/reset-template', methods=['POST'])
def reset_template():
    global MOCK_DATA_RUNTIME
    MOCK_DATA_RUNTIME = fetch_radar_data()
    return f"Reset to fresh radar data", 200

if __name__ == '__main__':
    app.run(
        debug=os.environ.get("FLASK_ENV") == "dev",
        host="0.0.0.0",
        port=5000
    )
