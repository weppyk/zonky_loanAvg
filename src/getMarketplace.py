import urllib.request, json

with urllib.request.urlopen("https://api.zonky.cz/loans/marketplace?fields=id,url") as url:
    data = json.loads(url.read().decode())
    print(data)