// Credit to Code with Voran for this code @ https://www.youtube.com/watch?v=x7Ewtay0Q78
function sendMail(params){
    var tempParams = {
        from_name: document.getElementById("fromName").value,
        email: document.getElementById("email").value,
        message: document.getElementById("msg").value,
    };

emailjs
    .send('service_cqu9ojp', 'template_5hokv65',tempParams)
    .then(function(res){
        console.log("success", res.status);
    })
}

