from repositories.Repository import DataRepository
from flask import Flask, request, jsonify, redirect
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


# Custom endpoint
endpoint = '/api/v1'


@app.route('/')
def index():
    return "Please visit API Path", 301

@app.route("/api/v1/klanten", methods=['GET', 'POST'])
def klanten():
    if request.method == "GET":
        data = DataRepository.read_klanten()
        return jsonify(data), 200
    elif request.method == "POST":
        data = DataRepository.create_klant("Bousson", "Karel","Baron Ruzettelaan", "5", "8310", "Assebroek")
        return jsonify(KlantID=data)


@app.route("/api/v1/klanten/<id>")
def klant(id):
    data = DataRepository.read_klant(id)
    if data is not None:
        return jsonify(data), 200
    else:
        return jsonify(message="error"), 404

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)
