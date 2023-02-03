import React, { Component } from "react";
import { InfoAlert } from "../alert/Alert";
import Event from "../Event/Event";

class EventList extends Component {
  render() {
    const { events } = this.props;
    return (
      <>
        {!navigator.onLine && (
          <InfoAlert
            text={
              "You are currently offline, the event data may be not up to date."
            }
          />
        )}
        <ul className="event-list">
          {events.map((event) => (
            <li key={event.id}>
              <Event event={event} />
            </li>
          ))}
        </ul>
      </>
    );
  }
}

export default EventList;
