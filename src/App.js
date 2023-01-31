import React, { Component } from "react";
import "./App.css";
import "./nprogress.css";
import EventList from "./components/EventList/EventList";
import CitySearch from "./components/CitySearch/CitySearch";
import NumberOfEvents from "./components/NumberOfEvents/NumberOfEvents";
import { extractLocations, getEvents } from "./api";

class App extends Component {
  state = {
    events: [],
    locations: [],
    userLocation: "all",
    eventNumber: 32,
  };

  updateEvents = (location, eventCount) => {
    const { eventNumber, userLocation } = this.state;
    if (location) {
      getEvents().then((events) => {
        const locationEvents =
          location === "all"
            ? events
            : events.filter((event) => event.location === location);
        const eventsDisplay = locationEvents.slice(0, eventNumber);
        this.setState({
          events: eventsDisplay,
          userLocation: location,
        });
      });
    } else {
      getEvents().then((events) => {
        const locationEvents =
          userLocation === "all"
            ? events
            : events.filter((event) => event.location === userLocation);
        const eventsDisplay = locationEvents.slice(0, eventCount);
        this.setState({
          events: eventsDisplay,
          eventNumber: eventCount,
        });
      });
    }
  };

  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        events = events.slice(0, this.state.eventNumber);
        this.setState({ events, locations: extractLocations(events) });
      }
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    return (
      <div className="App">
        <CitySearch
          locations={this.state.locations}
          updateEvents={this.updateEvents}
        />
        <EventList events={this.state.events} />
        <NumberOfEvents
          eventNumber={this.state.eventNumber}
          updateEvents={this.updateEvents}
        />
      </div>
    );
  }
}

export default App;
