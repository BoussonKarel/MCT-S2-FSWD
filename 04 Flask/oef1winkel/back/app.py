from flask import Flask
from flask import request
from flask import jsonify
from flask_cors import CORS


app = Flask(__name__)

dictStock = {100: {'naam': 't-shirt', 'prijs': 18},
             101: {'naam': 'pull', 'prijs': 22},
             102: {'naam': 'koffie tas', 'prijs': 11}
             }


@app.route('/')
def hello_world():
    return 'ga naar de API url'

@app.route('/api/v1/products')
def products():
    return dictStock, 200

@app.route('/api/v1/payment', methods=['POST'])
def payment():
    try:
        product = request.form
        product_id = int(product["product"])
        aantal = int(product["aantal"])
        if(0 < aantal < 100 and product_id in dictStock.keys()):
            prijs = dictStock[product_id]["prijs"]
            print (f"{dictStock[product_id]['naam']} --> Besteld: {aantal}, Totaalprijs: {prijs*aantal}")
            # 201: Element is goed aangemaakt
            return jsonify(status="succes"), 201
        else:
            return jsonify(status="error"), 400
    except Exception as e:
        print(f"Fout: {ex}")
        return jsonify(status="error"), 500

if __name__ == '__main__':
    app.run(debug=True)