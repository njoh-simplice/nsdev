// Mobile navigation toggle
const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

// Loading state: forms lock their submit button while the request is sent
const setLoading = (button, isLoading) => {
  button.classList.toggle("is-loading", isLoading);
  if (isLoading) button.setAttribute("aria-busy", "true");
  else button.removeAttribute("aria-busy");
  button.disabled = isLoading;
};

document.querySelectorAll("form").forEach((form) => {
  const submit = form.querySelector('button[type="submit"]');
  if (!submit) return;

  form.addEventListener("submit", () => setLoading(submit, true));

  // Coming back with the browser's back button must not show a stuck spinner
  window.addEventListener("pageshow", (event) => {
    if (event.persisted) setLoading(submit, false);
  });
});
