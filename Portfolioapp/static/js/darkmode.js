document.addEventListener("DOMContentLoaded", function () {
    const themeToggle = document.getElementById("theme-toggle");
    const body = document.body;
    const chatbotSidebar = document.getElementById("chatbot-sidebar");

    // Ensure Dark Mode is Always Enabled on First Load
    if (localStorage.getItem("dark-mode") === null) {
        localStorage.setItem("dark-mode", "enabled"); // Set default to dark mode
    }

    // Apply the saved mode on page load
    applyDarkMode();

    // Toggle theme on button click
    themeToggle.addEventListener("click", function () {
        if (body.classList.contains("dark-mode")) {
            disableDarkMode();
        } else {
            enableDarkMode();
        }
    });

    function applyDarkMode() {
        if (localStorage.getItem("dark-mode") === "enabled") {
            enableDarkMode();
        } else {
            disableDarkMode();
        }
    }

    function enableDarkMode() {
        body.classList.add("dark-mode");
        chatbotSidebar.classList.add("dark-mode");
        localStorage.setItem("dark-mode", "enabled");
        updateButtonIcon(true);
    }

    function disableDarkMode() {
        body.classList.remove("dark-mode");
        chatbotSidebar.classList.remove("dark-mode");
        localStorage.setItem("dark-mode", "disabled");
        updateButtonIcon(false);
    }

    function updateButtonIcon(isDark) {
        if (themeToggle) {
            themeToggle.innerHTML = isDark
                ? '<i class="bi bi-sun-fill"></i>'  // Sun icon for dark mode
                : '<i class="bi bi-moon-fill"></i>'; // Moon icon for light mode
        }
    }
});
