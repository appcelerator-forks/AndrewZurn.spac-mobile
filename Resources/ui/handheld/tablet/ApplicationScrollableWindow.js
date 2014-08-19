function ApplicationScrollableWindow() {
	// import dependencies
	var HomeWindow = require('ui/common/HomeWindow'), AthleticsWindow = require('ui/common/AthleticsWindow'), EventsWindow = require('ui/common/EventsWindow');

	var window = Ti.UI.createWindow({
		backgroundImage : '/images/spac_bg.png',
		barColor : '#2e2e2e',
		titleControl : Titanium.UI.createLabel({
			color : '#d29941',
			height : 'auto',
			width : 'auto',
			top : 10,
			text : 'SAINT PAUL ATHLETIC CLUB',
			textAlign : 'center',
			font : {
				fontFamily : 'Times New Roman',
				fontSize : 18,
				fontWeight : 'bold'
			}
		})
	});

	var navGroup = Ti.UI.iOS.createNavigationWindow({
		window : window
	});

	var homeWindowView = HomeWindow(navGroup), athleticsWindowView = AthleticsWindow(navGroup), eventsWindowView = EventsWindow(navGroup);

	var scrollableView = Ti.UI.createScrollableView({
		views : [homeWindowView, athleticsWindowView, eventsWindowView],
		showPagingControl : false,
		height : '95%',
		top : '0%'
	});
	scrollableView.addEventListener('scrollend', function(e) {//also takes care of
		updateButtonLayouts(e.currentPage, oldButtonIndex);
		//button clicks updates
		oldButtonIndex = e.currentPage;
	});

	var oldButtonIndex = 0;
	var buttonView = Ti.UI.createView({
		height : '10%',
		bottom : 3
	});

	var homeButton = Ti.UI.createButton({
		image : 'images/home.png',
		title : '  HOME',
		font : {
			fontSize : 13,
			fontFamily : 'Times New Roman',
			fontWeight : 'bold'
		},
		width : '33%',
		left : '0%',
	});
	homeButton.addEventListener('click', function() {
		scrollableView.scrollToView(homeWindowView);
	});
	buttonView.add(homeButton);

	var athleticsButton = Ti.UI.createButton({
		image : 'images/athletics.png',
		title : '  ATHLETICS',
		font : {
			fontSize : 13,
			fontFamily : 'Times New Roman',
			fontWeight : 'bold'
		},
		width : '33%',
		left : '33%',
	});
	athleticsButton.addEventListener('click', function() {
		scrollableView.scrollToView(athleticsWindowView);
	});
	buttonView.add(athleticsButton);

	var eventsButton = Ti.UI.createButton({
		image : 'images/events.png',
		title : '  EVENTS',
		font : {
			fontSize : 13,
			fontFamily : 'Times New Roman',
			fontWeight : 'bold'
		},
		width : '33%',
		left : '66%',
	});
	eventsButton.addEventListener('click', function() {
		scrollableView.scrollToView(eventsWindowView);
	});
	buttonView.add(eventsButton);

	window.add(scrollableView);
	window.add(buttonView);

	return navGroup;
}

function updateButtonLayouts(newIndex, oldIndex) {
	Ti.API.log("New index: " + newIndex);
	Ti.API.log("Old index: " + oldIndex);
}

module.exports = ApplicationScrollableWindow;
