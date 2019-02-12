import React, { Component } from 'react';
import $ from 'jquery'; 
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

/*function $(id){
    return document.getElementById(id);
}*/


class LoanFilter extends Component{
    constructor(props){
        super(props);
        
        this.state={
            host:"http://127.0.0.1:3003",
            ratings:['AAAAA','AAAA','AAA','AA','A','B','C','D'],
            selectedRating:"",
            debug:true,
            url:"",
            marketplace: null,
            rating:"",
            ratingAverages:{}
        }
        this.filterOn = this.filterOn.bind(this);
        //this.addThousandSeparator=this.addThousandSeparator.bind(this);
        
    }
    addThousandSeparator = (stringNumber,separator)=> stringNumber.replace(/\B(?=(\d{3})+(?!\d))/g, separator); //add thousand separator to string number

    filterOn(e,item){
        e.preventDefault();
        e.stopPropagation();
        //console.log(this.state.ratingAverages[item]);
        $("#loanAvgResult").html(this.state.ratingAverages[item].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")); //show local saved Average before getting data
        $("#loadingStatus").html("loading..."); //show loading...
        let debug=this.state.debug;
        let ratingFilter="rating__eq="+item;  //make filter
        let url=this.state.host+"/loans/marketplace?"+ratingFilter;

        //Change stylo of filter buttons by active rating
        this.state.ratings.forEach(element => { //clear style from filter buttons
            $("#"+element).removeClass("button btnActived").addClass('button');
        });
        $("#"+item).removeClass('button').addClass("button btnActived"); //change style on actived button

        //Debug
        if(debug){
            console.log("url of gettin file: ", url);
        }

        //set url state
        this.setState((state, props) => {
            return {url: url,rating:item}
        });
        this.getJsonData(item);
       
        
    }

    componentDidMount(item){
        let debug=this.state.debug;

        //get average counted data from local file/url
       fetch("/api/loansRatingsAvg.json")
       .then(response => response.json())
       .then(ratingAverages => {
            this.setState({ratingAverages});

            //Debug object json
            if(debug===true){
                console.log("ratingAverages: ",this.state.ratingAverages);
            }
        })
    }
    getJsonData(rating){
        let debug=this.state.debug;
        //let proxyUrl = 'https://cors-anywhere.herokuapp.com/'
        //var targetUrl = 'http://catfacts-api.appspot.com/api/facts?number=99';
        //var targetUrl = 'https://api.zonky.cz/loans/marketplace';
        //var targetUrl = 'http://127.0.0.1:3003/loans/marketplace';
        /*
        fetch(proxyUrl + targetUrl,{
            method:"HEAD",
            headers:{
            //"Content-Type": "application/json",
            "User-Agent":"zonky_loanAvg/0.3.0 (https://github.com/weppyk/zonky_loanAvg)"
        },credentials:"same-origin"
        })
        .then(blob => blob.json())
        .then(data => {
            console.log(data);
            console.table(data);
            document.querySelector("pre").innerHTML = JSON.stringify(data, null, 2);
            return data;
        })
        .catch(e => {
            console.log(e);
            return e;
        });*/

        //var url='https://api.zonky.cz/loans/marketplace?fields=id,amount,rating&rating__eq=A'; //request pattern
        //let url='/api/loans/marketplace_rating__eq='+item+'.json'; //nastavit testy existence ciloveho souboru //local
        //let url=host+'/loans/marketplace?rating__eq='+item; //nastavit testy existence ciloveho souboru
        
        //Fetch json file
        let targetUrl = this.state.host+'/loans/marketplace?fields=id,amount&rating__eq='+rating
        //if (typeof rating !== 'undefined' && rating !== null && rating !=="") {
        let ratingAverages=this.state.ratingAverages;

        fetch(targetUrl)
        .then(response => response.json())
        .then(marketplace => {
            this.setState({marketplace});
            
            //Debug object json
            if(debug===true){
                console.log("Getted object: ",this.state.marketplace);
            }

            //Count average, add dot thousand separator and change on website
            let average=Math.floor(this.countLoanAvg(rating)).toString();
            ratingAverages[rating]=average; //save average to json
            this.setState({ratingAverages}); //save json to global this
            average=this.addThousandSeparator(average,'.');
            $("#loanAvgResult").html(average);
            $("#loadingStatus").html("");
        }) 
        .catch(error => {
            console.log(error);
            if(error.message==="Failed to fetch"){
                console.log("zdroj je nedostupný")
               $("#loadingStatus").html("Zdroj je nedostupný, nelze aktualizovat data. Pravděpodobně neběží flaskServer.");
            }
            return error;
            
        });              
       //} 
    }

    //Count average of array
    countLoanAvg(item) {
        let sum=0, average = 0;
        let marketplace=this.state.marketplace;
        var i=0;

        //count sum and average from marketplace.amount
        do {
            sum+=marketplace[i].amount;
            i++;
        } while (i<marketplace.length);

        average=sum/marketplace.length;

        //debug sumar,amount,average
        if(this.state.debug){
            console.log("Sumar loans: ",sum);
            console.log("Loans amount: ",marketplace.length);
            console.log("Average amount: ",average);
        }
        return average
    }

    render() {
        return(
            <div>
                <ul className="filter">
                    {this.state.ratings.map(item => (
                        <li id={item} key={item} className="button" onClick={((e) => this.filterOn(e,item))}>{item}</li>
                    ))}
               </ul>
            </div>

        )
    }
}

export default LoanFilter;