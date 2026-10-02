// HEAD EASE — interactions du site
(function () {
  "use strict";

  var CONTACT_EMAIL = "achilleprudent10@gmail.com";

  // Année dans le footer
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Navigation : fond au scroll
  var nav = document.getElementById("nav");
  function onScroll() {
    nav.classList.toggle("is-scrolled", window.scrollY > 20);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Menu mobile
  var toggle = document.getElementById("navToggle");
  var menu = document.getElementById("navMenu");

  function setMenu(open) {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
    menu.classList.toggle("is-open", open);
    nav.classList.toggle("menu-open", open);
  }

  toggle.addEventListener("click", function () {
    setMenu(toggle.getAttribute("aria-expanded") !== "true");
  });
  menu.addEventListener("click", function (e) {
    if (e.target.closest("a")) setMenu(false);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setMenu(false);
  });

  // Apparition des éléments au scroll
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  // Formulaire de contact : validation puis ouverture du client mail
  var form = document.getElementById("contactForm");
  var status = document.getElementById("formStatus");

  function setStatus(text, type) {
    status.textContent = text;
    status.className = "form__status" + (type ? " is-" + type : "");
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var fields = ["name", "email", "message"];
    var firstInvalid = null;

    fields.forEach(function (id) {
      var input = form.elements[id];
      var valid = input.value.trim() !== "" && input.checkValidity();
      input.closest(".field").classList.toggle("has-error", !valid);
      input.setAttribute("aria-invalid", String(!valid));
      if (!valid && !firstInvalid) firstInvalid = input;
    });

    if (firstInvalid) {
      setStatus("Merci de remplir correctement les champs en rouge.", "error");
      firstInvalid.focus();
      return;
    }

    var data = {
      name: form.elements.name.value.trim(),
      company: form.elements.company.value.trim(),
      email: form.elements.email.value.trim(),
      service: form.elements.service.value,
      message: form.elements.message.value.trim()
    };

    var subject = "Demande de contact — " + data.service;
    var body =
      "Nom : " + data.name + "\n" +
      (data.company ? "Entreprise : " + data.company + "\n" : "") +
      "E-mail : " + data.email + "\n" +
      "Service : " + data.service + "\n\n" +
      data.message;

    window.location.href =
      "mailto:" + CONTACT_EMAIL +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(body);

    setStatus("Votre logiciel de messagerie s'ouvre pour envoyer la demande. Merci !", "success");
    form.reset();
  });
})();
