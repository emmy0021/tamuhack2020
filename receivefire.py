from flask import Flask, render_template, jsonify
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route("/ret_data",  methods=['POST'])  # consider to use more elegant URL in your JSs
def ret_data():
    from firebase import firebase
    import pandas as pd
    import pickle
    from firebase_admin import db
    import json

    firebase = firebase.FirebaseApplication("https://tamuhack2020-69538.firebaseio.com/", None)
    result = firebase.get('coord', '')

    print((result['Longitude']))

    x_pred = pd.DataFrame()
    x_pred['long'] = [result['Longitude']]
    x_pred['lat'] = [result['Latitude']]
    x_pred['temp'] = [result['Temperature']]

    classes = {1:'low risk', 2:'mild risk',3:'high risk'}
    knn = pickle.load(open('finalized_model.sav', 'rb'))
    y_pred = knn.predict(x_pred)

    for i in range(0, len(y_pred)):
        risk = classes[y_pred[i]]
        keys = 'coord'
        firebase.put(keys, 'Risk Level', risk)
        print(risk)

    df = pd.read_csv('graphing.csv')
    dict_json = {'long': list(df['longitude']), 'lat': list(df['latitude'])}
    # dict_json = dict_json.to_json()
    return jsonify(dict_json)

if __name__ == '__main__':
    app.run(debug=True)