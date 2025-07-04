function autoGrow(element) {
  element.style.height = "5px";
  element.style.height = element.scrollHeight + "px";
}

function validateForm(event) {
  event.preventDefault();
  const feedback = document.getElementById("form-message");

  let nom = document.forms["contact-form"]["nom"];
  let email = document.forms["contact-form"]["email"];
  let message = document.forms["contact-form"]["message"];

  if (!nom.checkValidity()) {
    feedback.innerHTML = nom.validationMessage;
    return false;
  }

  if (!email.checkValidity()) {
    feedback.innerHTML = email.validationMessage;
    return false;
  }

  if (!message.checkValidity()) {
    feedback.innerHTML = message.validationMessage;
    return false;
  }

  feedback.innerHTML = "Form submitted successfully!";
  return false;
}
