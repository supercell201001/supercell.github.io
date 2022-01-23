gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(TextPlugin);
let tlMaster = gsap.timeline();

// base url for keyword search. concat keywords to end of the term
const term = "https://source.unsplash.com/featured/1600x900/?"

// reset scroll position on page reload
window.addEventListener('beforeunload', function(event) { 
    tlMaster.add(unlockScroll());
    tlMaster.seek(0);
    window.scrollTo(0, 0);
});

window.addEventListener('load', function(event) { 
    tlMaster.add(unlockScroll());
    window.scrollTo(0, 0);
    tlMaster.seek(0);
    tlMaster.add(lockScroll());
});




/* ----- SEQUENCING TIMELINE ----- */
tlMaster
.add(setAnimations())
.call(console.log("animations set"))
.add(introSquence())
.call(console.log("intro sequence"))
.add(scrollAnimate(), ">")
.call(console.log("scroll trigger"));

// when user enters input, change search photo on unsplash and change background
var form = document.getElementById("inputForm");
var input = document.getElementById("inputField");

function handleForm(event) { 
    event.preventDefault();

    // value for form       
    var keyword = input.value.toLowerCase();

    if (keyword === "birthday") {
        // unlock scroll to allow scroll to top
        tlMaster.add(unlockScroll());
        // move scroll to top
        window.scrollTo(0, 0);
        // get current url ../index.html
        let rawURL = window.location.href;
        if (rawURL.slice(0,5) === "https") {
            window.history.pushState({}, "Happy Birthday Rika!", "https://kucingapel.github.io/birthday/birthday");
            location.reload();
        } else {
        // slice off index.html
        let slicedURL = rawURL.slice(0,-10);
        // append birthday.html to url and push to history 
        window.history.pushState({}, "Happy Birthday Rika!", slicedURL + "birthday.html");
        // load url
        location.reload();

        }
    }    
    // search keyword on unsplash!
    tlMaster.add(changeBackground(term.concat(keyword)));
} 
form.addEventListener('submit', handleForm);

// e.key is the modern way of detecting keys
// e.keyCode is deprecated (left here for for legacy browsers support)
// keyup is not compatible with Jquery select(), Keydown is.

/* ------ TIMELINE ANIMATION FUNCTIONS ------ */

// timeline for setting initial animations before animating
function setAnimations() {
    var tl = gsap.timeline();
    // HIDE ALL IMAGES
    tl.set('.introIMG', {
        autoAlpha: 0
    })
    // HIDE INPUT BOX
    .set('.inputContainer',{
        autoAlpha: 0,
        y: '-=10'
    })
    .set('.plsScroll', {
        y: '+=30'
    });
    return tl;
}

// timeline for automatic intro sequence
function introSquence() {

    var tl = gsap.timeline();
    // ENTER BOX
    tl.to('.typing',{
    border: "10px solid white",
    y: '-=10',
    ease: 'power1.out',
    delay: 1.5,
    duration: 1.5
    })

    // ENTER > AND _
    .to('.arrow', {
        opacity: 100,
        duration: 1,
        ease: 'power4.in',
    },"<2")

    // CURSOR
    .to('.cursor1', 0.5, {
        opacity: 100, 
        ease: "power4.in", 
        repeat: -1, 
        yoyo:true, 
        repeatDelay: 0.5}, ">1")

    // hello rika!
    .to('.hello', {
        duration: 4, 
        text: "hello rika <3", 
        ease: "power4.inOut",
        repeat: 1, 
        yoyo:true, 
        repeatDelay: 1
    }, "<1")

    // welcome to Journey
    .to('.hello', {
        duration: 5, 
        text: "welcome to Journey", 
        ease: "power4.inOut",
        repeat: 1, 
        yoyo:true, 
        repeatDelay: 1
    },">1")

    // show landingIMG with text above
    .add(revealIMG('.landingIMG'), '<-1')
    
    /*
    .to('.landingIMG', {
        autoAlpha: 1,
        duration: 5,
    }, '<-1')
    */
    // unlock scrolling
    .to("html, body", {
        overflow: "visible"
    }, ">7")

    // flash "please scroll down"
    .to(".plsScroll", {
        opacity: 100,
        ease: 'power4.inOut',
        duration: 1.5,
        repeat: 5,
        yoyo: true,
        repeatDelay: 0.7
    }, ">")

}

// returns timeline for scrolltrigger animation in intro
function scrollAnimate() {

    var tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".intro",
            start: "center center",
            end: "20000 center",
            pin: ".intro",
            scrub: 1,
            once: true,
            /* 
            isActive intially true
            when scroll trigger finishes
            1. lock scroll to prevent going back up
            2. switch text box with input box
            */
            onToggle: self => {
                if (!self.isActive) {
                    // 1. lock scroll
                    tlMaster.add(lockScroll());

                    // 2. switch boxes
                    tlMaster.add(openInput());
                    
                }
            }
        }
    });

    tl.to('.hello', {
        duration: 2, 
        text: "you may be wondering", 
        ease: "power4.inOut",
        repeat: 1, 
        yoyo:true, 
        repeatDelay: 1
    },">1")


    .to('.hello', {
        duration: 2, 
        text: "what the heckie is this?", 
        ease: "power4.inOut",
        repeat: 1, 
        yoyo:true, 
        repeatDelay: 1
    },">1")

    //.add(revealIMG(".heckieIMG"), '<-1')

    .to('.hello', {
        duration: 1, 
        text: "well,", 
        ease: "power4.inOut",
        repeat: 1, 
        yoyo:true, 
        repeatDelay: 1
    },">1")

    .to('.hello', {
        duration: 3, 
        text: "for this special occasion", 
        ease: "power4.inOut",
        repeat: 1, 
        yoyo:true, 
        repeatDelay: 1
    },">1")

    .to('.hello', {
        duration: 3, 
        text: "i have built our own hub", 
        ease: "power4.inOut",
        repeat: 1, 
        yoyo:true, 
        repeatDelay: 1
    },">1")

    //.add(revealIMG('.hubIMG'), "<-1")

    .to('.hello', {
        duration: 2, 
        text: "try it out!", 
        ease: "power4.inOut",
        repeat: 1, 
        yoyo:true, 
        repeatDelay: 1
    },">1")

    .to('.hello', {
        duration: 3, 
        text: "type & enter 'birthday'", 
        ease: "power4.inOut",
        repeat: 1, 
        yoyo:true, 
        repeatDelay: 1
    },">1")

    //.add(revealIMG('.typingIMG'), "<-1");

    return tl;
}

function openInput() {
    var tl = gsap.timeline();
    tl.to('.typing',{
        autoAlpha: 0,
        duration: 0
    }, ">")
    
    .to('.inputContainer', {
        autoAlpha: 1,
        duration: 0
    }, ">")
    
    .to('#inputField', {
        border: "10px solid white",
        duration: 0
    })
    return tl;
}

function lockScroll() {
    var tl = gsap.timeline();
    tl.to('html, body', {
        overflow: 'hidden'
    });
    console.log('scroll locked');
    return tl;
}

function unlockScroll() {
    var tl = gsap.timeline();
    tl.to('html, body', {
        overflow: 'visible'
    });
    console.log('scroll unlocked');
    return tl;
}

/*
// get a function that changes background of userIMG
// based on user input
function changeBackground(term) {
    var tl = gsap.timeline();

    // first fade img
    tl.to('.userIMG', {
        autoAlpha: 1,
        opacity: 0,
        duration: 3
    })

    // then change background to user input
    .set('.userIMG', {
    attr: {src: term}
    })
    // finally load the new img

    .to('.userIMG', {
        opacity: 100,
        duration: 3
    });
    return tl;
}
*/
// reveals hidden IMG with class className
function revealIMG(className) {

    var tl = gsap.timeline();
      
    // reveal img
    tl.to(className, {
        autoAlpha: 1,
        duration: 5,
    },'<-1');
 
    return tl;
    
}