let currentStep = 1;

const totalSteps = 6;


/* ================================================= */
/* PREVIEW HTML */
/* ================================================= */

const previewHTML = {

    1: `
        <div class="box">
            My first box
        </div>
    `,

    2: `
        <div class="box">
            <div class="content">
                Treasure
            </div>
        </div>
    `,

    3: `
        <div class="box">
            Padding gives me room.
        </div>
    `,

    4: `
        <div class="box">
            The border protects the deck.
        </div>
    `,

    5: `
        <div class="fleet">

            <div class="box">
                Ship 1
            </div>

            <div class="box">
                Ship 2
            </div>

        </div>
    `,

    6: `
        <div class="crew">

            <div class="box">
                1
            </div>

            <div class="box">
                2
            </div>

            <div class="box">
                3
            </div>

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


/* BASIC BOX */

.box {

    width: 220px;

    min-height: 90px;

    padding: 20px;

    background: #c7a88b;

    border:
        3px solid
        #604c46;

    display: flex;

    align-items: center;

    justify-content: center;

    text-align: center;

    font-size: 1.1rem;

}


/* CONTENT */

.content {

    padding: 5px;

}


/* FLEET */

.fleet {

    width: 100%;

    min-height: 250px;

    display: flex;

    flex-direction: column;

    align-items: center;

    justify-content: center;

    background: #e8d7c3;

    border:
        2px dashed
        #8d746b;

}


/* CREW */

.crew {

    width: 100%;

    min-height: 200px;

    padding: 20px;

    display: flex;

    align-items: center;

    justify-content: center;

    gap: 15px;

    background: #e8d7c3;

    border:
        2px dashed
        #8d746b;

}


/* FLEXBOX ITEMS */

.crew .box {

    width: 80px;

    min-height: 80px;

    padding: 10px;

}


/* MOBILE */

@media (max-width: 600px) {

    .crew {

        flex-direction: column;

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


    /* Step Counter */

    const stepCounter =
        document.getElementById("stepCounter");

    if (stepCounter) {

        stepCounter.textContent =
            `${String(step).padStart(2, "0")} / 06`;

    }


    /* Titles */

    const titles = [

        "Every Element Is a Box",

        "Meet the Box Model",

        "Give the Crew Room",

        "Build the Edge",

        "Leave Room to Sail",

        "Prepare the Fleet"

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


    if (step === totalSteps) {

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
/* CHALLENGE */
/* ================================================= */

function goToChallenge() {

    /*
        Change this to the filename
        of your Flexbox challenge.
    */

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