import React, {Component} from 'react';

class Connector extends Component{
    constructor(){
        super();
        this.state={
            amount: [1,2,3],
            data: "NULL",
        };
    }

    componentDidMount(){
        fetch('https://api.zonky.cz/loans/marketplace')
        .then(response=> response.json())
        .then(data=>this.setState({data}));
        console.log(this.state.data);
        

    }
    render(){
        return(
            <div>
                 {this.state.data}
                 AND
            </div>
        )
    }

}
export default Connector;