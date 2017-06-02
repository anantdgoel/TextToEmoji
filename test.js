setInterval(function() {
	let chat = document.getElementsByClassName('_1mf _1mj');
  // make sure chat window exists
  if (chat.length>0){
    let text = chat["0"].innerText;
    // make sure user has typed something
    if(text.length > 1){
      let start = text.indexOf(":")+1;
      // check for starting ':'
      if(start > 0) {
        let end = text.indexOf(":", start);
        // check for ending ':'
        if(end > 0) {
          let emoji_alias = text.slice(start, end);
          // Make sure emoji doesnt have whitespace
          if(/^\S*$/.test(emoji_alias)){
              // console.log("emoji requested: "+emoji_alias+"\nstarts: "+start+"\nends:"+end);
              // console.log(getMeAnEmoji(emoji_alias))
              let converted = text.substring(0, start-1)+getMeAnEmoji(emoji_alias)+text.substring(end+1)
              // console.log("final: "+converted)
              chat["0"].innerText = converted;
          }
        }
      }
    } else {
      // console.log("Found an empty chat window")
    }
  } else {
    // console.log("No chat windows open")
  }

}, 1000);

/** SOURCE CODE FROM: https://github.com/notwaldorf/emoji-translate **/
var allEmojis;
var SYMBOLS = '!"#$%&\'()*+,-./:;<=>?@[]^_`{|}~';

(function() {
  var request = new XMLHttpRequest();
  request.open('GET', chrome.extension.getURL('/emojis.json'), true);
  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      allEmojis = JSON.parse(request.response);
    }
  };
  request.send();
})();

function getMeAnEmoji(keyword) {
  keyword = keyword.trim().toLowerCase();

  if (!keyword || keyword === '' || keyword === 'it')
    return '';

  // Maybe this is a plural word but the keyword is the singular?
  var maybeSingular = '';
  if (keyword[keyword.length - 1] == 's')
    maybeSingular = keyword.slice(0, keyword.length - 1);

  // Maybe this is a singular word but the keyword is the plural?
  // Don't do this for single letter since that will pluralize crazy things.
  var maybePlural = (keyword.length == 1) ? '' : keyword + 's';

  // Go through all the things and find the first one that matches.
  for (var emoji in allEmojis) {
    var keywords = allEmojis[emoji].keywords;
    if (emoji == keyword || emoji == maybeSingular || emoji == maybePlural ||
        (keywords && keywords.indexOf(keyword) >= 0) ||
        (keywords && keywords.indexOf(maybeSingular) >= 0) ||
        (keywords && keywords.indexOf(maybePlural) >= 0))
      return allEmojis[emoji].char;
  }
  return '';
};

/** END OF SOURCE CODE FROM: https://github.com/notwaldorf/emoji-translate **/
