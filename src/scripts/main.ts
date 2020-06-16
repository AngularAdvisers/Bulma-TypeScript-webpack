document.addEventListener("DOMContentLoaded", () => {
    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(
      document.querySelectorAll(".navbar-burger"),
      0
    );

    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {
      // Add a click event on each of them
      $navbarBurgers.forEach((el) => {
        el.addEventListener("click", () => {
          // Get the target from the "data-target" attribute
          const target = el.dataset.target;
          const $target = document.getElementById(target);

          // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
          el.classList.toggle("is-active");
          if ($target) $target.classList.toggle("is-active");
        });
      });
    }
  });

// function to set a given theme/color-scheme
 function setTheme(themeName: string) {
  localStorage.setItem('theme', themeName);
  document.documentElement.className = themeName;
}

// function to toggle between light and dark theme
export function toggleTheme() {
  if (localStorage.getItem('theme') === 'theme-dark') {
      setTheme('theme-light');
  } else {
      setTheme('theme-dark');
  }
}

// Immediately invoked function to set the theme on initial load
(function () {
  const slider = document.getElementById('slider') as HTMLInputElement;
  if (localStorage.getItem('theme') === 'theme-dark') {
      setTheme('theme-dark');
      slider.checked = false;
  } else {
    setTheme('theme-light');
    slider.checked = true;
 }
})();
