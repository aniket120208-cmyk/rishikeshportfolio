// 1. Custom Cursor Logic
const cursorDot = document.querySelector("[data-cursor-dot]");
const cursorOutline = document.querySelector("[data-cursor-outline]");
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

if (!isTouchDevice) {
    window.addEventListener("mousemove", function (e) {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    const interactables = document.querySelectorAll('a, button, .project-card, input, textarea');
    interactables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.style.width = '60px';
            cursorOutline.style.height = '60px';
            cursorOutline.style.backgroundColor = 'rgba(6, 182, 212, 0.1)';
            // Hide dot when hovering over text inputs to let standard text cursor show clearly
            if(el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                cursorDot.style.opacity = '0';
            }
        });
        el.addEventListener('mouseleave', () => {
            cursorOutline.style.width = '40px';
            cursorOutline.style.height = '40px';
            cursorOutline.style.backgroundColor = 'transparent';
            cursorDot.style.opacity = '1';
        });
    });
}

// 2. Typing Effect Logic
const textArray = [
  "Finance Professional",
  "Financial Planning & Analysis Expert",
  "P&L | Budgeting | Forecasting",
  "Advanced Excel & Financial Modeling",
  "ERP Systems: Oracle | D365 | Tally",
  "Languages: English | Hindi | Bengali | Marathi"
];
const typingDelay = 80;     // faster typing
const erasingDelay = 40;    // faster erase
const newTextDelay = 1500;  // less waiting
let textArrayIndex = 0;
let charIndex = 0;
const typingElement = document.getElementById("typing-text");

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        typingElement.textContent = textArray[textArrayIndex].substring(0, charIndex + 1);
        charIndex++;
        setTimeout(type, typingDelay);
    } else {
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (charIndex > 0) {
        typingElement.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } else {
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingDelay + 1100);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    if(textArray.length) setTimeout(type, newTextDelay);
});

// 3. Scroll Reveal Animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

// 4. Smooth Scrolling for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// 5. Form Submission Handling
const form = document.getElementById('portfolio-form');
const submitBtn = document.getElementById('submit-btn');

form.addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent page reload
    
    // Basic UI feedback
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = 'Message Sent! <i class="ph ph-check-circle" style="margin-left: 8px;"></i>';
    submitBtn.style.background = 'linear-gradient(45deg, #10b981, #059669)'; // Green success color
    
    // Reset form
    form.reset();

    // Revert button after 3 seconds
    setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.style.background = ''; // Reverts back to CSS class rules
    }, 3000);
});