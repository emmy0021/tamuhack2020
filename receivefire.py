from firebase import firebase
import pandas as pd
import pickle

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