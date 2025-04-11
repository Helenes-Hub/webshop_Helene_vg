//actionlistener till fullName
document.getElementById("fullName").addEventListener("input", function() {
    let errorMessage = "";

    if (!this.value.includes(" ")) {
        errorMessage = "Please enter both first and last name.";
    } else if (this.value.length < 3 || this.value.length>50) {
        errorMessage = "Unsupported length";
    }

    this.setCustomValidity(errorMessage);
});

//actionlistener till phoneNumber
document.getElementById("phoneNumber").addEventListener("input", function() {
    let errorMessage = "";

    //regex
    let phonePattern = /^[0-9\s\-()]+$/

    if (!phonePattern.test(this.value)) {
        errorMessage = "Please enter a valid phone number";
    } else if (this.value.length>50) {
        errorMessage = "Unsupported length";
    }

    this.setCustomValidity(errorMessage);
});

// address: Min 2 tecken och Max 50 tecken
document.getElementById(("address")).addEventListener("input", function() {
    let errorMessage = "";

    let postalPattern = /^.{2,50}$/;

    if (!postalPattern.test(this.value)) {
        errorMessage = "Please enter a valid address"
    }

    this.setCustomValidity(errorMessage);
});

// ii. postalCode: Exakt 5 siffror
document.getElementById(("postalCode")).addEventListener("input", function() {
    let errorMessage = "";

    let postalPattern = /^\d{5}$/;

    if (!postalPattern.test(this.value)) {
        errorMessage = "Please enter a valid postal number"
    }

    this.setCustomValidity(errorMessage);
});
// iii. City: Min 2 tecken och Max 50 tecken
document.getElementById(("city")).addEventListener("input", function() {
    let errorMessage = "";

    let postalPattern = /^[a-zA-ZåäöÅÄÖ\s]{2,50}$/;

    if (!postalPattern.test(this.value)) {
        errorMessage = "Please enter a valid city"
    }

    this.setCustomValidity(errorMessage);
});

//Eventlistener för submit-knappen. Visar popup i nån sekund om formuläret är rätt ifyllt.
checkoutForm.addEventListener("submit", (e) => {
    e.preventDefault()
    orderValidation.style.display = "block";
    orderValidation.style.opacity = "1";

    //completely stäng
    modal.style.display = "none"; //Stänger form-fönstret.

    setTimeout(() => {

        orderValidation.style.transition = "opacity 1s ease-out"; //fade-out-tid
        orderValidation.style.opacity = "0";

        setTimeout(() =>{
            orderValidation.style.display = "none";
        }, 1000)
    }, 1500);   //Millisekunder validation visas i innan fade-out börjar
})