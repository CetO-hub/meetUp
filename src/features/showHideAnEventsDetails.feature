Feature: Show/Hide an event’s details


Scenario: An event element is collapsed by default
Given events were loaded/fetched to be displayed on the main page
When user navigates to the main page
Then details of all events are collapsed

Scenario: User can expand an event to see its details
Given user navigated to the main page
When user clicks on the `show details` button
Then the event card expends to show the details of the event

Scenario: User can collapse an event to hide its details
Given user clicked on the `show details` button
When user clicks on the `hide details` button
Then the details of the event collapse
