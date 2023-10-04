from flask import Flask, abort, jsonify, request
from flask_cors import CORS
from services.read_measurements import read_measurements
import time

app = Flask(__name__)
CORS(app)

connected_clients_ips = []


@app.before_request
def before_request():
    global connected_clients_ips

    if len(connected_clients_ips) >= 10:
        abort(429, "Too many requests")

    connected_clients_ips.append(request.remote_addr)


@app.after_request
def after_request(response):
    global connected_clients_ips

    if response.status == "200 OK":
        connected_clients_ips.remove(request.remote_addr)

    return response


@app.get("/api/")
def get_measurements():
    data = read_measurements()

    return jsonify(data)


@app.get("/api/list-ips")
def list_ips():
    global connected_clients_ips

    return connected_clients_ips


@app.get("/api/test")
def test():
    time.sleep(5)

    return "ok"
