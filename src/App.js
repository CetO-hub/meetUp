import React, { Component } from "react";
import "./App.css";
import "./nprogress.css";
import EventList from "./components/EventList/EventList";
import CitySearch from "./components/CitySearch/CitySearch";
import NumberOfEvents from "./components/NumberOfEvents/NumberOfEvents";
import { extractLocations, getEvents, getAccessToken, checkToken } from "./api";
import WelcomeScreen from "./components/WelcomeScreen/WelcomeScreen";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import EventGenre from "./components/EventGenre/EventGenre";

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

  getData = () => {
    const { locations, events } = this.state;
    const data = locations.map((location) => {
      const number = events.filter(
        (event) => event.location === location
      ).length;
      const city = location.split(", ").shift();
      return { city, number };
    });
    return data;
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
        <NumberOfEvents
          eventNumber={this.state.eventNumber}
          updateEvents={this.updateEvents}
        />
        <div className="data-vis-wrapper">
          <EventGenre events={this.state.events} />
          <ResponsiveContainer height={400}>
            <ScatterChart
              margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
              }}
            >
              <CartesianGrid />
              <XAxis type="category" dataKey="city" name="city" />
              <YAxis
                type="number"
                dataKey="number"
                name="number of events"
                allowDecimals={false}
              />
              <Tooltip cursor={{ strokeDasharray: "3 3" }} />
              <Scatter data={this.getData()} fill="#8884d8" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        <EventList events={this.state.events} />
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
