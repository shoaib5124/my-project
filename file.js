
const navToggle = document.getElementById("nav-toggle");
const navClose = document.getElementById("nav-close");
const navMenu = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll('.nav-link');
console.log(navToggle);
console.log(navClose);
window.addEventListener('load', () => {
    navMenu.classList.remove('show'); // Ensure menu is hidden
    navToggle.style.display = 'block'; // Ensure nav-toggle is visible
    navClose.style.display = 'none'; // Ensure nav-close is hidden
});

navToggle.addEventListener("click", () => {
  navMenu.classList.add("show");
});
navClose.addEventListener("click", () => {
    navMenu.classList.remove("show");
    navToggle.style.display = 'block'; // Make the toggle visible again
    navClose.style.display = 'none';
});
navToggle.addEventListener('click', () => {
    navMenu.classList.add('show');
    navToggle.style.display = 'none';
    navClose.style.display = 'block';
    navLinks.forEach(link => {
        link.classList.remove("yellow") // Reset background color when clicked again
    });
});
navLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default link behavior
        link.classList.add('yellow'); // Add the 'yellow' class
        console.log(link); // Debugging log
        
        const targetId = link.getAttribute('href').substring(1); // Get section ID
        const targetSection = document.getElementById(targetId);
        
        // Scroll only if the target section exists
        if (targetSection) {
            const headerOffset = 70; // Adjust for a fixed header, if any
            const targetPosition = targetSection.offsetTop - headerOffset;
            const startPosition = window.scrollY;
            const distance = targetPosition - startPosition;
            const duration = 800; // Duration in milliseconds
            let start = null;

            // The animationScroll function
            function animationScroll(currentTime) {
                if (start === null) start = currentTime;
                const progress = currentTime - start;
                const ease = easeInOutCubic(progress / duration); // Call easing function
                window.scrollTo(0, startPosition + distance * ease);

                if (progress < duration) {
                    requestAnimationFrame(animationScroll); // Continue the animation
                }
            }

            // The easing function
            function easeInOutCubic(t) {
                return t < 0.5
                    ? 4 * t * t * t
                    : 1 - Math.pow(-2 * t + 2, 3) / 2;
            }

            // Start the animation
            requestAnimationFrame(animationScroll);
        }

        // Adjust navigation menu visibility (if applicable)
        navToggle.style.display = 'block'; // Show the toggle button
        navClose.style.display = 'none'; // Hide the close button
        navMenu.classList.remove('show'); // Close the navigation menu
    });
});

// ############ FORM SUBMISSION  ########################
const form = document.querySelector('.form');
form.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent default form submission

  const formData = new FormData(form);

  fetch(form.action, {
    method: 'POST',
    body: formData,
    mode: 'no-cors'  // This will disable CORS and avoid the blocking
  })
  .then(response => {
    // You won't be able to access the response body in this case.
    alert('Form submitted successfully!');
    form.reset();  // Clear the form after submission
  })
  .catch(error => {
    alert('There was an error submitting the form!');
  });
  
});




