from repositories.DataRepository import DataRepository
from flask import Flask, jsonify, request
from flask_cors import CORS

# Start app
app = Flask(__name__)
CORS(app)

# Custom endpoint
endpoint = '/api/v1'


# ROUTES
@app.route('/')
def index():
    return "PLEASE VISIT API ROUTE"

@app.route(endpoint+'/')
def api():
    return "Welcome to API"


@app.route(endpoint+'/bestemmingen', methods=['GET'])
def bestemmingen():
    # GET: alle treinen ophalen
    return jsonify(DataRepository.read_bestemmingen()), 200


@app.route(endpoint+'/treinen', methods=['GET', 'POST'])
def treinen():
    # GET: alle treinen ophalen
    if request.method == 'GET':
        return jsonify(DataRepository.read_treinen()), 200
    # POST: trein toevoegen
    elif request.method == 'POST':
        gegevens = DataRepository.json_or_formdata(request)
        data = DataRepository.create_trein(
            gegevens["vertrek"],
            gegevens["bestemmingID"],
            gegevens["spoor"],
            gegevens["vertraging"],
            gegevens["afgeschaft"]
            )
        return jsonify(treinid=data), 201


@app.route(endpoint+'/treinen/<trein_id>', methods=['GET', 'PUT', 'DELETE'])
def trein(trein_id):
    # GET: specifieke trein ophalen
    if request.method == 'GET':
        return jsonify(DataRepository.read_trein(trein_id)), 200
    # PUT: trein informatie updaten
    elif request.method == 'PUT':
        gegevens = DataRepository.json_or_formdata(request)
        data = DataRepository.update_trein(
            gegevens["vertrek"],
            gegevens["bestemmingID"],
            gegevens["spoor"],
            gegevens["vertraging"],
            gegevens["afgeschaft"],
            trein_id
            )
        if data is not None:
            if data > 0:
                return jsonify(idtrein = trein_id), 200
            else:
                return jsonify(status = data), 200
        else:
            return jsonify(message = "error"), 404
    # DELETE: trein verwijderen
    elif request.method == 'DELETE':
        data = DataRepository.delete_trein(trein_id)
        return jsonify(data)


@app.route(endpoint+'/treinen/<trein_id>/vertraging', methods=['PUT'])
def trein_vertraging(trein_id):
    gegevens = DataRepository.json_or_formdata(request)
    data = DataRepository.update_trein_vertraging(trein_id, gegevens["vertraging"])
    if data is not None:
        return jsonify(status="OK"), 200
    else:
        return jsonify(message="Error"), 404


@app.route(endpoint+'/treinen/bestemming/<bestemming_id>', methods=['GET'])
def treinen_met_bestemming(bestemming_id):
    # GET: alle treinen ophalen met bestemming _
    return jsonify(DataRepository.read_treinen_met_bestemming(bestemming_id)), 200


# Start app
if __name__ == '__main__':
    app.run(debug=True)
