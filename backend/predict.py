

loaded_model = pickle.load(open(filename, 'rb'))

print(classes[loaded_model.predict(x_pred)[0]])