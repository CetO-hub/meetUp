import React, { Component } from "react";
import "./App.css";
import EventList from "./components/EventList/EventList";
import CitySearch from "./components/CitySearch/CitySearch";
import NumberOfEvents from "./components/NumberOfEvents/NumberOfEvents";

class App extends Component {
  render() {
    return (
      <>
        <CitySearch />
        <EventList />
        <NumberOfEvents />
      </>
    );
  }
}

export default App;
