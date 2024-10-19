from flask import Flask
from multiprocessing import Process

# This will be tedious to implement with docker

def create_app():
    app = Flask(__name__)

    @app.route('/')
    def index():
        return "Hello from the Flask app!"

    return app

def run_app(port):
    app = create_app()
    app.run(port=port)

if __name__ == "__main__":
    MAX_PROCESSES = 8

    p1 = Process(target=run_app, args=(5001,))
    p2 = Process(target=run_app, args=(5002,))

    p1.start()
    p2.start()

    p1.join()
    p2.join()
