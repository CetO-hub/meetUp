# Project description

A serverless, progressive web application (PWA) with React using a
test-driven development (TDD) technique. The application uses the Google
Calendar API to fetch upcoming events.

## Features and user stories

1. **FEATURE 1: FILTER EVENTS BY CITY:** As a user I should be able to “filter events by city”
   So that I can see the list of events that take place in that city
2. **FEATURE 2: SHOW/HIDE AN EVENT’S DETAILS:** As a user I should be able to “SHOW/HIDE AN EVENT’S DETAILS”
   So that I can see the details of the respective event
3. **FEATURE 3: SPECIFY NUMBER OF EVENTS:** As a user I should be able to “specify the number of events that are displayed”
   So that I can see more or less entries depending on my input
4. **FEATURE 4: USE THE APP WHEN OFFLINE:** As a user I should be able to “use the app offline”
   So that I can use the app for certain tasks when I have no internet connection.
5. **FEATURE 5: DATA VISUALIZATION:** As a user I should be able to “visualize data”
   So that I can see various data presented in an appealing way.

## Gherkin syntax

1. FEATURE 1: FILTER EVENTS BY CITY

   - **Scenario 1:** When user hasn’t searched for a city, show upcoming events from all cities.

     - _Given_ user hasn’t searched for any city
     - _When_ the user opens the app
     - _Then_ the user should see a list of all upcoming events

   - **Scenario 2:** User should see a list of suggestions when they search for a city.

     - _Given_ the main page is open
     - _When_ user starts typing in the city textbox
     - _Then_ the user should see a list of cities (suggestions) that match what they’ve typed

   - **Scenario 3:** User can select a city from the suggested list.

     - _Given_ the user was typing “Berlin” in the city textbox And the list of suggested cities is showing
     - _When_ the user selects a city (e.g., “Berlin, Germany”) from the list
     - _Then_ their city should be changed to that city (i.e., “Berlin, Germany”) And the user should receive a list of upcoming events in that city

2. FEATURE 2: SHOW/HIDE AN EVENT’S DETAILS

   - **Scenario 1:** An event element is collapsed by default.

     - _Given_ events were loaded/fetched to be displayed on the main page
     - _When_ user navigates to the main page
     - _Then_ details of all events are collapsed

   - **Scenario 2:** User can expand an event to see its details.

     - _Given_ user navigated to the main page
     - _When_ user clicks on the "show details" button
     - _Then_ the event card expends to show the details of the event

   - **Scenario 3:** User can collapse an event to hide its details.

     - _Given_ user clicked on the "show details" button
     - _When_ user clicks on the "hide details" button
     - _Then_ the details of the event collapse

3. FEATURE 3: SPECIFY NUMBER OF EVENTS

   - **Scenario 1:** When user hasn’t specified a number, 32 is the default number.

     - _Given_ user navigated to the main page
     - _When_ user does not enter any event numbers
     - _Then_ 32 events are shown

   - **Scenario 2:** User can change the number of events they want to see.

     - _Given_ user navigated to the main page
     - _When_ user enters a specific number
     - _Then_ the amount of events, based on the entered number, is shown

4. FEATURE 4: USE THE APP WHEN OFFLINE

   - **Scenario 1:** Show cached data when there’s no internet connection.

     - _Given_ internet connection is lost
     - _When_ user interacts with the app (e.g. show event details)
     - _Then_ app uses cached data to show the user's request

   - **Scenario 2:** Show error when user changes the settings (city, time range).

     - _Given_ internet connection is lost
     - _When_ user changes city or time range
     - _Then_ error message shows that internet connection needs to be established first

5. FEATURE 5: DATA VISUALIZATION

   - **Scenario 1:** Show a chart with the number of upcoming events in each city.

     - _Given_ user navigated to the data visualization page
     - _When_ user clicks on "show number of upcoming events" button
     - _Then_ a chart is rendered based on the user's input

## Technical

The app is built considering following key points:

- TDD technique
- Google Calendar API and OAuth2 authentication flow
- Serverless functions AWS lambda for the authorization server
  instead of using a traditional server
- Hosted in a Git repository on GitHub
- Pass Lighthouse’s PWA checklist
- The app must work offline or in slow network conditions with the help of a service worker
- Users may be able to install the app on desktop and add the app to their home screen on
  mobile
- The app must implement an alert system using an OOP approach to show information to the
  user
- Use of data visualization
- Covered by tests with a coverage rate >= 90%
- Monitored using an online monitoring tool

**Following languages were used:**

- React
