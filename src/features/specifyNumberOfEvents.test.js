import { loadFeature, defineFeature } from "jest-cucumber";
import { shallow, mount } from "enzyme";
import App from "../App";
import { getEvents } from "../api";
import { mockData } from "../mock-data";

const feature = loadFeature("./src/features/specifyNumberOfEvents.feature");

defineFeature(feature, (test) => {
  test("When user hasn’t specified a number, 32 is the default number", ({
    given,
    when,
    then,
  }) => {
    let AppWrapper;
    given("user navigated to the main page", () => {
      AppWrapper = shallow(<App />);
    });

    when("user does not enter any event numbers", async () => {
      await getEvents();
    });

    then("`32` events are shown", () => {
      AppWrapper.update();
      expect(AppWrapper.state("eventNumber")).toEqual(32);
    });
  });

  test("User can change the number of events they want to see.", ({
    given,
    when,
    then,
  }) => {
    let AppWrapper;
    given("user navigated to the main page", async () => {
      AppWrapper = mount(<App />);
      await getEvents();
    });

    when("user enters a specific number", () => {
      AppWrapper.update();
      AppWrapper.find(".events-number__input").simulate("change", {
        target: { value: 1 },
      });
    });

    then("the amount of events, based on the entered number, is shown", () => {
      AppWrapper.update();
      expect(AppWrapper.state("eventNumber")).toEqual(1);
      expect(AppWrapper.state("events")).toHaveLength(1);
      expect(AppWrapper.find(".event-list li")).toHaveLength(1);
    });
  });
});
