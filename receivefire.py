from firebase import firebase
import pandas as pd
import pickle

firebase = firebase.FirebaseApplication("https://tamuhack2020-69538.firebaseio.com/", None)
result = firebase.get('/tamuhack2020-69538/Firedata', '')

lon = []
lat = []
temp = []
key = []

for k, v in result.items():
    key.append(k)
    lon.append(v['Longitude'])
    lat.append(v['Latitude'])
    temp.append(v['Temperature'])

x_pred = pd.DataFrame()
x_pred['long'] = lon #[result['-LzTzhOdtDarUbuf1UrP']['Longitude']]
x_pred['lat'] = lat #[result['-LzTzhOdtDarUbuf1UrP']['Latitude']]
x_pred['temp'] = temp #[result['-LzTzhOdtDarUbuf1UrP']['Temperature']]

classes = {1:'low risk', 2:'mild risk',3:'high risk'}
knn = pickle.load(open('tamuhack2020/finalized_model.sav', 'rb'))
y_pred = knn.predict(x_pred)

for i in range(0, len(y_pred)):
    risk = classes[y_pred[i]]
    keys = '/tamuhack2020-69538/Firedata/' + key[i]
    firebase.put(keys, 'Risk Level', risk)
    print(risk)