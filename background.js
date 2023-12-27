/*
 * To make it a global extension
 * chromium does not browser, but instead requires chrome
 */

const API =  chrome || browser;

// Debugging
function onCreated(){
  if(API.runtime.lastError) {
    console.log(`Error: ${API.runtime.lastError}`)
  } else {
    console.log(`Item created successfully`)
  }
}

// Selected text is date?
function findDates(str) {
  const dateRegex = /\b\d{4}[-/]\d{2}[-/]\d{2}|\d{2}[-/]\d{2}[-/]\d{4}|\d{2}[-/]\d{2}[-/]\d{4}\b/g;
  const matchDate = str.match(dateRegex);

  if (!str || !matchDate || !matchDate[0]) {
    return false;
  }

  const formattedDates = matchDate.map(dateString => {
    const dateObject = new Date(dateString);

    if (isNaN(dateObject.getTime())) {
      return null;
    }

    return (
      dateObject.getFullYear().toString() +
      ('0' + (dateObject.getMonth() + 1)).slice(-2) +
      ('0' + dateObject.getDate()).slice(-2)
    );
  })
  .filter(Boolean);

  if (formattedDates.length === 0) {
    return false;
  }

  return formattedDates;
}

// Items to contextMenu 
API.contextMenus.create({
  id: "text-selection",
  title:API.i18n.getMessage("menuItemTextSelect"),
  contexts: ["selection"],
},onCreated)


// Context Menu Listeners
API.contextMenus.onClicked.addListener((info, tab) => {

  if(info.menuItemId === "text-selection") {
    let eventTitle, date;
    let currentUrl = tab.url;
    let selectedText = info.selectionText;
    date = findDates(selectedText);
    if(date) {
      date = date[0]
      eventTitle = "New Event";
    } else {
      eventTitle = selectedText;
      let dateToday = new Date()
      date = dateToday.getFullYear().toString() +
        ('0' + (dateToday.getMonth() + 1)).slice(-2) +
        ('0' + dateToday.getDate()).slice(-2)
    }
    let calUrl= `https://calendar.google.com/calendar/u/0/r/eventedit?text=${eventTitle}&details=Event+added+from+${currentUrl}&dates=${date}T100000/${date}T110000` ;
    API.tabs.create({'url':calUrl})
  }
});
