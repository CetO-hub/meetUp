Feature: Specify number of events


Scenario: When user hasn’t specified a number, 32 is the default number
Given user navigated to the main page
When user does not enter any event numbers
Then `32` events are shown

Scenario: User can change the number of events they want to see.
Given  user navigated to the main page
When user enters a specific number
Then  the amount of events, based on the entered number, is shown

