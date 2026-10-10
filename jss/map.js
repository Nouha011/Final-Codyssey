/* =========================
   LOG OUT
========================= */

const logoutButton = document.getElementById("logoutButton");

logoutButton.addEventListener("click", () => {

    /*
        Remove login information.

        Keep or change these names
        depending on what you used
        in your login system.
    */

    localStorage.removeItem("currentUser");
    localStorage.removeItem("codysseyUser");
    localStorage.removeItem("loggedInUser");


    /*
        Return to your home page
    */

    window.location.href = "index.html";

});


/* =========================
   DESTINATIONS
========================= */

const destinations =
    document.querySelectorAll(".destination");


destinations.forEach(destination => {

    destination.addEventListener("click", () => {

        const page =
            destination.dataset.page;


        /*
            Go to the destination page
        */

        window.location.href = page;

    });

});