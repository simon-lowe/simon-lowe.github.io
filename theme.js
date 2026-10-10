// Starts from the system setting (inline script in <head>); the header button
// switches theme and remembers the choice.
(function () {
  var root = document.documentElement;
  var button = document.querySelector(".theme-toggle");
  if (!button) return;

  function label() {
    var next = root.dataset.theme === "dark" ? "light" : "dark";
    button.setAttribute("aria-label", "Switch to " + next + " mode");
    button.title = "Switch to " + next + " mode";
  }

  button.addEventListener("click", function () {
    var dark = root.dataset.theme !== "dark";
    if (dark) root.dataset.theme = "dark";
    else delete root.dataset.theme;
    var choice = dark ? "dark" : "light";
    try { localStorage.setItem("theme", choice); } catch (e) {}
    // Fallback for browsers or embeds that block storage: window.name survives
    // page-to-page navigation within the same tab.
    if (!window.name || /^theme=/.test(window.name)) window.name = "theme=" + choice;
    label();
  });

  label();
})();
