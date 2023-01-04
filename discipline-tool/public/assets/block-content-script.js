console.log("started");
disableScroll();
muteAll();
blockDisplay();
const blockImg = document.createElement("img");
blockImg.src = 'https://lab.bigzchats.com/lab2/photos/1.jpg';
blockImg.style.position = "absolute";
blockImg.style.top = "0px";
blockImg.style.left = "0px";
blockImg.style.zIndex = 999;
blockImg.style.width = "100%";
blockImg.style.height = "120%";
document.querySelector('body').appendChild(blockImg);
document.querySelector('title').textContent = "Stop Masturbate For Your Own Good!!"
console.log("success");

function disableScroll() {
    // Get the current page scroll position
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
  
        // if any scroll is attempted, set this to the previous value
        window.onscroll = function() {
            window.scrollTo(scrollLeft, scrollTop);
        };
}

function muteAll() {
    var elems = document.querySelectorAll("video, audio");
    for (var elem of elems) {
        elem.muted = true;
        elem.pause();
    }
}

function blockDisplay() {
    var elems = document.querySelectorAll("div");
    for (var elem of elems) {
        elem.style.display = "none";
    }
}