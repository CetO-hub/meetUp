import React, { Component } from "react";
import "./App.css";
import "./nprogress.css";
import EventList from "./components/EventList/EventList";
import CitySearch from "./components/CitySearch/CitySearch";
import NumberOfEvents from "./components/NumberOfEvents/NumberOfEvents";
import { extractLocations, getEvents, getAccessToken, checkToken } from "./api";
import WelcomeScreen from "./components/WelcomeScreen/WelcomeScreen";

class App extends Component {
  state = {
    events: [],
    locations: [],
    userLocation: "all",
    eventNumber: 32,
    showWelcomeScreen: undefined,
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

  async componentDidMount() {
    this.mounted = true;
    const accessToken = localStorage.getItem("access_token");
    const isTokenValid = (await checkToken(accessToken)).error ? false : true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");
    this.setState({ showWelcomeScreen: !(code || isTokenValid) });
    if ((code || isTokenValid) && this.mounted) {
      getEvents().then((events) => {
        if (this.mounted) {
          this.setState({ events, locations: extractLocations(events) });
        }
      });
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    if (this.state.showWelcomeScreen === undefined) {
      return <div className="App" />;
    }
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
        <WelcomeScreen
          showWelcomeScreen={this.state.showWelcomeScreen}
          getAccessToken={() => {
            getAccessToken();
          }}
        />
      </div>
    );
  }
}

export default App;
