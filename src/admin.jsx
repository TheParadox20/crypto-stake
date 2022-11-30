import React from "react";
import { baseURL } from "./data.json";
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
          <form onSubmit={this.submitGame}>
            <h4>Add Bet</h4>
            <label>
            Kickoff:
            <input type="text" value={this.state.kickoff} onChange={this.handleKickoffTime} />
            </label>
            <br/>
            <label>
            Bet ID:
            <input type="text" value={this.state.betID} onChange={this.handleBetID} />
            </label>
            <br/>
            <label>
            Home Team:
            <input type="text" value={this.state.home} onChange={this.handleHomeTeam} />
            </label>
            <br/>
            <label>
            Away Team:
            <input type="text" value={this.state.away} onChange={this.handleAwayTeam} />
            </label>
            <br/>
            <input type="submit" value="Add Match" />
        </form>
        <br />
        <form onSubmit={this.closeGame}>
          <h4>Close Bet</h4>
            <label>
            Game ID:
            <input type="text" value={this.state.gameID} onChange={this.handleGameID} />
            </label>
            <br/>
            
            <br/>
            <input type="submit" value="Close Bet" />
        </form>
    </React.Fragment>
    );
  }
}

export default Admin
