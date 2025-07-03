function loadNavbar() {
  document.getElementById("navbar-container").innerHTML = `
    <nav>
        <a href="index.html"><img src="assets/img/LogoGreenLink.png" alt="Logo de GreenLink" id="nav-logo"></a>
        <ul id="nav-links">
            <li><a href="index.html" class="nav-link">Accueil</a></li>
            <li><a href="product.html" class="nav-link">Produit</a></li>
            <li><a href="contact.html" class="nav-link">Contact</a></li>
        </ul>

        <div id="menuburger" onclick="menuChange(this)">
            <div class="bar1"></div>
            <div class="bar2"></div>
            <div class="bar3"></div>
        </div>
        
    </nav>
    `;
}

function loadFooter() {
  document.getElementById("footer-container").innerHTML = `
    <footer>
        <img src="assets/img/LogoGreenLink.png" alt="Logo de GreenLink" id="footer-logo">
        <div id="footer-links">
            <a href="#">Mentions Légales</a>
            <a href="#">CGU</a>
            <p>© 2025 Greenlink</p>
        </div>
    </footer>
    `;
}

const menuburger = document.getElementById("menuburger");

function menuChange(x) {
  x.classList.toggle("change");
  const navlinks = document.getElementById("nav-links");

  if (navlinks) {
    navlinks.classList.toggle("mobile-menu");
    console.log("Toggled mobile-menu, current classes:", navlinks.className);
  } else {
    console.log("navlinks is null!");
  }
}

function autoGrow(element) {
  element.style.height = "5px";
  element.style.height = element.scrollHeight + "px";
}

const form = document.getElementById("contact-form");
const feedback = document.getElementById("feedback");

form.addEventListener("submit", handleFormSubmit);

function handleFormSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.target);

  console.log("Form data collected");

  validateAndSubmit(formData);
}

function validateAndSubmit(formData) {
  const data = Object.fromEntries(formData);

  if (!data.nom || !data.nom.trim()) {
    showFeedback("Veuillez inscrire votre nom", "error");
    return;
  }

  if (!data.email || !data.email.trim() || !isValidEmail(data.email)) {
    showFeedback("Veuillez inscrire un email valide", "error");
    return;
  }

  if (!data.message || !data.message.trim()) {
    showFeedback("Veuillez entrer un message", "error");
    return;
  }

  sendAjaxRequest(formData);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function sendAjaxRequest(formData) {
  try {
    const response = await fetch("https://httpbin.org/post", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP ERROR! status: ${response.status}`);
    }

    const result = await response.json();

    handleSuccess(result);
  } catch (error) {
    handleError(error);
  }
}

function handleSuccess(result) {
  showFeedback("Message was sent successfully!", "success");

  form.reset();

  console.log("Server response:", result);
}

function handleError(error) {
  console.error("Form submission error:", error);

  // Show user-friendly error message
  let errorMessage = "Something went wrong. Please try again.";

  if (error.message.includes("404")) {
    errorMessage = "Service not found. Please contact support.";
  } else if (error.message.includes("500")) {
    errorMessage = "Server error. Please try again later.";
  } else if (error.name === "NetworkError") {
    errorMessage = "Network error. Please check your connection.";
  }

  showFeedback(errorMessage, "error");
}

function showFeedback(message, type) {
  feedback.textContent = message;
  feedback.className = `feedback ${type}`;

  // Auto-hide after 5 seconds for non-error messages
  if (type !== "error") {
    setTimeout(() => {
      feedback.textContent = "";
      feedback.className = "";
    }, 5000);
  }
}
