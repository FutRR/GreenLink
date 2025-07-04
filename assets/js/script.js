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
