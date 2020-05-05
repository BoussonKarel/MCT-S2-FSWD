# Imports
from flask import Flask, request, jsonify
import random
from flask_cors import CORS


# Custom imports
from repositories.DataRepository import DataRepository

# Start app
app = Flask(__name__)
CORS(app)


endpoint = '/api/v1'


# BACKEND - NIET WIJZIGEN!!
# Deze route wordt gebruikt voor het ophalen van de genres in de keuzelijst
@app.route(endpoint + '/elementen', methods=['GET'])
def get_elementen():
    if request.method == 'GET':
        s = DataRepository.read_elements()
        return jsonify(s), 200


@app.route(endpoint + '/elementen/<elementen_id>', methods=['GET'])
def get_element(elementen_id):
    if request.method == 'GET':
        s = DataRepository.read_element_by_atomicnumber(elementen_id)
        return jsonify(s), 200


@app.route(endpoint + '/elementen/types/<type_id>', methods=['GET'])
def get_elementen_by_type(type_id):
    if request.method == 'GET':
        s = DataRepository.read_elements_by_type(type_id)
        return jsonify(s), 200


@app.route(endpoint + '/types', methods=['GET'])
def get_types():
    if request.method == 'GET':
        s = DataRepository.read_types()
        return jsonify(s), 200

@app.route(endpoint + '/types/<value>', methods=['GET', 'PUT'])
def get_type_by_zoekstring(value):
    if request.method == 'GET':
        s = DataRepository.read_types_by_zoekstring(value)
        return jsonify(s), 200
    elif request.method == 'PUT':
        gegevens = DataRepository.json_or_formdata(request)

        # Typefout in opgave postman
        try:
            code = gegevens["type_code"]
        except KeyError:
            code = gegevens["typeCode"]

        data = DataRepository.update_type(value, code)
        if (data > 0):
            return jsonify(response=f"Genre {value} aangepast naar {code}"), 200
        else:
            return jsonify(error=f"Type {value} niet gevonden in de database"), 404

@app.route(endpoint + '/nieuwtype', methods=['POST'])
def add_type():
    if request.method == 'POST':
        gegevens = DataRepository.json_or_formdata(request)
        nieuw_id = DataRepository.create_type(gegevens['typeCode'], gegevens['type'])
        return jsonify(typeID=nieuw_id), 201

@app.route(endpoint + '/jaren', methods=['GET'])
def get_unique_years():
    if request.method == 'GET':
        s = DataRepository.read_jaartallen()
        return jsonify(s), 200

# Start app
if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)
