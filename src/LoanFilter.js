import React, { Component } from 'react';
import $ from 'jquery'; 

/*function $(id){
    return document.getElementById(id);
}*/


class LoanFilter extends Component{
    constructor(props){
        super(props);
        
        this.state={
            host:"https://api.zonky.cz",
            ratings:['AAAAA','AAAA','AAA','AA','A','B','C','D'],
            selectedRating:"",
            debug:true,
            url:"",
            data: null,
            rating:""
        }
        this.filterOn = this.filterOn.bind(this);
    }
    filterOn(e,item){
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

        this.componentDidMount(item);
       
        
    }
    componentDidMount(item){
        let debug=this.state.debug;
        //var url='https://api.zonky.cz/loans/marketplace?fields=id,amount,rating&rating__eq=A'; //request pattern
        let url='/api/loans/marketplace_rating__eq='+item+'.json'; //nastavit testy existence ciloveho souboru
        
        //Fetch json file
        if (typeof item !== 'undefined' && item !== null && item !=="") {
            fetch(url)
            .then(response => response.json())
            .then(data => {
                this.setState({data});

                //Debug object json
                if(debug===true){
                    console.log("Getted object: ",this.state.data);
                }
                
                //Count average, add dot thousand separator and change on website
                let avg=Math.floor(this.countLoanAvg(item)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");;
                $("#loanAvgResult").html(avg);
            })
            /*$.getJSON(url, function(data) {
                //Debug
                if(debug===true){
                    console.log("Getted object: ",data)   
                }   
            });*/
        } 
    }
    getJsonData(item){
        this.componentDidMount(item);
    }
    //Count average of array
    countLoanAvg(item) {
        let sum=0, avg = 0;
        let data=this.state.data;
        //this.getJsonData(item);
        for (var i in this.state.data){
            sum+=data[i].amount;
        }
        avg=sum/data.length;

        //debug sumar,amount,average
        if(this.state.debug){
            console.log("Sumar loans: ",sum);
            console.log("Loans amount: ",data.length);
            console.log("Average amount: ",avg);
        }

        return avg
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