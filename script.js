/* =====================================================
   NEBULA PRODUCTION
   MAIN JAVASCRIPT
===================================================== */


/* =====================================================
   CONTACT POPUP
===================================================== */

const contactBtn =
    document.getElementById("contactBtn");

const contactOverlay =
    document.getElementById("contactOverlay");

const contactClose =
    document.getElementById("contactClose");

const contactForm =
    document.getElementById("contactForm");


/* =====================================================
   OPEN CONTACT
===================================================== */

contactBtn.addEventListener("click", function () {

    contactOverlay.classList.add("active");

    document.body.style.overflow = "hidden";

});


/* =====================================================
   CLOSE CONTACT
===================================================== */

function closeContact() {

    contactOverlay.classList.remove("active");

    document.body.style.overflow = "";

}


contactClose.addEventListener("click", function () {

    closeContact();

});


/* =====================================================
   CLICK OUTSIDE
===================================================== */

contactOverlay.addEventListener("click", function (event) {

    if (event.target === contactOverlay) {

        closeContact();

    }

});


/* =====================================================
   ESC KEY
===================================================== */

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        closeContact();

    }

});


/* =====================================================
   SEND CONTACT FORM TO WHATSAPP
===================================================== */

contactForm.addEventListener("submit", function (event) {

    event.preventDefault();


    /* =================================================
       WHATSAPP NUMBER
    ================================================= */

    const whatsappNumber = "919789976929";


    /* =================================================
       GET FORM VALUES
    ================================================= */

    const name =
        document.getElementById("fullName").value.trim();


    const email =
        document.getElementById("email").value.trim();


    const phone =
        document.getElementById("phone").value.trim();


    const company =
        document.getElementById("company").value.trim()
        || "Not provided";


    const projectType =
        document.getElementById("projectType").value;


    const projectDetails =
        document.getElementById("projectDetails").value.trim();


    const budget =
        document.getElementById("budget").value
        || "Not provided";


    const contactMethod =
        document.getElementById("contactMethod").value
        || "Not specified";


    /* =================================================
       WHATSAPP MESSAGE
    ================================================= */

    const message =

`*NEW PROJECT ENQUIRY*

*Full Name:*
${name}

*Email Address:*
${email}

*Phone / WhatsApp:*
${phone}

*Company / Brand:*
${company}

*Project Type:*
${projectType}

*Project Details:*
${projectDetails}

*Budget Range:*
${budget}

*Preferred Contact Method:*
${contactMethod}

--------------------------------

Sent through The Nebula Production website.`;


    /* =================================================
       WHATSAPP URL
    ================================================= */

    const whatsappURL =
        "https://wa.me/" +
        whatsappNumber +
        "?text=" +
        encodeURIComponent(message);


    /* =================================================
       OPEN WHATSAPP
    ================================================= */

    window.open(
        whatsappURL,
        "_blank"
    );

});



/* =====================================================
   OUR WORKS SLIDER
===================================================== */

const worksTrack =
    document.getElementById("worksTrack");

const worksPrev =
    document.getElementById("worksPrev");

const worksNext =
    document.getElementById("worksNext");

const workCurrent =
    document.getElementById("workCurrent");

const workTotal =
    document.getElementById("workTotal");

const workPosters =
    document.querySelectorAll(".work-poster");


/* =====================================================
   SLIDER VARIABLES
===================================================== */

let currentWork = 0;

const totalWorks =
    workPosters.length;


/* =====================================================
   TOTAL NUMBER
===================================================== */

workTotal.textContent =
    String(totalWorks).padStart(2, "0");


/* =====================================================
   UPDATE SLIDER
===================================================== */

function updateWorks() {


    /* -----------------------------------------------
       REMOVE ACTIVE FROM ALL
    ----------------------------------------------- */

    workPosters.forEach(function (poster) {

        poster.classList.remove("active");

    });


    /* -----------------------------------------------
       ACTIVE POSTER
    ----------------------------------------------- */

    workPosters[currentWork]
        .classList.add("active");


    /* -----------------------------------------------
       CURRENT NUMBER
    ----------------------------------------------- */

    workCurrent.textContent =
        String(currentWork + 1).padStart(2, "0");


    /* -----------------------------------------------
       CALCULATE POSITION
    ----------------------------------------------- */

    const poster =
        workPosters[currentWork];

    const posterWidth =
        poster.offsetWidth;


    const gap =
        parseFloat(
            getComputedStyle(worksTrack).gap
        ) || 0;


    const wrapper =
        worksTrack.parentElement;


    const wrapperWidth =
        wrapper.offsetWidth;


    const centerPosition =
        (wrapperWidth - posterWidth) / 2;


    const translateX =
        centerPosition -
        currentWork * (posterWidth + gap);


    worksTrack.style.transform =
        `translateX(${translateX}px)`;

}


/* =====================================================
   NEXT WORK
===================================================== */

function nextWork() {

    currentWork++;

    if (currentWork >= totalWorks) {

        currentWork = 0;

    }

    updateWorks();

}


/* =====================================================
   PREVIOUS WORK
===================================================== */

function previousWork() {

    currentWork--;

    if (currentWork < 0) {

        currentWork = totalWorks - 1;

    }

    updateWorks();

}


/* =====================================================
   BUTTONS
===================================================== */

worksNext.addEventListener(
    "click",
    nextWork
);


worksPrev.addEventListener(
    "click",
    previousWork
);


/* =====================================================
   KEYBOARD CONTROLS
===================================================== */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "ArrowRight"
        ) {

            nextWork();

        }


        if (
            event.key === "ArrowLeft"
        ) {

            previousWork();

        }

    }
);


/* =====================================================
   TOUCH / SWIPE SUPPORT
===================================================== */

let touchStartX = 0;

let touchEndX = 0;


worksTrack.addEventListener(
    "touchstart",
    function (event) {

        touchStartX =
            event.touches[0].clientX;

    },
    {
        passive: true
    }
);


worksTrack.addEventListener(
    "touchend",
    function (event) {

        touchEndX =
            event.changedTouches[0].clientX;

        handleSwipe();

    },
    {
        passive: true
    }
);


function handleSwipe() {

    const difference =
        touchStartX - touchEndX;


    /* SWIPE LEFT */

    if (difference > 50) {

        nextWork();

    }


    /* SWIPE RIGHT */

    if (difference < -50) {

        previousWork();

    }

}


/* =====================================================
   RESIZE
===================================================== */

window.addEventListener(
    "resize",
    function () {

        updateWorks();

    }
);


/* =====================================================
   INITIALIZE SLIDER
===================================================== */

window.addEventListener(
    "load",
    function () {

        updateWorks();

    }
);


/* =====================================================
   BACK TO TOP
===================================================== */

const scrollTopButton =
    document.querySelector(".scroll-top");


scrollTopButton.addEventListener(
    "click",
    function () {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }
);
/* =====================================================
   VIDEO MUTE / UNMUTE
===================================================== */

const storyVideo = document.getElementById("storyVideo");
const soundBtn = document.getElementById("soundBtn");

if (storyVideo && soundBtn) {

    soundBtn.addEventListener("click", async function (event) {

        event.preventDefault();
        event.stopPropagation();

        try {

            if (storyVideo.muted) {

                // Turn sound ON
                storyVideo.muted = false;
                storyVideo.volume = 1;

                await storyVideo.play();

                soundBtn.textContent = "🔊";
                soundBtn.setAttribute(
                    "aria-label",
                    "Mute video"
                );
                soundBtn.setAttribute(
                    "title",
                    "Mute video"
                );

            } else {

                // Turn sound OFF
                storyVideo.muted = true;

                soundBtn.textContent = "🔇";
                soundBtn.setAttribute(
                    "aria-label",
                    "Unmute video"
                );
                soundBtn.setAttribute(
                    "title",
                    "Unmute video"
                );

            }

        } catch (error) {

            console.log(
                "Could not change video audio:",
                error
            );

        }

    });

}


/* =========================================
   BRIGHT PURPLE TWINKLING STARS
   ========================================= */

const starContainer = document.getElementById("twinkle-stars");

if (starContainer) {

    /* Number of stars */

    const starCount = 100;


    for (let i = 0; i < starCount; i++) {

        const star = document.createElement("span");

        star.classList.add("twinkle-star");


        /* RANDOM STAR SIZE */

        const size = Math.random();

        if (size < 0.55) {

            star.classList.add("small");

        } else if (size < 0.88) {

            star.classList.add("medium");

        } else {

            star.classList.add("large");
        }


        /* RANDOM POSITION */

        star.style.left = Math.random() * 100 + "%";
        star.style.top = Math.random() * 100 + "%";


        /* DIFFERENT SPEED */

        star.style.animationDuration =
            (3.2 + Math.random() * 2.5) + "s";


        /* DIFFERENT START TIME
           prevents all stars glowing together */

        star.style.animationDelay =
            (Math.random() * 8) + "s";


        starContainer.appendChild(star);
    }
}
