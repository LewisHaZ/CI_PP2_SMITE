const contactForm = document.querySelector('#thank-you');
let submitBtn = document.querySelector('#submit');

/**
 * email js used for submit form
 */

contactForm.addEventListener("submit", function (event){
    event.preventDefault();
    emailjs.init()
})