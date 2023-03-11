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


function feedbackSent(){
    let message = `
                    <div class="image-thank-you">
                        <img src="assets/images/thank-you-smite.png" alt="Zeus saying thank you smite fans">
                    </div>
                    <a class="btn-404" href="index.html">Back to home</a>
                    `;
    document.getElementById("container").innerHTML = message;
}

/*
// Credit to Code with Voran for this code @ https://www.youtube.com/watch?v=x7Ewtay0Q78
// Function to send email using information taken from my email.js template
function sendMail(){
    var tempParams = {
        from_name: document.getElementById("fromName").value,
        email: document.getElementById("email").value,
        message: document.getElementById("msg").value,
    };
    (function(){
        emailjs.init("GPc8_VJR-pWRi0sVt");
     })();
// Sends email to service the selected (gmail) and my personal email account for review of feedback
emailjs
    .send('service_cqu9ojp', 'template_5hokv65',tempParams)
    .then(function(res){
        console.log("success", res.status);
        feedbackSent();
        //prints to console if it worked
    });
}
*/