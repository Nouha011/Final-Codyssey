
let currentStep = 1;
const totalSteps = 7;

const previewHTML = {
    1: `
        <div class="crew">
            <div class="hero">⚔</div>
            <div class="hero">🛡</div>
            <div class="hero">🏹</div>
        </div>
    `,
    2: `
        <div class="crew">
            <div class="hero">⚔</div>
            <div class="hero">🛡</div>
            <div class="hero">🏹</div>
        </div>
    `,
    3: `
        <div class="crew">
            <div class="hero">⚔</div>
            <div class="hero">🛡</div>
            <div class="hero">🏹</div>
        </div>
    `,
    4: `
        <div class="crew">
            <div class="hero">⚔</div>
            <div class="hero">🛡</div>
            <div class="hero">🏹</div>
        </div>
    `,
    5: `
        <div class="crew">
            <div class="hero">⚔</div>
            <div class="hero">🛡</div>
            <div class="hero">🏹</div>
            <div class="hero">🏺</div>
            <div class="hero">🪶</div>
            <div class="hero">🗡</div>
        </div>
    `,
    6: `
        <div class="crew">
            <div class="hero sword">⚔</div>
            <div class="hero shield">🛡</div>
            <div class="hero archer">🏹</div>
        </div>
    `,
    7: `
        <div class="navbar-demo">
            <div class="brand">CODYSSEY</div>
            <div class="links">
                <span>Home</span>
                <span>Lessons</span>
                <span>Challenges</span>
                <span>About</span>
            </div>
            <button>Begin</button>
        </div>
    `
};

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
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 15px;
    padding: 20px;
    border: 2px dashed #8d746b;
    background: #e8d7c3;
}

.hero {
    width: 70px;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    background: #c7a88b;
    border: 2px solid #604c46;
    border-radius: 8px;
    font-size: 2rem;
}

.navbar-demo {
    width: 100%;
    padding: 18px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    background: #e8d7c3;
    border: 2px solid #8d746b;
}

.brand {
    font-weight: bold;
    letter-spacing: 0.15em;
}

.links {
    display: flex;
    gap: 20px;
    font-size: 0.85rem;
}

.navbar-demo button {
    padding: 8px 14px;
    border: 1px solid #604c46;
    background: #c7a88b;
    color: #2b2020;
    cursor: pointer;
}

@media (max-width: 600px) {
    .navbar-demo {
        flex-direction: column;
    }

    .links {
        flex-direction: column;
        align-items: center;
    }
}
`;

function runExample(number) {
    const textarea = document.getElementById(`code${number}`);
    const preview = document.getElementById(`preview${number}`);

    if (!textarea || !preview) return;

    const userCSS = textarea.value;

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

    preview.srcdoc = documentHTML;
}

function setupReveal() {
    const elements = document.querySelectorAll(
        ".lesson-page.active .page-heading, " +
        ".lesson-page.active .lesson-text > *, " +
        ".lesson-page.active .interactive-example, " +
        ".lesson-page.active .final-action"
    );

    elements.forEach((element, index) => {
        element.classList.remove("visible");
        element.classList.add("reveal");
        element.style.transitionDelay = `${Math.min(index * 0.04, 0.25)}s`;
    });

    requestAnimationFrame(() => {
        const observer = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.08,
                rootMargin: "0px 0px -40px 0px"
            }
        );

        document
            .querySelectorAll(".lesson-page.active .reveal")
            .forEach(element => observer.observe(element));
    });
}

function showStep(step) {
    currentStep = step;

    document.querySelectorAll(".lesson-page").forEach(page => {
        page.classList.remove("active");
    });

    const selectedPage = document.getElementById(`page${step}`);

    if (selectedPage) {
        selectedPage.classList.add("active");
    }

    document.body.className = `step-${step}`;

    const backButton = document.getElementById("backButton");
    const nextButton = document.getElementById("nextButton");
    const challengeButton = document.getElementById("challengeNavButton");

    if (backButton) {
        backButton.disabled = step === 1;
    }

    /*
     * FIX: On the last lesson page, hide Next and show
     * Go to Challenge instead.
     */
    if (nextButton && challengeButton) {
        if (step === totalSteps) {
            nextButton.style.display = "none";
            challengeButton.style.display = "inline-block";
            challengeButton.textContent = "Go to Challenge →";
        } else {
            nextButton.style.display = "inline-block";
            nextButton.textContent = "Next →";
            challengeButton.style.display = "none";
        }
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    requestAnimationFrame(() => setupReveal());
}

function nextStep() {
    if (currentStep < totalSteps) {
        showStep(currentStep + 1);
    }
}

function previousStep() {
    if (currentStep > 1) {
        showStep(currentStep - 1);
    }
}

function setViewport(type) {
    const preview = document.getElementById("preview7");

    if (!preview) return;

    if (type === "mobile") {
        preview.classList.add("mobile");
        preview.style.width = "390px";
    } else {
        preview.classList.remove("mobile");
        preview.style.width = "100%";
    }

    runExample(7);
}

function goToChallenge() {
    window.location.href = "challenge.html";
}

function returnToMap() {
    window.location.href = "map.html";
}

document.addEventListener("keydown", function(event) {
    const activeElement = document.activeElement;

    if (activeElement && activeElement.tagName === "TEXTAREA") {
        return;
    }

    if (event.key === "ArrowRight") {
        nextStep();
    }

    if (event.key === "ArrowLeft") {
        previousStep();
    }
});

document.addEventListener("DOMContentLoaded", function() {
    for (let i = 1; i <= totalSteps; i++) {
        runExample(i);
    }

    showStep(1);
});
