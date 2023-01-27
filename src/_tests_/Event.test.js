import { shallow } from "enzyme";
import React from "react";
import Event from "../components/Event/Event";
import { mockData } from "../mock-data";

describe("<Event/> component", () => {
  let EventWrapper, event;
  beforeAll(() => {
    event = mockData[1];
    EventWrapper = shallow(<Event event={event} />);
  });
  test("render the event overview", () => {
    expect(EventWrapper.find(".event-overview")).toHaveLength(1);
  });
  test("render the event summary", () => {
    expect(EventWrapper.find(".event-summary").text()).toBe(event.summary);
  });
  test("render the event start time", () => {
    const date = new Date(event.start.dateTime);
    expect(EventWrapper.find(".event-time").text()).toBe(`${date}`);
  });
  test("render the event summary and location", () => {
    expect(EventWrapper.find(".event-location").text()).toBe(
      `@${event.summary} | ${event.location}`
    );
  });
  test("render the show details button", () => {
    expect(EventWrapper.find(".show-details")).toHaveLength(1);
  });
  test("render the show details button", () => {
    expect(EventWrapper.find(".show-details").text()).toBe("Show Details");
  });
  test("change `visible` state when `Show Details` button is clicked", () => {
    EventWrapper.setState({
      visible: false,
    });
    const eventObject = { target: { value: true } };
    EventWrapper.find(".show-details").simulate("click", eventObject);
    expect(EventWrapper.state("visible")).toBe(true);
  });
  test("change button text from `Show Details` to `Hide Details` when button is clicked", () => {
    EventWrapper.setState({
      visible: false,
    });
    const eventObject = { target: { value: true } };
    EventWrapper.find(".show-details").simulate("click", eventObject);
    expect(EventWrapper.find(".show-details").text()).toBe("Hide Details");
  });
  test("show details section when `Show Details` button is clicked", () => {
    EventWrapper.setState({
      visible: false,
    });
    const eventObject = { target: { value: true } };
    EventWrapper.find(".show-details").simulate("click", eventObject);
    expect(EventWrapper.find(".details")).toHaveLength(1);
  });
  test("show heading of the details section", () => {
    EventWrapper.setState({
      visible: false,
    });
    const eventObject = { target: { value: true } };
    EventWrapper.find(".show-details").simulate("click", eventObject);
    expect(EventWrapper.find(".details-heading").text()).toBe("About Event:");
  });
  test("show html link to the calender in the details section", () => {
    EventWrapper.setState({
      visible: false,
    });
    const eventObject = { target: { value: true } };
    EventWrapper.find(".show-details").simulate("click", eventObject);
    expect(EventWrapper.find(".details-link").text()).toBe(
      "See details on Google Calender"
    );
  });
  test("link to the calender is clickable in the details section", () => {
    EventWrapper.setState({
      visible: false,
    });
    const eventObject = { target: { value: true } };
    EventWrapper.find(".show-details").simulate("click", eventObject);
    expect(EventWrapper.find(".details-link").prop("href")).toBe(
      event.htmlLink
    );
  });
  test("show event description in the details section", () => {
    EventWrapper.setState({
      visible: false,
    });
    const eventObject = { target: { value: true } };
    EventWrapper.find(".show-details").simulate("click", eventObject);
    expect(EventWrapper.find(".details-description").text()).toBe(
      event.description
    );
  });
});
