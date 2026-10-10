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
if (contactBtn && contactOverlay) {

    contactBtn.addEventListener("click", function () {

        const nebulaLoader =
            document.getElementById("nebulaLoader");

        /* Show the same Nebula loader */
        if (nebulaLoader) {

            nebulaLoader.classList.remove("hide");

        }

        /* Open contact after loader animation */
        setTimeout(function () {

            if (nebulaLoader) {
                nebulaLoader.classList.add("hide");
            }

            contactOverlay.classList.add("active");

            document.body.style.overflow = "hidden";

        }, 900);

    });

}


/* =====================================================
   CLOSE CONTACT
===================================================== */

function closeContact() {

    if (!contactOverlay) return;

    contactOverlay.classList.remove("active");

    document.body.style.overflow = "";

}


if (contactClose) {

    contactClose.addEventListener("click", function () {

        closeContact();

    });

}


/* =====================================================
   CLICK OUTSIDE
===================================================== */

if (contactOverlay) {

    contactOverlay.addEventListener("click", function (event) {

        if (event.target === contactOverlay) {

            closeContact();

        }

    });

}


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

/* =====================================================
   SEND CONTACT FORM TO WHATSAPP - FIXED
===================================================== */

if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const whatsappNumber = "919789976929";

        // Get form values safely
        const name = document.getElementById("fullName").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();

        const company =
            document.getElementById("company").value.trim() ||
            "Not provided";

        const projectDetails =
            document.getElementById("projectDetails").value.trim();

        const contactMethod =
            document.getElementById("contactMethod").value ||
            "Not specified";

        // These fields are not currently present in your HTML
        const projectType =
            document.getElementById("projectType")?.value ||
            "Not provided";

        const budget =
            document.getElementById("budget")?.value ||
            "Not provided";

        // Prepare WhatsApp message
        const message = `*NEW PROJECT ENQUIRY*

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

Sent through The Nebula Production website.`;

        // Create WhatsApp link
        const whatsappURL =
            "https://wa.me/" +
            whatsappNumber +
            "?text=" +
            encodeURIComponent(message);

            
const successPopup = document.createElement("div");

successPopup.innerHTML = `
    <div style="font-size:28px;color:#b58aff;margin-bottom:12px;">✓</div>
    <h3 style="margin:0 0 10px;">Message Received!</h3>
    <p style="margin:0;color:#ddd;line-height:1.6;">
        Thank you for contacting The Nebula Production.
        We'll contact you shortly.
    </p>
`;

Object.assign(successPopup.style, {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "min(85%, 340px)",
    padding: "28px 22px",
    background: "#100d18",
    color: "#fff",
    border: "1px solid #a66cff",
    borderRadius: "16px",
    boxShadow: "0 0 30px rgba(166,108,255,0.3)",
    textAlign: "center",
    fontFamily: "inherit",
    zIndex: "999999",
    opacity: "0",
    transition: "opacity 0.25s ease"
});

document.body.appendChild(successPopup);

requestAnimationFrame(() => {
    successPopup.style.opacity = "1";
});

setTimeout(() => {
    window.location.href = whatsappURL;
}, 1500);

        // Open WhatsApp
        
    });
}


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
   AUTOMATIC SLIDER VARIABLES
===================================================== */

let autoSlideTimer = null;

/* Change poster every 4 seconds */
const autoSlideDelay = 3500;


/* =====================================================
   TOTAL NUMBER
===================================================== */

if (workTotal) {

    workTotal.textContent =
        String(totalWorks).padStart(2, "0");

}


/* =====================================================
   UPDATE SLIDER
===================================================== */

function updateWorks() {

    if (
        !worksTrack ||
        !workPosters.length
    ) {
        return;
    }


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

    if (workCurrent) {

        workCurrent.textContent =
            String(currentWork + 1).padStart(2, "0");

    }


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


    if (!wrapper) return;


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

    if (totalWorks <= 0) return;

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

    if (totalWorks <= 0) return;

    currentWork--;

    if (currentWork < 0) {

        currentWork = totalWorks - 1;

    }

    updateWorks();

}


/* =====================================================
   AUTOMATIC SLIDER
===================================================== */

function startAutoSlide() {

    /* Stop any existing timer first */
    stopAutoSlide();


    if (totalWorks <= 1) {
        return;
    }


    autoSlideTimer = setInterval(function () {

        currentWork++;

        if (currentWork >= totalWorks) {

            currentWork = 0;

        }

        updateWorks();

    }, autoSlideDelay);

}


/* =====================================================
   STOP AUTOMATIC SLIDER
===================================================== */

function stopAutoSlide() {

    if (autoSlideTimer) {

        clearInterval(autoSlideTimer);

        autoSlideTimer = null;

    }

}


/* =====================================================
   RESTART AUTOMATIC SLIDER
===================================================== */

function restartAutoSlide() {

    startAutoSlide();

}


/* =====================================================
   BUTTONS
===================================================== */

if (worksNext) {

    worksNext.addEventListener(
        "click",
        function () {

            nextWork();

            /* Restart 4-second timer */
            restartAutoSlide();

        }
    );

}


if (worksPrev) {

    worksPrev.addEventListener(
        "click",
        function () {

            previousWork();

            /* Restart 4-second timer */
            restartAutoSlide();

        }
    );

}


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

            restartAutoSlide();

        }


        if (
            event.key === "ArrowLeft"
        ) {

            previousWork();

            restartAutoSlide();

        }

    }
);


/* =====================================================
   TOUCH / SWIPE SUPPORT
===================================================== */

let touchStartX = 0;

let touchEndX = 0;


if (worksTrack) {

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

}


function handleSwipe() {

    const difference =
        touchStartX - touchEndX;


    /* -----------------------------------------------
       SWIPE LEFT
    ----------------------------------------------- */

    if (difference > 50) {

        nextWork();

        restartAutoSlide();

    }


    /* -----------------------------------------------
       SWIPE RIGHT
    ----------------------------------------------- */

    if (difference < -50) {

        previousWork();

        restartAutoSlide();

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

        /* Start automatic sliding */
        startAutoSlide();

    }
);


/* =====================================================
   BACK TO TOP
===================================================== */

const scrollTopButton =
    document.querySelector(".scroll-top");


if (scrollTopButton) {

    scrollTopButton.addEventListener(
        "click",
        function () {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }
    );

}


/* =====================================================
   VIDEO MUTE / UNMUTE
===================================================== */

const storyVideo =
    document.getElementById("storyVideo");

const soundBtn =
    document.getElementById("soundBtn");


if (storyVideo && soundBtn) {

    soundBtn.addEventListener(
        "click",
        async function (event) {

            event.preventDefault();

            event.stopPropagation();


            try {

                if (storyVideo.muted) {

                    /* Turn sound ON */

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

                    /* Turn sound OFF */

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

        }
    );

}


/* =====================================================
   BRIGHT PURPLE TWINKLING STARS
===================================================== */

const starContainer =
    document.getElementById("twinkle-stars");


if (starContainer) {

    /* Number of stars */

    const starCount = 20;


    for (let i = 0; i < starCount; i++) {

        const star =
            document.createElement("span");


        star.classList.add(
            "twinkle-star"
        );


        /* -----------------------------------------
           RANDOM STAR SIZE
        ----------------------------------------- */

        const size =
            Math.random();


        if (size < 0.65) {

            star.classList.add("small");

        } else if (size < 0.95) {

            star.classList.add("medium");

        } else {

            star.classList.add("large");

        }


        /* -----------------------------------------
           RANDOM POSITION
        ----------------------------------------- */

        star.style.left =
            Math.random() * 100 + "%";

        star.style.top =
            Math.random() * 100 + "%";


        /* -----------------------------------------
           DIFFERENT SPEED
        ----------------------------------------- */

        star.style.animationDuration =
            (3.2 + Math.random() * 2.5) + "s";


        /* -----------------------------------------
           DIFFERENT START TIME
           Prevents all stars glowing together
        ----------------------------------------- */

        star.style.animationDelay =
            (Math.random() * 8) + "s";


        starContainer.appendChild(star);

    }

}


/* =====================================================
   CINEMATIC SECTION SCROLL REVEAL
   ===================================================== */

const cinematicSections = document.querySelectorAll(
    ".what-we-do, .works-section, .contact-section, .footer"
);

const cinematicObserver = new IntersectionObserver(
    function (entries) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {

                entry.target.classList.add("section-visible");

            }

        });

    },
    {
        threshold: 0.15
    }
);


cinematicSections.forEach(function (section) {
    cinematicObserver.observe(section);
});


/* =====================================================
   CAMERA REEL - PAUSE WHEN OFFSCREEN
===================================================== */

const cameraReelTrack = document.querySelector(".camera-reel-track");

if (cameraReelTrack) {

    const cameraObserver = new IntersectionObserver(
        function (entries) {

            entries.forEach(function (entry) {

                cameraReelTrack.style.animationPlayState =
                    entry.isIntersecting ? "running" : "paused";

            });

        },
        { threshold: 0.1 }
    );

    cameraObserver.observe(cameraReelTrack);

}


/* =====================================================
   NEBULA PAGE LOADER
===================================================== */

window.addEventListener("load", function () {

    const nebulaLoader =
        document.getElementById("nebulaLoader");

    if (!nebulaLoader) return;

    setTimeout(function () {
        nebulaLoader.classList.add("hide");
    }, 2250);

});

/* =====================================================
   NEBULA LOADER FOR POSTERS + FOOTER LINKS
===================================================== */

document.addEventListener("click", function (event) {

    const clickedLink =
        event.target.closest(
            ".work-poster, .footer-social, .footer-contact-item"
        );

    if (!clickedLink) return;

    /* Ignore links that do not have a destination */
    const destination = clickedLink.href;

    if (!destination) return;

    /* Do not interfere with modifier-key clicks */
    if (
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        event.metaKey
    ) {
        return;
    }

    event.preventDefault();

    const nebulaLoader =
        document.getElementById("nebulaLoader");

    /* If loader does not exist, use normal navigation */
    if (!nebulaLoader) {
        window.location.href = destination;
        return;
    }

    /* Show loader */
    nebulaLoader.classList.remove("hide");

    /* Navigate after 1.5 seconds */
    setTimeout(function () {

        window.location.href = destination;

    }, 1500);

});
