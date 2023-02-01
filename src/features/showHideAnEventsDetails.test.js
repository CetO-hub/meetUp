import { loadFeature, defineFeature } from "jest-cucumber";
import { mount } from "enzyme";
import App from "../App";
import { getEvents } from "../api";

const feature = loadFeature("./src/features/showHideAnEventsDetails.feature");

defineFeature(feature, (test) => {
  test("An event element is collapsed by default", ({ given, when, then }) => {
    let AppWrapper;
    given(
      "events were loaded/fetched to be displayed on the main page",
      async () => {
        AppWrapper = mount(<App />);
        await getEvents();
      }
    );

    when("user navigates to the main page", () => {
      AppWrapper.update();
    });

    then("details of all events are collapsed", () => {
      AppWrapper.update();
      expect(AppWrapper.find(".details")).toBeNull;
    });
  });

  test("User can expand an event to see its details", ({
    given,
    when,
    then,
  }) => {
    let AppWrapper;
    given("user navigated to the main page", () => {
      AppWrapper = mount(<App />);
    });

    when("user clicks on the `show details` button", async () => {
      await getEvents();
      AppWrapper.update();
      AppWrapper.find(".show-details").at(0).simulate("click");
    });

    then("the event card expends to show the details of the event", () => {
      AppWrapper.update();
      expect(AppWrapper.find(".details")).toBeDefined;
    });
  });

  test("User can collapse an event to hide its details", ({
    given,
    when,
    then,
  }) => {
    let AppWrapper;
    given("user clicked on the `show details` button", async () => {
      AppWrapper = mount(<App />);
      await getEvents();
      AppWrapper.update();
      AppWrapper.find(".show-details").at(0).simulate("click");
    });

    when("user clicks on the `hide details` button", () => {
      AppWrapper.update();
      AppWrapper.find(".show-details").at(0).simulate("click");
    });

    then("the details of the event collapse", () => {
      AppWrapper.update();
      expect(AppWrapper.find(".details")).toBeNull;
    });
  });
});
