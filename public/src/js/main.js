// Scroll reveal: elements fade in when they enter the viewport.
// Elements that appear together (e.g. the three cards) are staggered.
const revealItems = document.querySelectorAll(".reveal");

if (revealItems.length) {
  if (!("IntersectionObserver" in window)) {
    revealItems.forEach((el) => el.classList.add("is-visible"));
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        entries
          .filter((entry) => entry.isIntersecting)
          .forEach((entry, i) => {
            entry.target.style.transitionDelay = i * 120 + "ms";
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    revealItems.forEach((el) => observer.observe(el));
  }
}

// Forms: the submit button shows a spinner while sending, and stays disabled
// until every required checkbox (e.g. the consent) is ticked.
document.querySelectorAll("form").forEach((form) => {
  const submit = form.querySelector('button[type="submit"]');
  if (!submit) return;

  const checkboxes = [
    ...form.querySelectorAll('input[type="checkbox"][required]'),
  ];

  const sync = () => {
    const isLoading = submit.classList.contains("is-loading");
    submit.disabled = isLoading || !checkboxes.every((box) => box.checked);
  };

  const setLoading = (isLoading) => {
    submit.classList.toggle("is-loading", isLoading);
    if (isLoading) submit.setAttribute("aria-busy", "true");
    else submit.removeAttribute("aria-busy");
    sync();
  };

  checkboxes.forEach((box) => box.addEventListener("change", sync));
  form.addEventListener("submit", () => setLoading(true));

  // Coming back with the browser's back button must not show a stuck spinner
  window.addEventListener("pageshow", (event) => {
    if (event.persisted) setLoading(false);
  });

  sync(); // the browser may restore a ticked box on reload
});
