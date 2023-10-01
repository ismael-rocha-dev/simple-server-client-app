from flask import Flask, jsonify
from flask_cors import CORS
from services.read_measurements import read_measurements

app = Flask(__name__)
CORS(app)


@app.get("/api/")
def get_measurements():
    data = read_measurements()

    return jsonify(data)
