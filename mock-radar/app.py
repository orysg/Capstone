from flask import Flask, jsonify, render_template, request
import os
import copy

app = Flask(__name__, template_folder='templates')

MOCK_DATA_TEMPLATES = {
    'a': [
        {
            'case': 1,
            'responders': [123, 213],
            'fallen': False
        }
    ],
    'b': [
        {
            'case': 2,
            'responders': [123],
            'fallen': False
        }
    ],
    'c': [
        {
            'case': 3,
            'responders': [123, 213],
            'fallen': False
        },
        {
            'case': 4,
            'responders': [123],
            'fallen': False
        }
    ],
    'd': [
        {}
    ]
}

TEMPLATE_ID = 'a'
MOCK_DATA = copy.deepcopy(MOCK_DATA_TEMPLATES[TEMPLATE_ID])

@app.route('/')
def index():
    return render_template('control_panel.html')

@app.route('/api')
def get_mock_api_data():
    return jsonify(MOCK_DATA)

@app.route('/switch-template', methods=['POST'])
def switch_template():
    global MOCK_DATA, TEMPLATE_ID
    id = request.form.get('id')
    if id not in MOCK_DATA_TEMPLATES:
        return f"Invalid template id. Available options are: {', '.join(MOCK_DATA_TEMPLATES.keys())}", 400
    TEMPLATE_ID = id
    MOCK_DATA = copy.deepcopy(MOCK_DATA_TEMPLATES[TEMPLATE_ID])
    return f"Switched to template '{TEMPLATE_ID}'", 200

@app.route('/trigger-fall', methods=['POST'])
def trigger_fall():
    case = request.form.get('case', type=int)
    if case is None:
        return "Case parameter is required", 400
    for event in MOCK_DATA:
        if event.get('case') == case:
            event['fallen'] = True
            return f"Triggered fall for case {case}", 200
    return f"Case {case} not found", 404

@app.route('/reset-template', methods=['POST'])
def reset_template():
    global MOCK_DATA
    MOCK_DATA = copy.deepcopy(MOCK_DATA_TEMPLATES[TEMPLATE_ID])
    return f"Reset template '{TEMPLATE_ID}'", 200

if __name__ == '__main__':
    app.run(
        debug=os.environ.get("FLASK_ENV") == "dev",
        host="0.0.0.0",
        port=5000
    )
