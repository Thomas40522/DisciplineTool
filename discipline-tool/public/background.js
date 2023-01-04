// all website being banned
var bannedWebsites = [];
var bannedUserWebsites = [];

const userSitesAddress = "http://localhost:3050/sites";

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

async function fetchUserSiteInfo() {
    fetch(userSitesAddress)
    .then(async (userResponse) => {
        bannedUserWebsites = [];
        let userSiteInfos = await userResponse.json();
        for (const userSiteInfo of userSiteInfos) {
            var website = userSiteInfo.subdomain == null ? userSiteInfo.domain : userSiteInfo.domain.substring(userSiteInfo.subdomain.length + 1)
            bannedUserWebsites.push(website);
        }    
    }).catch((error) => {
        console.log(error)
    });
}

chrome.tabs.onActivated.addListener(() => {
    action();
})

chrome.tabs.onUpdated.addListener(() => {
    action();
})

chrome.runtime.onMessage.addListener(() => {
    console.log("run")
    banCurrentTab();
})

async function action() {
    await fetchSiteInfo();
    actionCurrentTab(bannedWebsites);
    // await fetchUserSiteInfo();
    // actionCurrentTab(bannedUserWebsites);
}


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
async function actionCurrentTab(banned) {
    let queryOptions = { active: true, currentWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    await chrome.tabs.query(queryOptions, function(tab) {

        console.log(tab[0].url);
        console.log(filter(tab[0].url, banned));
        if (filter(tab[0].url, banned)) {
            chrome.scripting.executeScript({
                target: { tabId: tab[0].id },
                files: ['assets/block-content-script.js']
            });
        }
    });
}

async function banCurrentTab() {
    let queryOptions = { active: true, currentWindow: true };
    await chrome.tabs.query(queryOptions, function(tab) {
        console.log("website detected " + tab[0].url);
        chrome.scripting.executeScript({
            target: { tabId: tab[0].id },
            files: ['assets/block-content-script.js']
        });
    });
}

