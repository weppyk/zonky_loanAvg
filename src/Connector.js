import React, {Component} from 'react';
//import $ from 'jquery';

var getJSON = function(url, callback) {
    var xhr = new XMLHttpRequest();
    
    xhr.open('GET', url, true);
    xhr.setRequestHeader('Target-Endpoint','https://api.zonky.cz/loans/marketplace');
    xhr.withCredentials = false;
    xhr.setRequestHeader('Content-Encoding','gzip');
    xhr.setRequestHeader('Access-Control-Allow-Origin','*');
    xhr.setRequestHeader('Content-Type','application/json;charset=UTF-8');
    xhr.setRequestHeader('User-Agent','zonky_LoanAvg/1.0 (https://github.com/weppyk/zonky_loanAvg)');
    xhr.setRequestHeader("Accept","*/*");
    xhr.setRequestHeader('Connection','keep-alive');
    xhr.setRequestHeader('Keep-Alive','timeout=3');
    xhr.setRequestHeader('Vary','Accept-Encoding');
    xhr.setRequestHeader('X-Requested-With','XMLHttpRequest');
    xhr.setRequestHeader('Access-Control-Allow-Credentials','true');
    xhr.setRequestHeader('Strict-Transport-Security','max-age=31536000 ; includeSubDomains, max-age=31536000; includeSubDomains; preload');
    xhr.setRequestHeader('Content-Security-Policy',"default-src https: 'unsafe-inline' 'unsafe-eval' data: blob:; connect-src 'self' https://api.zonky.cz;");
    xhr.setRequestHeader('X-Frame-Options','DENY');
    
    //xhr.setRequestHeader('Access-Control-Max-Age',)
    //xhr.responseType = 'json';
    


    xhr.onload = function() {
    
        var status = xhr.status;
        
        if (status === 200) {
            callback(null, xhr.response);
        } else {
            callback(status);
        }
    };
    
    xhr.send();
};

//getJSON('http://time.jsontest.com',  function(err, data) {
getJSON('https://zonkycors.herokuapp.com/',  function(err, data) {
           
    if (err != null) {
        console.error(err);
    } else {
        
        var text = `Date: ${data.date}
Time: ${data.time}
Unix time: ${data.milliseconds_since_epoch}`
    
        console.log(text);
    }
});

/*
$.ajax({
    url: "https://api.zonky.cz/loans/marketplace",
    dataType: "jsonp",
    /*accepts: "application/json",*//*
    type: "GET",
    xhrFields: {
        withCredentials:true
    },
    beforeSend: function(xhrObj){
        xhrObj.setRequestHeader("Accept","application/json");
    }
})
//var urllib = require('urllib');

/*var xmlhttp = new XMLHttpRequest();
var url= "https://api.zonky.cz/loans/marketplace?fields=id,url"




xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var myArr = JSON.parse(this.responseText);
    console.log(myArr)
    //myFunction(myArr);
  }
};
xmlhttp.open("GET", url, true);
xmlhttp.setRequestHeader( 'User-Agent', 'zonky_LoanAvg/1.0 (https://github.com/weppyk/zonky_loanAvg)' );
xmlhttp.send();


function myFunction(arr) {
  var out = "";
  var i;
  for(i = 0; i < arr.length; i++) {
    out += '<a href="' + arr[i].url + '">' + 
    arr[i].display + '</a><br>';
  }
  document.getElementById("id01").innerHTML = out;
}
*/



//var data = require('../src/data/marketplace.json');
//console.log(data);

//count average value of loans
/*function loanAvg(loans){
    var i, x=0;
    for(i in data){
        x+= data[i].amount;
    }
    console.log(Object.keys(data).length);
    x=x/Object.keys(data).length;
    
    return x;
}*/
//console.log(loanAvg(data));


/*test připojení
let loadPosts = function () {
    let xhr = new XMLHttpRequest();
    xhr.open("POST",
    "https://localhost:3000/?url=https://api.zonky.cz/loans/marketplace"); // assuming you’re hosting it locally
    xhr.setRequestHeader("Content-type", "application/json");
    let data = {
    headers: {
    Accept: "application/json",
    Origin: "https://zonky.cz"
    },
    method: 'GET'
    };
    xhr.send(JSON.stringify(data));
}
var test=loadPosts();*/
/*
var myHeaders = new Headers();

var myInit = { method: 'GET',
               headers: myHeaders,
               mode: 'cors',
               cache: 'default' };
var myRequest = new Request('https://api.zonky.cz/loans/marketplace', myInit);*/

class Connector extends Component{
    constructor(){
        super();
        this.state={
            //loanAvg: loanAvg(data),
            datas: "NULL",
        };

    }

   componentDidMount(){
        
     
        /*fetch('https://api.zonky.cz/loans/marketplace', { 
            mode:'cors',
            method: 'get', 
            headers: new Headers({
            //'Authorization': 'Basic '+btoa('username:password'), 
            //'Content-Type': 'application/json',
            //'User-Agent':'zonky_LoanAvg/v0.1 (https://github.com/weppyk/zonky_loanAvg)'
            'User-Agent':'python-requests/2.21.0',
            'Accept-Encoding':'gzip, deflate',
            'Accept':'*//*',
            'Connection':'keep-alive'
            }), 
            //body: 'A=1&B=2'
        })
        .then(function(myBlob){
            //var objectURL = URL.createObjectURL(myBlob);
            //console.log(objectURL)
            console.log(myBlob)
        });*/
        //console.log(this.state.datas);
    }
    render(){

        return(
            <div>
                 {this.state.loanAvg}
                 
            </div>
        )
    }

}



export default Connector;