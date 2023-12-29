_This is an extension was created just to understand the structure for browser extensions on Firefox as well as Chromium based browsers_

# Add to Calendar

Adds a new context menu item which lets you add the highlighted text from any webpage to google calendar.

## What it does

![Extension context menu screenshot in Firefox](images/screenshot-1.png)

If you highlight a text and Add it to calendar, it will open a new tab and open the new Entry page in Google Calendar with selected text as title.

If you highlight a numerical date and Add it to calendar, it will open a new tab and open the new Entry page in Google calendar with the selected date as the event date.

## Issues

- As of now it can only parse numerical date formats, cannot parse date format that has month in text format. 
- The numerical format can understand dates starting from YYYY or MM or DD but cannot distinguish between DD and MM, so date format which is buggy.
- Need to understand how to make a proper package for both browser engines.

<a href="https://www.flaticon.com/free-icons/calendar" title="calendar icons">Calendar icons created by Freepik - Flaticon</a>
