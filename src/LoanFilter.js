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
    
    //if new process is runing and old simultaneously, stop old process
    stopPreviousProcess = (rating)=>{
        if(rating!==this.state.rating){ //prevent to show data from another fetch
            return process.abort();
        }
    }
    filterOn(e,rating){
        //e.preventDefault();
        //e.stopPropagation();

        $("#loanAvgResult").html(this.state.ratingAverages[rating].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")); //show local saved Average before getting data
        $("#loadingStatus").html("aktualizují se data..."); //show status...
        let debug=this.state.debug;
        let ratingFilter="rating__eq="+rating;  //make filter
        let url=this.state.host+"/loans/marketplace?"+ratingFilter;

        //Change style of filter buttons by active rating
        this.state.ratings.forEach(element => { //clear style from filter buttons
            $("#"+element).removeClass("button btnActived").addClass('button');
        });
        $("#"+rating).removeClass('button').addClass("button btnActived"); //change style on actived button

        //Debug
        if(debug){
            console.log("url of gettin file: ", url);
        }

        //set url state
        this.setState((state, props) => {
            return {url: url,rating:rating}
        });
        this.getMarketplace(rating);
       
        
    }
    //get local data - not actualized for quick show // actualization works on click to button
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
    getMarketplace(rating){
        
        let debug=this.state.debug;
       
        //Fetch json file
        let targetUrl = this.state.host+'/loans/marketplace?fields=id,amount&rating__eq='+rating
        //if (typeof rating !== 'undefined' && rating !== null && rating !=="") {
        let ratingAverages=this.state.ratingAverages;

        fetch(targetUrl)
        .then(response => response.json())
        .then(marketplace => {
            this.stopPreviousProcess(rating); //aborted old same process if running
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
            if(debug){
                console.log("Running rating process: "+rating+", Actual process: "+this.state.rating+" - This have to be the same.");
            }
            $("#loanAvgResult").html(average);
            $("#loadingStatus").html("");
        }) 
        //show error
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
        

        //count sum and average from marketplace.amount
        var i=0;
        do {
            sum+=marketplace[i].amount;
            i++;
        } while (i<marketplace.length);

        average=sum/marketplace.length; //count average

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
                <span>Rating:</span>
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