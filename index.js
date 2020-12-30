//grabs container div in html
const container = document.querySelector(".container");

//images in array
//simplified so you can easily add more
let images = ['image1.jpg', 'image2.jpg', 'image3.jpg', 'image4.jpg'];

//image folder directory
const imageFolder = './images/';

//creates picture div and set bg to the first in array
const picFrame = document.createElement("div");
    picFrame.setAttribute("class", "picFrame");
const picFrameInner = document.createElement("div");
    picFrameInner.setAttribute("class", "picFrameInner");
    picFrameInner.style.background = `url(${imageFolder + images[0]}) center/cover`;
picFrame.appendChild(picFrameInner);
container.appendChild(picFrame);

//the index number of the array
let i = 0;


//previous button
const prevBtn = document.createElement("input");
    prevBtn.type = "button";
    prevBtn.value = "<";
    prevBtn.setAttribute("id", "prev");
    prevBtn.addEventListener('click', () => {
        if (i <= 0) {
            i = images.length - 1;
            picFrameInner.style.background = `url(${imageFolder + images[i]}) center/cover`;
            picFrame.style.background = `url(${imageFolder + images[0]}) center/cover`;
            picFrame.appendChild(picFrameInner);
            dotActive();
        } else {
            i--
            picFrameInner.style.background = `url(${imageFolder + images[i]}) center/cover`;
            picFrame.style.background = `url(${imageFolder + images[i + 1]}) center/cover`;
            picFrame.appendChild(picFrameInner);
            dotActive();
        }
        clearInterval(rotate);
        rotate = setInterval(next, 5000);
    })
container.appendChild(prevBtn);


//next button
const nextBtn = document.createElement("input");
    nextBtn.type = "button";
    nextBtn.value = ">";
    nextBtn.setAttribute("id", "next");
    nextBtn.addEventListener('click', next);
container.appendChild(nextBtn);


//next func is separate because it's called in setInterval
function next() {
    if (i >= images.length - 1) {
        i = 0;
        picFrameInner.style.background = `url(${imageFolder + images[i]}) center/cover`;
        picFrame.style.background = `url(${imageFolder + images[images.length - 1]}) center/cover`;
        picFrame.appendChild(picFrameInner);
        dotActive();
    } else {
        i++
        picFrameInner.style.background = `url(${imageFolder + images[i]}) center/cover`;
        picFrame.style.background = `url(${imageFolder + images[i - 1]}) center/cover`;
        picFrame.appendChild(picFrameInner);
        dotActive();
    }

    clearInterval(rotate);
    rotate = setInterval(next, 5000);
}


//automatic rotator
let rotate = setInterval(next, 5000);


//the dots
function dotMaker() {
    const dotContainer = document.createElement("div");
        dotContainer.setAttribute("class", "dotBox");
        container.appendChild(dotContainer);
    for (let a = 0; a < images.length; a++) {
        const dot = document.createElement("div");
            dot.setAttribute("class", "dot");
            dot.addEventListener('click', () => {
                picFrameInner.style.background = `url(${imageFolder + images[a]}) center/cover`;
                picFrame.style.background = `url(${imageFolder + images[a - 1]}) center/cover`;
                //resetting i
                i = a;
                //func to change dot background
                dotActive();
                //resets setInterval
                clearInterval(rotate);
                rotate = setInterval(next, 5000);
            });

            dotContainer.appendChild(dot);
    }
}
dotMaker();

function dotActive() {
    const dotArr = document.querySelectorAll(".dot");
        dotArr.forEach(e => {
            e.style.background = "rgba(255,255,255,0.5)";
        })
        dotArr[i].style.background = "rgba(255,255,255,0.9)";
}





// https://theodinproject.com/lessons/dynamic-user-interface-interactions

/*

    This one is a little more involved than the last two, so think about how you would set up the different elements within the site.

    Set up a very wide div which will contain the individual “slides” of each image. By appropriately positioning that div inside a container div (which acts like a picture frame), you can choose which slide is visible at any given time.

    Once you have the slider positioned properly, build functions for “next” and “previous” which will advance to the next or previous slide accordingly. Make the transitions smooth using simple effects.

    Set up arrow buttons which activate those functions and play with cycling through the images.

    Add in some navigation dots at the bottom of the slides. Make a horizontal series of empty circles with CSS immediately below the slideshow. Each circle represents a slide, so whenever a new slide is activated, its corresponding circle gets filled in so you can tell where in the show you are. Make each circle link to that particular slide, so you can click on the circle and it will jump to that slide.

    Add a timeout which advances the slides every 5 seconds.

    Play around with your slideshow!

*/