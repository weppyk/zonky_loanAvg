//connect to local files
function LocalConnector(url){
    this.url=url;
    this.filter="";
    this.urlHost="";
    this.localPath="";

    //return localPath of downloaded json api file by python script
    this.urlToLocal = function(){
        let arr = url.split("/");
        if (arr.length>3){
           this.localPath="api/" + arr.splice(3, arr.length).join("/")}
           this.urlHost=arr[0]+"//"+arr[2]; 
      return this.localPath;
    }
}

var url="https://api.zonky.cz/loans/marketplace?rating__eq=A";
var localCon=new localConnector(url);

alert(localCon.urlToLocal());