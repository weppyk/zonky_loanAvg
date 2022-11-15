import React, {Component} from 'react';
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

class Connector extends Component{
    constructor(){
        super();
        this.state={
            datas: "NULL",
        };
    }

    componentDidMount(){}
    render(){

        return(
            <div>
                 {this.state.loanAvg}
                 
            </div>
        )
    }
}

export default Connector;
