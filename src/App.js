import React, { Component } from "react";
import "./App.css";
import EventList from "./components/EventList/EventList";
import CitySearch from "./components/CitySearch/CitySearch";

class App extends Component {
  render() {
    return (
      <>
        <CitySearch />
        <EventList />
      </>
    );
  }
}

export default App;
