from flask import Flask,request
import urllib.request as urllib2, json
from flask_cors import CORS,cross_origin



app= Flask(__name__)
app.config['SECRET_KEY'] = 'My key'
app.config['CORS_HEADERS'] = 'Content-Type'

cors = CORS(app, resources={r"/foo": {"origins": "http://localhost:port"}})

@app.route("/loans/marketplace", methods=['POST','GET'])
@cross_origin(origin='localhost',headers=['Content- Type','Authorization'])

def main():
    fields=""
    rating=""
    fields = request.args.get('fields') or fields
    rating= request.args.get('rating__eq') or rating
    params='?'+'fields='+fields+'&rating__eq='+rating
    req = urllib2.Request("https://api.zonky.cz/loans/marketplace"+params)
    req.add_header('X-Size', '10000')
    resp = urllib2.urlopen(req)
    data = resp.read()
    #with urllib.request.urlopen("https://api.zonky.cz/loans/marketplace"+params) as url:
    #    data = json.loads(url.read().decode())

    #return json.dumps(data)
    return data


if __name__== "__main__":
    app.run(debug=True,host="127.0.0.1",port=3003)