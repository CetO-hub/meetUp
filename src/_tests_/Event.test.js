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
});
