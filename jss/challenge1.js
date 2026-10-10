/* =================================================
   CODYSSEY — BEFORE THE VOYAGE CHALLENGE
================================================= */


/* =================================================
   STATE
================================================= */

let qcmCompleted = false;

let commandCompleted = [
    false,
    false,
    false,
    false,
    false
];


/* =================================================
   QCM ANSWERS
================================================= */

const correctAnswers = {
    q1: "b",
    q2: "c",
    q3: "b",
    q4: "c",
    q5: "c"
};


/* =================================================
   NORMALIZE CSS
================================================= */

function normalizeCSS(css) {

    return css
        .toLowerCase()
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/\s+/g, " ")
        .trim();

}


/* =================================================
   CHECK CSS PROPERTY
================================================= */

function hasProperty(css, property, value) {

    const cleanCSS = normalizeCSS(css);

    const pattern =
        new RegExp(
            property +
            "\\s*:\\s*" +
            value
        );

    return pattern.test(cleanCSS);

}


/* =================================================
   QCM
================================================= */

function checkQCM() {

    let score = 0;

    Object.keys(correctAnswers).forEach(function(question) {

        const selected =
            document.querySelector(
                `input[name="${question}"]:checked`
            );

        if (
            selected &&
            selected.value === correctAnswers[question]
        ) {
            score++;
        }

    });


    const feedback =
        document.getElementById(
            "qcmFeedback"
        );


    if (score === 5) {

        qcmCompleted = true;

        feedback.className =
            "feedback success";

        feedback.textContent =
            "Perfect. The ship is ready for the next trial.";

        document
            .getElementById("nextSectionButton")
            .disabled = false;

    } else {

        qcmCompleted = false;

        feedback.className =
            "feedback error";

        feedback.textContent =
            `${score}/5 correct. Check your answers and try again.`;

    }

}


/* =================================================
   GO TO COMMANDS
================================================= */

function goToCommands() {

    if (!qcmCompleted) {
        return;
    }

    document
        .getElementById("qcmSection")
        .classList.remove("active");

    document
        .getElementById("commandsSection")
        .classList.add("active");


    document
        .getElementById("progressQCM")
        .classList.remove("active");

    document
        .getElementById("progressCommands")
        .classList.add("active");


    document
        .getElementById("dot1")
        .classList.remove("active");

    document
        .getElementById("dot2")
        .classList.add("active");


    document
        .getElementById("nextSectionButton")
        .style.display = "none";


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =================================================
   PREVIEW BASE CSS
================================================= */

const previewBaseCSS = `

* {
    box-sizing: border-box;
}

body {
    margin: 0;
    padding: 30px;

    font-family: Arial, sans-serif;

    background: #f5e4ef;
    color: #21191a;
}

.treasure {
    width: 120px;
    height: 80px;

    background: #c4a574;

    display: flex;
    align-items: center;
    justify-content: center;
}

.crew-member {
    width: 100px;
    height: 60px;

    background: #c4a574;

    display: flex;
    align-items: center;
    justify-content: center;
}

.cabin {
    background: #c4a574;

    display: flex;
    align-items: center;
    justify-content: center;
}

.crew {
    background: #eadbc5;

    padding: 15px;
}

.member {
    width: 80px;
    height: 55px;

    background: #877271;

    color: white;

    display: flex;
    align-items: center;
    justify-content: center;
}

.ship {
    background: #877271;

    display: flex;
    align-items: center;
    justify-content: center;
}

`;


/* =================================================
   PREVIEW HTML
================================================= */

const previewHTML = {

    1: `
        <div class="treasure">
            Treasure
        </div>
    `,

    2: `
        <div class="crew-member">
            Sailor
        </div>

        <div class="crew-member">
            Sailor
        </div>
    `,

    3: `
        <div class="cabin">
            Cabin
        </div>
    `,

    4: `
        <div class="crew">

            <div class="member">
                Odysseus
            </div>

            <div class="member">
                Athena
            </div>

            <div class="member">
                Telemachus
            </div>

        </div>
    `,

    5: `
        <div class="ship">

            <div class="crew">

                <div class="member">
                    Odysseus
                </div>

                <div class="member">
                    Athena
                </div>

                <div class="member">
                    Telemachus
                </div>

            </div>

        </div>
    `
};


/* =================================================
   RUN COMMAND
================================================= */

function runCommand(number) {

    const textarea =
        document.getElementById(
            `code${number}`
        );

    const iframe =
        document.getElementById(
            `preview${number}`
        );

    const feedback =
        document.getElementById(
            `feedback${number}`
        );


    const userCSS =
        textarea.value;


    /* ---------------------------------------------
       SHOW LIVE PREVIEW
    --------------------------------------------- */

    iframe.srcdoc = `

        <!DOCTYPE html>

        <html>

        <head>

            <style>

                ${previewBaseCSS}

                ${userCSS}

            </style>

        </head>

        <body>

            ${previewHTML[number]}

        </body>

        </html>

    `;


    /* ---------------------------------------------
       CHECK COMMAND
    --------------------------------------------- */

    let correct = false;


    if (number === 1) {

        correct =
            hasProperty(
                userCSS,
                "padding",
                "20px"
            );

    }


    if (number === 2) {

        correct =
            hasProperty(
                userCSS,
                "margin",
                "30px"
            );

    }


    if (number === 3) {

        correct =
            hasProperty(
                userCSS,
                "width",
                "200px"
            ) &&

            hasProperty(
                userCSS,
                "height",
                "100px"
            ) &&

            hasProperty(
                userCSS,
                "border",
                "3px solid black"
            );

    }


    if (number === 4) {

        correct =
            hasProperty(
                userCSS,
                "display",
                "flex"
            ) &&

            hasProperty(
                userCSS,
                "gap",
                "20px"
            );

    }


    if (number === 5) {

        correct =
            hasProperty(
                userCSS,
                "width",
                "300px"
            ) &&

            hasProperty(
                userCSS,
                "height",
                "150px"
            ) &&

            hasProperty(
                userCSS,
                "padding",
                "20px"
            ) &&

            hasProperty(
                userCSS,
                "border",
                "3px solid black"
            ) &&

            hasProperty(
                userCSS,
                "margin",
                "30px"
            ) &&

            hasProperty(
                userCSS,
                "display",
                "flex"
            ) &&

            hasProperty(
                userCSS,
                "gap",
                "15px"
            );

    }


    /* ---------------------------------------------
       FEEDBACK
    --------------------------------------------- */

    if (correct) {

        commandCompleted[number - 1] = true;

        feedback.className =
            "command-feedback success";

        feedback.textContent =
            "✓ Correct. The command worked.";

        checkAllCommands();

    } else {

        commandCompleted[number - 1] = false;

        feedback.className =
            "command-feedback error";

        feedback.textContent =
            "✕ Not quite. Read the instructions and try again.";

    }

}


/* =================================================
   CHECK ALL COMMANDS
================================================= */

function checkAllCommands() {

    const allComplete =
        commandCompleted.every(
            function(value) {
                return value === true;
            }
        );


    if (!allComplete) {
        return;
    }


    document
        .getElementById("successMessage")
        .classList.add("visible");

}


/* =================================================
   RETURN TO MAP
================================================= */

function returnToMap() {

    window.location.href =
        "map.html";

}


/* =================================================
   START FLEXBOX
================================================= */

function startFlexbox() {

    /*
       Change this filename if your Flexbox
       lesson uses another filename.
    */

    window.location.href =
        "flexbox.html";

}


/* =================================================
   INITIALIZE PREVIEWS
================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        for (
            let i = 1;
            i <= 5;
            i++
        ) {

            const iframe =
                document.getElementById(
                    `preview${i}`
                );

            iframe.srcdoc = `

                <!DOCTYPE html>

                <html>

                <head>

                    <style>

                        ${previewBaseCSS}

                    </style>

                </head>

                <body>

                    ${previewHTML[i]}

                </body>

                </html>

            `;

        }

    }
);