import React, { Component } from "react";

export default class NumberOfEvents extends Component {
  state = {
    number: 32,
  };

  handleChange = (e) => {
    this.setState({ number: e.target.value });
  };

  render() {
    return (
      <div className="events-number">
        <h1 className="events-number__heading">Number of Events</h1>
        <input
          className="events-number__input"
          value={this.state.number}
          onChange={(e) => this.handleChange(e)}
        />
      </div>
    );
  }
}
