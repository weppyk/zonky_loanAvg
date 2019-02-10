import React, { Component } from 'react';

function $(id){
    return document.getElementById(id);
}

class LoanFilter extends Component{
    constructor(props){
        super(props);
        
        this.state={
            host:"https://api.zonky.cz",
            ratings:['AAAAA','AAAA','AAA','AA','A','B','C','D'],
            selectedRating:"",
            active: "btnActived"
        }
        this.countLoanAvg = this.countLoanAvg.bind(this);
    }
    setActiveTab(e,selectedRating) {
        
    }

    countLoanAvg(e,item) {
        this.state.ratings.forEach(element => { //clear style from filter buttons
            $(element).className="button";
        });
        $(item).className = 'button btnActived'; //change style on actived button
        
        var ratingFilter="rating__eq="+item;  //make filter
        var url= this.state.host+"/loans/marketplace?"+ratingFilter;
        $("loanAvgResult").innerHTML=url; //show active filter button
    }

    handleClick = (e, data) => {
        // access to e.target here
        console.log(data);
    }
    render() {
        return(
            <div>
                <ul class="filter">
                    {this.state.ratings.map(item => (
                        <li id={item} key={item} class="button {{this.state.active}}" onClick={((e) => this.countLoanAvg(e,item))}>{item}</li>
                    ))}
               </ul>
            
            </div>

        )
    }
}

export default LoanFilter;