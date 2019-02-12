import requests,json,time

class ZonkyDownloader:
    def __init__(self,url="https://api.zonky.cz/loans/marketplace?fields=id,amount,rating&rating__eq="):
        self.ratings=['AAAAA','AAAA','AAA','AA','A','B','C','D']
        self.repeatTime=1000 #time in seconds to repeat get json files
        self.url=url
        self.headers= {
            'user-agent': 'my-app/0.0.1',
            'X-Page':'0',
            'X-Size':'10000'
            }
        self.mpJson={} #response from zonky api in json format
        self.starttime= starttime=time.time()

    #return json object from url
    def getMarketplace(self,rating):
        r=requests.get(self.url+rating,headers=self.headers)        
        self.mpJson=r.json()
        return self.mpJson
    #save json on disk
    def saveOnDisk(self,rating):
        with open("public/api/loans/marketplace_rating__eq="+rating+".json", "w") as outfile:
            json.dump(self.getMarketplace(rating), outfile)
        return "marketplace.json was saved"
    #repeat downloading json files file every timer seconds
    def runtimer(self):
        while True:
            #print "tick"
            for rating in self.ratings:
                print(self.saveOnDisk(rating))
            time.sleep(self.repeatTime - ((time.time() - self.starttime) % self.repeatTime))



zonloader = ZonkyDownloader()
#print(zonloader.getMarketplace())d
zonloader.runtimer()