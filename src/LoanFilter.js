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
        this.state.ratings.forEach(element => { //clear style from filter buttons
            $("#"+element).removeClass("button btnActived").addClass('button');
        });
        $("#"+item).removeClass('button').addClass("button btnActived"); //change style on actived button
        
        var ratingFilter="rating__eq="+item;  //make filter
        this.setState((state, props) => {
            return {
                url: this.state.host+"/loans/marketplace?"+ratingFilter,
                rating:item
            }
        }); //set 
        //this.state.url=this.state.host+"/loans/marketplace?"+ratingFilter;
        //this.state.rating=item;
        //var average= countLoanAvg(json);
        $("#loanAvgResult").html(this.countLoanAvg(item));
        if(this.state.debug===true){
            $("#debbuger").html("URL api zonky: <a href='"+this.state.url+"' target='_blank'>"+this.state.url+"</a>"); //show active filter button
        }
        
    }
    componentDidMount(item){
        let rating=this.state.rating;
        //var url='https://api.zonky.cz/loans/marketplace?fields=id,amount,rating&rating__eq=A'; //request pattern
        var url='api/loans/marketplace_rating__eq='+item+'.json';
        if (typeof rating !== 'undefined' && rating !== null && rating !=="") {
            $.getJSON(url, function(data) {
                console.log(data);
            });
        } 
    }
    getJsonData(item){
        this.componentDidMount(item);
    }
    //Count average of array
    countLoanAvg(item) {
        let sum, avg = 0;
        var jsonFile=this.getJsonData(item);
        
        console.log(jsonFile);
        var arr=[1,43,5];
        // dividing by 0 will return Infinity
        // arr must contain at least 1 element to use reduce
        if (arr.length)
        {
            sum = arr.reduce(function(a, b) { return a + b; });
            avg = Math.floor(sum / arr.length);
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