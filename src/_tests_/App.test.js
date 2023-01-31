import React from "react";
import { shallow, mount } from "enzyme";
import App from "../App";
import EventList from "../components/EventList/EventList";
import CitySearch from "../components/CitySearch/CitySearch";
import NumberOfEvents from "../components/NumberOfEvents/NumberOfEvents";
import { extractLocations, getEvents } from "../api";
import { mockData } from "../mock-data";

describe("<App /> component", () => {
  let AppWrapper;
  beforeAll(() => {
    AppWrapper = shallow(<App />);
  });

  test("render list of all events", () => {
    expect(AppWrapper.find(EventList)).toHaveLength(1);
  });

  test("render CitySearch", () => {
    expect(AppWrapper.find(CitySearch)).toHaveLength(1);
  });
  test("render NumberOfEvents", () => {
    expect(AppWrapper.find(NumberOfEvents)).toHaveLength(1);
  });
});

describe("<App/> integration", () => {
  test("<App/> passes events state as props to <EventList/>", () => {
    const AppWrapper = mount(<App />);
    const AppEventsState = AppWrapper.state("events");
    expect(AppEventsState).not.toEqual(undefined);
    expect(AppWrapper.find("EventList").props().events).toEqual(AppEventsState);
    AppWrapper.unmount();
  });
  test("<app/> passes locations state as props to <CitySearch/>", () => {
    const AppWrapper = mount(<App />);
    const AppLocationsState = AppWrapper.state("locations");
    expect(AppLocationsState).not.toEqual(undefined);
    expect(AppWrapper.find(CitySearch).props().locations).toEqual(
      AppLocationsState
    );
    AppWrapper.unmount();
  });
  test("get list of events matching the city selected by the user", async () => {
    const AppWrapper = mount(<App />);
    const CitySearchWrapper = AppWrapper.find(CitySearch);
    const locations = extractLocations(mockData);
    CitySearchWrapper.setState({ suggestions: locations });
    const suggestions = CitySearchWrapper.state("suggestions");
    const selectedIndex = Math.floor(Math.random() * suggestions.length);
    const selectedCity = suggestions[selectedIndex];
    await CitySearchWrapper.instance().handleItemClicked(selectedCity);
    const allEvents = await getEvents();
    const eventsToShow = allEvents.filter(
      (event) => event.location === selectedCity
    );
    expect(AppWrapper.state("events")).toEqual(eventsToShow);
    AppWrapper.unmount();
  });
  test("show all events when user clicks on `Show all cities`", async () => {
    const AppWrapper = mount(<App />);
    const suggestionsItems =
      AppWrapper.find(CitySearch).find(".suggestions li");
    await suggestionsItems.at(suggestionsItems.length - 1).simulate("click");
    const allEvents = await getEvents();
    expect(AppWrapper.state("events")).toEqual(allEvents);
    AppWrapper.unmount();
  });
  test("<app/> passes event number state as props to <NumberOfEvents/>", () => {
    const AppWrapper = mount(<App />);
    const AppNumberState = AppWrapper.state("eventNumber");
    expect(AppNumberState).not.toEqual(undefined);
    expect(AppWrapper.find(NumberOfEvents).props().eventNumber).toEqual(
      AppNumberState
    );
    AppWrapper.unmount();
  });
  test("Set number of events by user", async () => {
    const AppWrapper = mount(<App />);
    const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
    const number = NumberOfEventsWrapper.find(".events-number__input").prop(
      "value"
    );
    await NumberOfEventsWrapper.instance().handleChange;
    expect(AppWrapper.state("eventNumber")).toEqual(number);
    AppWrapper.unmount();
  });
  test("alert when user input below 1 event", async () => {
    global.alert = jest.fn();
    const AppWrapper = mount(<App />);
    const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);

    await NumberOfEventsWrapper.find(".events-number__input").simulate(
      "change",
      {
        target: { value: 0 },
      }
    );
    expect(global.alert).toHaveBeenCalledWith("please enter a number above 1");
  });
  test("mock data in the state `events` of <App/> is the same as the data in <EventList/>", async () => {
    const AppWrapper = mount(<App />);
    const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
    NumberOfEventsWrapper.find(".events-number__input").simulate("change", {
      target: { value: 1 },
    });
    await getEvents();
    expect(AppWrapper.state("events")).toEqual(mockData.slice(0, 1));
    AppWrapper.unmount();
  });
});
