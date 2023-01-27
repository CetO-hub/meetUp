import React, { Component } from "react";

class Event extends Component {
  render() {
    const { event } = this.props;
    const date = new Date(event.start.dateTime);
    return (
      <>
        <div className="event-overview">
          <h1 className="event-summary">{event.summary}</h1>
          <p className="event-time">{`${date}`}</p>
          <p className="event-location">{`@${event.summary} | ${event.location}`}</p>
        </div>
      </>
    );
  }
}

export default Event;
