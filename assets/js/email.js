// Credit to Code with Voran for this code @ https://www.youtube.com/watch?v=x7Ewtay0Q78
// Function to send email using information taken from my email.js template
function sendMail(params){
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
        //prints to console if it worked
    });
}

