import React, { Component } from "react";
import "./App.css";
import LoanFilter from "./LoanFilter";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="crop">
            <img src="logos.png" className="App-logo" alt="logo"></img>
          </div>
        </header>
        <nav>
          <h1>Průměr půjček dle ratingu</h1>
          <LoanFilter />
        </nav>
        <section className="loanAverageResult">
          <div className="big">
            <span id="loanAvgResult">0</span>
            <span>,- CZK</span>
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
