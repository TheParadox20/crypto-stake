import React from "react";
import { baseURL } from "./data.json";
import {CryptoStakeContract,CryptoStakeContractSigner} from './contracts'
import './admin.css'

/**
 * Add new bets (not compulsory)
 * Get betInfo of every bet
 */
 class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        home: '',
        away: '',
        kickoff: '',
        betID: '',
        gameID:''
    };

    this.handleHomeTeam = this.handleHomeTeam.bind(this);
    this.handleAwayTeam = this.handleAwayTeam.bind(this);
    this.handleKickoffTime = this.handleKickoffTime.bind(this);
    this.handleBetID = this.handleBetID.bind(this);
    this.submitGame = this.submitGame.bind(this);
    this.handleGameID = this.handleGameID.bind(this);
    this.closeGame = this.closeGame.bind(this);
  }

  handleHomeTeam(event) {
    this.setState({home: event.target.value});
  }
  handleAwayTeam(event) {
    this.setState({away: event.target.value});
  }
  handleKickoffTime(event) {
    this.setState({kickoff: event.target.value});
  }
  handleBetID(event) {
    this.setState({betID: event.target.value});
  }
  handleGameID(event) {
    this.setState({gameID: event.target.value});
  }

  submitGame(event) {
    event.preventDefault();
    //alert('');
    let parameters = "?home="+this.state.home+"&away="+this.state.away+"&kickoff="+this.state.kickoff+"&betID="+this.state.betID;
    fetch(baseURL + "/addGame" + parameters).then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => console.log(error));
  }
  closeGame(event) {
    event.preventDefault();
    fetch(baseURL + "/closeGame?gameID=" + this.state.gameID ).then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => console.log(error));
  }

  render() {
    return (
        <React.Fragment>
          <div className="admin-container">
            <h4>Admin pannel</h4>
          <form onSubmit={this.submitGame} className="admin-form">

            <div>
              <h4>Add Bet</h4>
              <label>
              Kickoff:
              </label>
              <input type="text" value={this.state.kickoff} onChange={this.handleKickoffTime} />
              <br/>
            </div>
           
            <div>
            <label>
            Bet ID:
            </label>
            <input type="text" value={this.state.betID} onChange={this.handleBetID} />
            <br/>
            </div>

            <div>
            <label>
            Home Team:
            </label>
            <input type="text" value={this.state.home} onChange={this.handleHomeTeam} />
           
            <br/>
            </div>

            <div>
            <label>
            Away Team:
            </label>
            <input type="text" value={this.state.away} onChange={this.handleAwayTeam} />
           
            <br/>
            </div>

            <input type="submit" value="Add Match" className="submit-button"/>
        </form>
        <br />

        <form onSubmit={this.closeGame} className="admin-form">
          <h4>Close Bet</h4>
            <label>
            Game ID:
 
            </label>
           <input type="text" value={this.state.gameID} onChange={this.handleGameID} />
           <label>
            Choice:
 
            </label>
           <input type="text" value={this.state.gameID} onChange={this.handleGameID} />
           
            <br/>
            
            <br/>
            <input type="submit" value="Close Bet" />
        </form>

        <form onSubmit={this.getGame} className="admin-form">
          <h4>View Bet</h4>
            <label>
            Game ID:
            <input type="text" value={this.state.gameID} onChange={this.handleGameID} />
            </label>
            <br/>
            
            <br/>
            <input type="submit" value="Close Bet" />
        </form>
        </div>
    </React.Fragment>
    );
  }
}

export default Admin
