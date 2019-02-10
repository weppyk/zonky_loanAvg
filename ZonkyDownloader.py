import requests,json,time

class ZonkyDownloader:
    def __init__(self,url="https://api.zonky.cz/loans/marketplace?rating__eq=A"):
        self.url=url
        self.mpJson={} #response from zonky api in json format
        self.starttime= starttime=time.time()

    #return json object from url
    def getMarketplace(self):
        r=requests.get(self.url)        
        self.mpJson=r.json()
        return self.mpJson
    #save json on disk
    def saveOnDisk(self):
        with open("api/loans/marketplace?rating__eq=A", "w") as outfile:
            json.dump(self.getMarketplace(), outfile)
        return "marketplace.json was saved"
    #repeat downloading json file every timer seconds
    def runtimer(self,timer):
        while True:
            #print "tick"
            print(self.saveOnDisk())
            time.sleep(timer - ((time.time() - self.starttime) % timer))



zonloader = ZonkyDownloader()
#print(zonloader.getMarketplace())d
zonloader.runtimer(360)