import React, { Component } from "react";

export default class NumberOfEvents extends Component {
  state = {
    number: 32,
  };

  handleChange = (e) => {
    const eventCount = e.target.value;
    if (eventCount < 1) {
      alert("please enter a number above 1");
      return;
    } else {
      this.setState({ number: eventCount });
      this.props.updateEvents(null, eventCount);
    }
  };

  render() {
    return (
      <div className="events-number">
        <h1 className="events-number__heading">Number of Events</h1>
        <input
          className="events-number__input"
          value={this.state.number}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}
