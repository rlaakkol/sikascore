from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
import json

app = Flask(__name__)
mongo = PyMongo(app)

@app.route('/<id>')
def gamedata(id):
    games = mongo.db.games
    if request.method == 'PUT':
        data = json.loads(request.data)
        data['game_id'] = id
        games.insert_one(data)
        return 'success!'
    else:
        data = games.find_one({'game_id': id})
        return jsonify(data)
