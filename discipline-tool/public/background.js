// all website being banned
var bannedWebsites = [];

//key word that is suspicious
const keyWords = [
    "porn",
    "erotic",
    "sex"
]

//fetch all the website from the sites.json file
async function fetchSiteInfo() {
    bannedWebsites = [];
    let response = await fetch('assets/sites.json');
    let siteInfos = await response.json();
    for (const siteInfo of siteInfos) {
        var website = siteInfo.subdomain == null ? siteInfo.domain : siteInfo.domain.substring(siteInfo.subdomain.length + 1)
        bannedWebsites.push(website);
    }
}

chrome.tabs.onActivated.addListener(async () => {
    await fetchSiteInfo();
    actionCurrentTab();
})

chrome.tabs.onUpdated.addListener(async () => {
    await fetchSiteInfo();
    actionCurrentTab();
})

//return true if input contains any of the keyword 
function filter(input, keyWords) {
    for (const keyWord of keyWords) {
        if (input?.toLowerCase().includes(keyWord)) {
            console.log(keyWord)
            return true;
        }
    }
    return false;
}


//place action on the current tab
async function actionCurrentTab() {
    let queryOptions = { active: true, currentWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    await chrome.tabs.query(queryOptions, function(tab) {
        console.log(tab[0].url);
        // console.log(keyWords);
        console.log(filter(tab[0].title, keyWords));
        // console.log(bannedWebsites);
        console.log(filter(tab[0].url, bannedWebsites));    
    });

}