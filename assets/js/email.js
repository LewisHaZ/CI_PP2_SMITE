// Thank you to aleksandracodes - Another CI student with the helping hand
/**
 * Prevent contact form container going off the mobile screen when clicking on input field & keyboard being shown on screen
*/
$(document).ready(function () {
    if ($(window).width() <= 740) { //common horizontal viewport dimension of mobile screens
        document.getElementsByTagName("input")[0].addEventListener("focus", function () {
            document.getElementById("container").style.top = "75%";
        });
        document.getElementsByTagName("input")[0].addEventListener("blur", function () { //container returns to its default position when input not focused
            document.getElementById("container").style.top = "45%";
        });
    }
});

/**
 * Add an eventListener to listen for the submit.
 * Sends an email to site owner through emailJS if the submit is fired.
 * Script taken from the official EmailJS tutorial https://www.emailjs.com/docs/tutorial/creating-contact-form/ 
 * and Email Templates Playground environment.
 */
const sendFormButton = document.getElementById("btn-send-form");

document.getElementById("contact-form").addEventListener("submit", function(event){
    event.preventDefault();
    emailjs.init("GPc8_VJR-pWRi0sVt");
    sendFormButton.value = "Sending...";

    emailjs.sendForm("service_cqu9ojp", "template_5hokv65", this)
    .then(() => {
        sendFormButton.value = "Send";
        feedbackSent();
    }, (err) => {
        console.log(JSON.stringify(err));
    });
});

/**
 * Display a thank you image on the screen once the contact form has been submitted
 */
function feedbackSent(){
    let message = `
                    <div class="image-thank-you">
                        <img src="assets/images/thank-you-smite.png" alt="Zeus saying thank you smite fans">
                    </div>
                    <a class="btn-404" href="index.html">Back to home</a>
                    `;
    document.getElementById("container").innerHTML = message;
}
