from flask import Flask, jsonify
from services.read_measurements import read_measurements

app = Flask(__name__)


@app.get("/")
def get_measurements():
    data = read_measurements()

    return jsonify(data)
