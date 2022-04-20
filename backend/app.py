from dotenv import load_dotenv
import ast
from email.message import Message
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin # source https://stackoverflow.com/questions/25594893/how-to-enable-cors-in-flask
app = Flask(__name__)
cors = CORS(app)
# app.config['CORS_HEADERS'] = 'Content-Type'

load_dotenv()

from twitch_sentiment_model import predict
import numpy as np
import pandas as pd
messages = ["omegalul"]
messages_df = pd.DataFrame({'msgs' : messages}) # messages is an array
messages_w2v, embed_size = predict.setup_w2v(messages_df)
bert_tokenizer, model = predict.setup_model(messages, embed_size)

# test predict
print("Test Predict", predict.predict(messages_df.msgs, messages_w2v, bert_tokenizer, model))
messages_w2v, embed_size = predict.setup_w2v(messages_df)


@app.route('/')
@cross_origin()
def hello(): # replace thing to send webpage
    return 'Hello, World!' 

@app.route('/sentiment',methods=['POST'])
@cross_origin()
def run_inference():
    # run predict function on what they sent us
    messages = ast.literal_eval(request.get_data().decode('utf8'))['messages']
    messages_df = pd.DataFrame({'msgs' : messages}) 
    messages_w2v, embed_size = predict.setup_w2v(messages_df)
    prediction = predict.predict(messages_df.msgs, messages_w2v, bert_tokenizer, model)

    # response = jsonify({"sentiment":prediction})
    response = jsonify({"sentiment":np.mean(prediction)})
    # response.headers['Access-Control-Allow-Origin'] = "*"
    # response.headers.add('Access-Control-Allow-Methods', 'POST')
    # response.headers.add('Access-Control-Allow-Headers', 'Content-Type')

    return response