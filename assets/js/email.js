// 
function SendMail(){
    var params = {
        from_name : document.getElementById("fullName").value,
        email_id : document.getElementById("emailAddress").value,
        message : document.getElementById("message").value
    }
    emailjs.send("service_cqu9ojp", "template_5hokv65", params).then(function (res){
        alert("Success!" + res.status);
    })
}