import React, { Component } from "react";
import { ErrorAlert } from "../alert/Alert";

export default class NumberOfEvents extends Component {
  state = {
    number: 32,
    errorText: "",
  };

  handleChange = (e) => {
    const eventCount = e.target.value;
    if (eventCount < 1 || eventCount > 32) {
      this.setState({ errorText: "Please enter a number between 1 and 32" });
    } else {
      this.setState({ number: eventCount, errorText: "" });
      this.props.updateEvents(null, eventCount);
    }
  };

  render() {
    return (
      <div className="events-number">
        <h1 className="events-number__heading">Number of Events</h1>
        <ErrorAlert text={this.state.errorText} />
        <input
          className="events-number__input"
          value={this.state.number}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}
