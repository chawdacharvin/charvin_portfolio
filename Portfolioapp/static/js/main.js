const particlesContainer = document.getElementById('particles-js');
if (particlesContainer) {
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 90,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: '#007bff'
            },
            shape: {
                type: 'circle'
            },
            opacity: {
                value: 0.5,
                random: false
            },
            size: {
                value: 3,
                random: true
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#007bff',
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 6,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'repulse'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            }
        },
        retina_detect: true
    });
}

// Dark Mode Toggle
// const themeToggle = document.getElementById('theme-toggle');
// const icon = themeToggle.querySelector('i');

// function toggleTheme() {
//     document.body.classList.toggle('dark-mode');
//     const isDark = document.body.classList.contains('dark-mode');
//     document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
//     icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
//     localStorage.setItem('theme', isDark ? 'dark' : 'light');
// }

// // Load saved theme
// const savedTheme = localStorage.getItem('theme') || 'light';
// if (savedTheme === 'dark') {
//     document.body.classList.add('dark-mode');
//     document.documentElement.setAttribute('data-theme', 'dark');
//     icon.className = 'fas fa-sun';
// }

// themeToggle.addEventListener('click', toggleTheme);

document.addEventListener("DOMContentLoaded", function () {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return; // Prevent errors if button is missing

    const icon = themeToggle.querySelector('i');

    // Always enable dark mode on page load
    document.body.classList.add('dark-mode');
    document.documentElement.setAttribute('data-theme', 'dark');
    icon.className = 'fas fa-sun'; // Set sun icon as default

    function toggleTheme() {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
        icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }

    themeToggle.addEventListener('click', toggleTheme);
});

// Project Filtering
document.addEventListener("DOMContentLoaded", () => {
    const filterButtons = document.querySelectorAll("[data-filter]");
    const projectItems = document.querySelectorAll(".project-item");

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            const filter = button.getAttribute("data-filter");

            // Remove "active" class from all buttons and add it to the clicked one
            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            projectItems.forEach(item => {
                const category = item.getAttribute("data-category");

                if (filter === "all" || category.includes(filter)) {
                    item.style.display = "block";
                    setTimeout(() => item.style.opacity = "1", 100);
                } else {
                    item.style.opacity = "0";
                    setTimeout(() => item.style.display = "none", 300);
                }
            });
        });
    });
});


// Form Validation and Submission
// const contactForm = document.getElementById('contact-form');
// if (contactForm) {
//     contactForm.addEventListener('submit', (e) => {
//         e.preventDefault();
        
//         const name = document.getElementById('name').value;
//         const email = document.getElementById('email').value;
//         const message = document.getElementById('message').value;
        
//         // Basic email validation
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (!emailRegex.test(email)) {
//             alert('Please enter a valid email address');
//             return;
//         }
        
//         // Here you would typically send the form data to a server
//         // For demo purposes, we'll just show a success message
//         alert('Message sent successfully!');
//         contactForm.reset();
//     });
// }

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animate skill bars on scroll
const skillBars = document.querySelectorAll('.progress-bar');
const animateSkillBars = () => {
    skillBars.forEach(bar => {
        const rect = bar.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
            bar.style.width = bar.getAttribute('style').split(':')[1];
        }
    });
};

window.addEventListener('scroll', animateSkillBars);
window.addEventListener('load', animateSkillBars);


// document.addEventListener("DOMContentLoaded", function () {
//     const contactForm = document.getElementById("contact-form");
    
//     if (contactForm) {
//         contactForm.addEventListener("submit", function (e) {
//             e.preventDefault(); // Prevent form from submitting immediately

//             // Select elements correctly (ensure your Django form renders IDs)
//             const name = document.querySelector("[name='name']").value.trim();
//             const email = document.querySelector("[name='email']").value.trim();
//             const company = document.querySelector("[name='organization']").value.trim();
//             const message = document.querySelector("[name='message']").value.trim();

//             // Basic validation
//             if (!name || !email || !message) {
//                 alert("Please fill in all required fields.");
//                 return;
//             }

//             const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//             if (!emailRegex.test(email)) {
//                 alert("Please enter a valid email address.");
//                 return;
//             }

//             // Send form data using Fetch API (optional)
//             fetch(contactForm.action, {
//                 method: "POST",
//                 body: new FormData(contactForm),
//             })
//             .then(response => {
//                 if (response.ok) {
//                     alert("Message sent successfully!");
//                     contactForm.reset();
//                 } else {
//                     alert("There was an error. Please try again later.");
//                 }
//             })
//             .catch(error => {
//                 console.error("Error:", error);
//                 alert("Something went wrong. Try again later.");
//             });
//         });
//     }
// });

document.addEventListener("DOMContentLoaded", function() {
    const flashMessage = document.getElementById("flash-message");
    if (flashMessage && flashMessage.innerText.trim() !== "") {
        setTimeout(() => {
            flashMessage.style.opacity = "0"; // Fades out the message
        }, 2000); // Starts fading out after 3 seconds
    }
});