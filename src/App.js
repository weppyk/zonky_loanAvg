import React, { Component } from 'react';
//import logo from './zonky.png';
import './App.css';
//import Connector from './Connector';
import LoanFilter from './LoanFilter';


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
        <nav><LoanFilter /></nav>
        <section>
          <div id="loanAvgResult"></div>
        </section>
        <footer className="body">
        <div id="debbuger"></div>
        </footer>
        
        
        
      </div>
    );
  }
}

export default App;
