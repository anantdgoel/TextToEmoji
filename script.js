/**
 * @file myScript.js
 * Script to analyze Facebook feed and make connection with the server
 *
 * @author Mark Craft, Qinglin Chen
 * @date Fall 2016
 */
(function(document) {
'use strict';
var feeds = new Set();
function text(res) {
	return res.text();
}
/**
 * Http request to www.projectfib.com/verify.
 *
 * @param url to send to the server.
 * @param the type of information sent
 * @param the location to put the button
 */
function httpGet(input, type, data, comments, likes) {
  // This calls our backend API that simply returns text. We do not execute any code returned from this API
	var server = "https://www.projectfib.com/verify";
	var contents = "?content=";
	var page = (type=="url")? decode(input) : input;
	var theUrl = server + contents + page;
	theUrl = theUrl.replace("&", "^") + "&comments=" + comments + "&likes=" + likes;

	//console.log("Type: " + type + " : " + page);
  // This calls our backend API that simply returns text. We do not execute any code returned from this API
	fetch(theUrl)
		.then(text).then(function(text) {
			var btn = document.createElement('div'),
				button = Ladda.create(btn);
				btn.style = "font-weight:bold; padding: 3px; position:absolute; top: 4px; right: 30px;background: #3b5998; font-size: 15px;";
			if (text=="verified") {
				btn.innerHTML = "verified";
				btn.style.color = "#FFFFFF";
				data.appendChild(btn);
			} else if (text.includes("not verified")) {
				btn.innerHTML = "not verified";
				btn.style.color = "#E74C3C";
				data.appendChild(btn);
			}
		});

}

// This calls our backend API that simply returns text. We do not execute any code returned from this API
function httpSend(data) {
	var server = "https://www.projectfib.com/verify?content=";
	var theURL = server + data;

	fetch(theURL);
}

/**
 * Create a button on the screen
 *
 * @param location of the button
 * @param the text to display on the button
 * @param whether the server is down or not
 */
function createButton(btn, loc) {
	var btn = document.createElement('div'),
		button = Ladda.create(btn);
	//btn.addEventListener("mouseover", hoverTooltip.bind(text), false);

	btn.innerHTML = "server down";
	btn.style = "font-weight:bold; padding: 3px; position:absolute; top: 4px; right: 30px;background: #3b5998; font-size: 15px; color: #FFFFFF;";

	loc.appendChild(btn);
}

/**
 * Display tooltip with more accurate information
 *
 * @param the information to display
 */
function hoverTooltip(info) {
	//console.log("hovering: " + info);
}

/*
 * Parse through Facebook's encoded url for the actual url
 *
 */
function decode(code) {

	var res = "" + code;
	res = res
		.replace("http://l.facebook.com/l.php?u=", "")
		.replace("https://l.facebook.com/l.php?u=", "")
		.replace(/%3A/gi, ":")
		.replace(/%F/gi, "/")
		.replace(/%2F/gi, "/");

	var end = res.substr(res.indexOf("^h"), res.length);
	res = res.replace(end, "");
	var end2 = res.substr(res.indexOf("&"), res.length);
	res = res.replace(end2, "");

	return res;
}

/*
 * Get the number of Facebook likes
 *
 */
function getLikes(string) {
	return 1*(string.split(",").length) + 1*(string.includes("and")) +
		   1*((string.match(/\d/g)).join(""));
}

/**
 * Receive each Facebook post and analyze texts, urls, pics for validity.
 * Refreshes every second.
 *
 */
setInterval(function() {

	var test = document.getElementsByClassName(' _1mf _1mj');
	if (test == null) {
		// do nothing
	} else {
		console.log("found a chat window");
	}

}, 1000);

})(document);
