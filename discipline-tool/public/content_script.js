const keywords = [
  "fuck",
  "sperm",
  "erotic",
  "horny",
  "dick",
  "porn",
  "masturbat",
  "have sex",
  "sexy",
  " cum ",
  "cuming",
  "色情",
  "性爱",
  "情色",
  "成人",
  "快感",
  "巨乳",
  "情趣",
  "性感",
  "口交",
  "极品少妇"
]


chrome.storage.sync.get().then((result) => {
  var detect = result.detect
  var sensitivity = result.sensitivity
  sensitivity = 12 - sensitivity / 10;

  if (detect) {
    detectTab(sensitivity)
  }
}).catch(() => {
  console.log("run default")
  detectTab(5)
})


function detectTab(intensity) {
  var text = document.querySelector("body").innerText;
  text = text + document.querySelector("title").innerText;
  text = text.toLowerCase()
  console.log(text)
  var occurence = 0;
  for(const keyword of keywords) {
    occurence += getOccurence(text, keyword)
  }
  if (occurence >= intensity) {
    chrome.runtime.sendMessage("block this tab");
  }
  console.log(occurence)
}

function getOccurence(text, keyword) {
  var index = text.indexOf(keyword)
  var occurence = 0;
  while(index !== -1) {
    occurence++;
    console.log(keyword)
    index = text.indexOf(keyword, index + keyword.length)
  }
  return occurence;
}


