import React, { Component } from 'react';
//import logo from './zonky.png';
import './App.css';
//import Connector from './Connector';
import LoanFilter from './LoanFilter';

//import { library } from '@fortawesome/fontawesome-svg-core'
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import { faIgloo } from '@fortawesome/free-solid-svg-icons'

//library.add(faIgloo);


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="crop">
            <img src="logos.png" className="App-logo" alt="logo"></img>
          </div>
          {/*<Connector />*/}
        </header>
        <nav>
          <h1>Průměr půjček dle ratingu</h1>
          <LoanFilter />
          </nav>
        <section className="loanAverageResult">
          <div className="big">
            <span id="loanAvgResult">0</span><span>,- CZK</span>
          </div>
          <div id="loadingStatus"></div>
        </section>
        <footer className="body">
        <div id="debbuger"></div>
        </footer>
        
        
        
      </div>
    );
  }
}

export default App;
