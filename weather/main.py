from flask import Flask, jsonify, make_response
from flask_cors import CORS
import requests
import os

app = Flask(__name__)
CORS(app)

@app.route("/")
def health():
    return jsonify({"message": "The service is running"}), 200

@app.errorhandler(Exception)
def handle_error(error):
    response = {
        "message": "Internal server error",
        "error": str(error)
    }
    return make_response(jsonify(response), 500)

@app.route('/weather/<city>')
def get_weather(city):
    url = f"https://open-weather13.p.rapidapi.com/city/{city}/EN"
    headers = {
        'x-rapidapi-host': "open-weather13.p.rapidapi.com",
        'x-rapidapi-key': os.getenv("APIKEY") 
    }

    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status() 
        return jsonify(response.json())
    except requests.exceptions.HTTPError as e:
        return make_response(jsonify({"message": "HTTP error", "error": str(e)}), response.status_code)
    except requests.exceptions.RequestException as e:
        return make_response(jsonify({"message": "Request error", "error": str(e)}), 500)
    except Exception as e:
        return make_response(jsonify({"message": "Unexpected error", "error": str(e)}), 500)

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)
