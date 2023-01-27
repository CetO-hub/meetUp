import React, { Component } from "react";

class Event extends Component {
  state = {
    visible: false,
  };

  handleClick = () => {
    this.setState({ visible: !this.state.visible });
  };

  render() {
    const { event } = this.props;
    const date = new Date(event.start.dateTime);
    return (
      <>
        <div className="event-overview">
          <h1 className="event-summary">{event.summary}</h1>
          <p className="event-time">{`${date}`}</p>
          <p className="event-location">{`@${event.summary} | ${event.location}`}</p>
          {this.state.visible && (
            <div className="details">
              <h2 className="details-heading">About Event:</h2>
              <a href={event.htmlLink} className="details-link">
                See details on Google Calender
              </a>
              <p className="details-description">{event.description}</p>
            </div>
          )}
          <button className="show-details" onClick={this.handleClick}>
            {!this.state.visible ? "Show Details" : "Hide Details"}
          </button>
        </div>
      </>
    );
  }
}

export default Event;
