import { shallow } from "enzyme";
import React from "react";
import NumberOfEvents from "../components/NumberOfEvents/NumberOfEvents";

describe("<NumberOfEvents/> component", () => {
  let NumberOfEventsWrapper;
  beforeAll(() => {
    NumberOfEventsWrapper = shallow(<NumberOfEvents />);
  });
  test("render event number block", () => {
    expect(NumberOfEventsWrapper.find(".events-number")).toHaveLength(1);
  });
  test("render event number heading", () => {
    expect(NumberOfEventsWrapper.find(".events-number__heading").text()).toBe(
      "Number of Events"
    );
  });
  test("render event number input", () => {
    expect(NumberOfEventsWrapper.find(".events-number__input")).toHaveLength(1);
  });
  test("default number of events is 32", () => {
    NumberOfEventsWrapper.setState({
      number: 32,
    });
    const numberInput = NumberOfEventsWrapper.state("number");

    expect(
      NumberOfEventsWrapper.find(".events-number__input").prop("value")
    ).toEqual(numberInput);
  });
  test("save number of events entered by user in the state `number`", () => {
    NumberOfEventsWrapper.setState({
      number: 32,
    });
    const eventObject = { target: { value: 20 } };
    NumberOfEventsWrapper.find(".events-number__input").simulate(
      "change",
      eventObject
    );

    expect(
      NumberOfEventsWrapper.find(".events-number__input").prop("value")
    ).toBe(20);
  });
});
