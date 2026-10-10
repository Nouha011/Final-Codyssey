let currentStep = 1;
const totalSteps = 7;


/* ================================================= */
/* PREVIEW HTML */
/* ================================================= */

const previewHTML = {

    1: `
        <div class="crew">
            <div class="hero">1</div>
            <div class="hero">2</div>
            <div class="hero">3</div>
        </div>
    `,

    2: `
        <div class="crew">
            <div class="hero">1</div>
            <div class="hero">2</div>
            <div class="hero">3</div>
            <div class="hero">4</div>
            <div class="hero">5</div>
            <div class="hero">6</div>
        </div>
    `,

    3: `
        <div class="crew">
            <div class="hero">1</div>
            <div class="hero">2</div>
            <div class="hero">3</div>
        </div>
    `,

    4: `
        <div class="crew">
            <div class="hero">1</div>
            <div class="hero">2</div>
            <div class="hero">3</div>
            <div class="hero">4</div>
            <div class="hero">5</div>
            <div class="hero">6</div>
        </div>
    `,

    5: `
        <div class="crew">
            <div class="hero">1</div>
            <div class="hero">2</div>
            <div class="hero">3</div>
            <div class="hero">4</div>
            <div class="hero">5</div>
            <div class="hero">6</div>
        </div>
    `,

    6: `
        <div class="crew">
            <div class="hero sword">1</div>
            <div class="hero shield">2</div>
            <div class="hero archer">3</div>
        </div>
    `,

    7: `
        <div class="crew">
            <div class="hero">1</div>
            <div class="hero">2</div>
            <div class="hero">3</div>
            <div class="hero">4</div>
            <div class="hero">5</div>
            <div class="hero">6</div>
        </div>
    `

};


/* ================================================= */
/* BASE CSS FOR LIVE PREVIEWS */
/* ================================================= */

const baseCSS = `

* {
    box-sizing: border-box;
}

body {
    margin: 0;
    padding: 25px;

    min-height: 100vh;

    background: #f5eee4;

    color: #2b2020;

    font-family: Arial, sans-serif;

    display: flex;

    align-items: center;
    justify-content: center;
}

.crew {

    width: 100%;

    min-height: 180px;

    display: grid;

    grid-template-columns:
        repeat(3, 1fr);

    gap: 15px;

    padding: 20px;

    border:
        2px dashed
        #8d746b;

    background: #e8d7c3;
}

.hero {

    min-width: 0;

    min-height: 70px;

    display: flex;

    align-items: center;
    justify-content: center;

    background: #c7a88b;

    border:
        2px solid
        #604c46;

    border-radius: 8px;

    font-size: 2rem;
}

.navbar-demo {

    width: 100%;

    padding: 18px;

    display: grid;

    grid-template-columns:
        auto 1fr auto;

    align-items: center;

    gap: 20px;

    background: #e8d7c3;

    border:
        2px solid
        #8d746b;
}

.brand {

    font-weight: bold;

    letter-spacing: 0.15em;
}

.links {

    display: grid;

    grid-template-columns:
        repeat(4, auto);

    justify-content: center;

    gap: 20px;

    font-size: 0.85rem;
}

.navbar-demo button {

    padding: 8px 14px;

    border:
        1px solid
        #604c46;

    background: #c7a88b;

    color: #2b2020;

    cursor: pointer;
}

@media (max-width: 600px) {

    .crew {

        grid-template-columns:
            1fr;
    }

    .navbar-demo {

        grid-template-columns:
            1fr;

        justify-items: center;
    }

    .links {

        grid-template-columns:
            1fr;

        justify-items: center;
    }

}

`;


/* ================================================= */
/* RUN EXAMPLE */
/* ================================================= */

function runExample(number) {

    const textarea =
        document.getElementById(`code${number}`);

    const preview =
        document.getElementById(`preview${number}`);

    if (!textarea || !preview) {
        return;
    }

    const userCSS =
        textarea.value;

    const documentHTML = `

        <!DOCTYPE html>

        <html>

        <head>

            <meta charset="UTF-8">

            <style>

                ${baseCSS}

                ${userCSS}

            </style>

        </head>

        <body>

            ${previewHTML[number]}

        </body>

        </html>

    `;

    preview.srcdoc =
        documentHTML;
}


/* ================================================= */
/* REVEAL ANIMATION */
/* ================================================= */

function setupReveal() {

    const elements =
        document.querySelectorAll(

            ".lesson-page.active .page-heading, " +

            ".lesson-page.active .lesson-text > *, " +

            ".lesson-page.active .interactive-example, " +

            ".lesson-page.active .final-action"

        );


    elements.forEach((element, index) => {

        element.classList.remove("visible");

        element.classList.add("reveal");

        element.style.transitionDelay =
            `${Math.min(index * 0.04, 0.25)}s`;

    });


    requestAnimationFrame(() => {

        const observer =
            new IntersectionObserver(

                (entries, observer) => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },

                {
                    threshold: 0.08,

                    rootMargin:
                        "0px 0px -40px 0px"
                }

            );


        document
            .querySelectorAll(
                ".lesson-page.active .reveal"
            )
            .forEach(element => {

                observer.observe(element);

            });

    });

}


/* ================================================= */
/* SHOW STEP */
/* ================================================= */

function showStep(step) {

    currentStep = step;


    document
        .querySelectorAll(".lesson-page")
        .forEach(page => {

            page.classList.remove("active");

        });


    const selectedPage =
        document.getElementById(`page${step}`);


    if (selectedPage) {

        selectedPage.classList.add("active");

    }


    document.body.className =
        `step-${step}`;


    /* Progress */

    const progressBar =
        document.getElementById("progressBar");

    if (progressBar) {

        progressBar.style.width =
            `${(step / totalSteps) * 100}%`;

    }


    const stepCounter =
        document.getElementById("stepCounter");

    if (stepCounter) {

        stepCounter.textContent =
            `${String(step).padStart(2, "0")} / 07`;

    }


    const titles = [

        "Build the Grid",

        "Draw the Map",

        "Share the Space",

        "Leave Room to Sail",

        "Claim Your Place",

        "Give Each Sailor a Command",

        "Sail Every Screen"

    ];


    const stepTitle =
        document.getElementById("stepTitle");

    if (stepTitle) {

        stepTitle.textContent =
            titles[step - 1];

    }


    /* Back */

    const backButton =
        document.getElementById("backButton");

    if (backButton) {

        backButton.disabled =
            step === 1;

    }


    /* Next / Challenge */

    const nextButton =
        document.getElementById("nextButton");

    const challengeButton =
        document.getElementById(
            "challengeNavButton"
        );


    if (step === 7) {

        nextButton.style.display =
            "none";

        challengeButton.style.display =
            "block";

    } else {

        nextButton.style.display =
            "block";

        nextButton.textContent =
            "Next →";

        challengeButton.style.display =
            "none";

    }


    /* Dots */

    document
        .querySelectorAll(".dot")
        .forEach((dot, index) => {

            dot.classList.toggle(
                "active",
                index + 1 === step
            );

        });


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });


    requestAnimationFrame(() => {

        setupReveal();

    });

}


/* ================================================= */
/* NEXT */
/* ================================================= */

function nextStep() {

    if (currentStep < totalSteps) {

        showStep(
            currentStep + 1
        );

    }

}


/* ================================================= */
/* PREVIOUS */
/* ================================================= */

function previousStep() {

    if (currentStep > 1) {

        showStep(
            currentStep - 1
        );

    }

}


/* ================================================= */
/* VIEWPORT */
/* ================================================= */

function setViewport(type) {

    const preview =
        document.getElementById(
            "preview7"
        );

    if (!preview) {
        return;
    }


    if (type === "mobile") {

        preview.classList.add(
            "mobile"
        );

        preview.style.width =
            "390px";

    } else {

        preview.classList.remove(
            "mobile"
        );

        preview.style.width =
            "100%";

    }


    runExample(7);

}


/* ================================================= */
/* CHALLENGE */
/* ================================================= */

function goToChallenge() {

    window.location.href =
        "challenge.html";

}


/* ================================================= */
/* MAP */
/* ================================================= */

function returnToMap() {

    window.location.href =
        "map.html";

}


/* ================================================= */
/* KEYBOARD NAVIGATION */
/* ================================================= */

document.addEventListener(
    "keydown",
    function(event) {

        const activeElement =
            document.activeElement;


        if (
            activeElement &&
            activeElement.tagName === "TEXTAREA"
        ) {
            return;
        }


        if (event.key === "ArrowRight") {

            nextStep();

        }


        if (event.key === "ArrowLeft") {

            previousStep();

        }

    }
);


/* ================================================= */
/* INITIALIZE */
/* ================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        for (
            let i = 1;
            i <= totalSteps;
            i++
        ) {

            runExample(i);

        }


        showStep(1);

    }
);