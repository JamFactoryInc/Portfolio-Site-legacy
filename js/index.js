function sendEmail() {
    let errormsg = document.getElementById('submit-error');
    let submit = document.getElementById('submit-button');
    let form = document.getElementById('form');
    if (form.checkValidity()) {

        if (submit.value == "Send Email") {
            var templateParams = {
                email: document.getElementById('email-input').value,
                message: document.getElementById('message-input').value
            };
            submit.value = "Sent!";
            submit.style.backgroundColor = "#111";
            submit.style.color = "#EEE";
            document.getElementById('email-input-div').style.display = 'none';
            document.getElementById('message-input-div').style.display = 'none';

            errormsg.textContent = "";

            emailjs.send('service_becskri', 'template_j3wwa4o', templateParams, 'user_GyV8SgPk4F0RQTr0bTlSX')
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                }, function(error) {
                    console.log('FAILED...', error);
                });
        }
    } else {

        errormsg.textContent = "All fields must be filled!";
        window.location.href = '#submit-error';
    }
}