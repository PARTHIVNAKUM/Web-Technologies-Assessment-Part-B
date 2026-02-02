document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }));
    }

    // Dynamic Data Loading
    if (document.getElementById('skills-container')) {
        loadSkills();
    }

    if (document.getElementById('resources-container')) {
        loadResources();
    }

    // Contact Form Validation
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            validateForm();
        });
    }

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Fallback Data
const FALLBACK_SKILLS = [
    { "category": "Technical", "name": "HTML5", "level": "Advanced" },
    { "category": "Technical", "name": "CSS3 & Flexbox/Grid", "level": "Intermediate" },
    { "category": "Technical", "name": "JavaScript (ES6+)", "level": "Intermediate" },
    { "category": "Technical", "name": "GitHub & Version Control", "level": "Intermediate" },
    { "category": "Technical", "name": "WordPress CMS", "level": "Basic" },
    { "category": "Technical", "name": "WAMP / Apache Server", "level": "Basic" },
    { "category": "Soft Skills", "name": "Communication", "level": "Advanced" },
    { "category": "Soft Skills", "name": "Teamwork", "level": "Advanced" },
    { "category": "Soft Skills", "name": "Time Management", "level": "Intermediate" }
];

const FALLBACK_RESOURCES = [
    {
        "unit": 1,
        "week": 1,
        "title": "Developing Your Web Presence",
        "focus": "HTML Framework & Recruitment Profile",
        "learning_outcome": "Understand HTML page structure and create a personal recruitment profile.",
        "tasks": [
            "Create MyProfile.html with Header, About Me, Skills, and Education sections",
            "Use Azure Lab Services and simple text editors",
            "Deploy to local WAMP directory"
        ]
    },
    {
        "unit": 2,
        "week": 2,
        "title": "Working with GitHub",
        "focus": "Version Control & Branching",
        "learning_outcome": "Master version control basics, branching, and pull requests.",
        "tasks": [
            "Create 'new updates' branch",
            "Upload profile/CV images",
            "Amend MyProfile.html with img tags",
            "Create Pull Request to merge changes"
        ]
    },
    {
        "unit": 3,
        "week": 3,
        "title": "Content Management Systems",
        "focus": "WordPress Publishing",
        "learning_outcome": "Create and publish content using a Content Management System.",
        "tasks": [
            "Log into admin dashboard",
            "Create new post with title, content, tags",
            "Publish and Preview blog posts"
        ]
    },
    {
        "unit": 4,
        "week": 4,
        "title": "Server Configuration",
        "focus": "Web Server Setup",
        "learning_outcome": "Configure a local web server to serve HTML content.",
        "tasks": [
            "Setup web server environment",
            "Create and test 'Hello World' page locally",
            "Understand server directory structure"
        ]
    },
    {
        "unit": 5,
        "week": 5,
        "title": "WAMP and Site Deployment",
        "focus": "Local Deployment & Database",
        "learning_outcome": "Deploy a multi-page website in a local WAMP environment.",
        "tasks": [
            "Install WAMP (Apache, MySQL, PHP)",
            "Place files in C:\\wamp64\\www directory",
            "Use phpMyAdmin for database management",
            "Troubleshoot Port 80 conflicts"
        ]
    },
    {
        "unit": 6,
        "week": 6,
        "title": "Dynamic Web Applications",
        "focus": "Forms & Client-Side Logic",
        "learning_outcome": "Build interactive forms with client-side validation and server integration.",
        "tasks": [
            "Build HTML form structure",
            "Add JavaScript validation (email/required fields)",
            "Implement AJAX data submission concepts",
            "server-side processing logic"
        ]
    },
    {
        "unit": 7,
        "week": 7,
        "title": "Asynchronous Data",
        "focus": "AJAX & Fetch API",
        "learning_outcome": "Implement AJAX to enhance user experience with asynchronous data loading.",
        "tasks": [
            "Integrate AJAX/Fetch API",
            "Load data without page reload",
            "Manipulate DOM dynamically based on data"
        ]
    },
    {
        "unit": 8,
        "week": 8,
        "title": "Multimedia Integration",
        "focus": "Audio, Video & Animation",
        "learning_outcome": "Embed and control multimedia elements and create CSS animations.",
        "tasks": [
            "Create multimedia.html",
            "Embed MP4 video with playback controls",
            "Create portfolio.html with audio section",
            "Implement CSS Keyframe animations"
        ]
    },
    {
        "unit": 9,
        "week": 9,
        "title": "User Security",
        "focus": "Security Flaws & Registration",
        "learning_outcome": "Identify security flaws and design secure registration systems.",
        "tasks": [
            "Analyze registration form vulnerabilities (plain-text passwords)",
            "Design secure form with strict validation",
            "Test user privileges and password resets"
        ]
    },
    {
        "unit": 10,
        "week": 10,
        "title": "Advanced Features & Web Security",
        "focus": "Responsive Design & Threat Prevention",
        "learning_outcome": "Implement responsive design and understand web security threats.",
        "tasks": [
            "Build responsive navigation with dropdowns",
            "Implement smooth scrolling",
            "Analyze SQL Injection and XSS prevention measures",
            "Review WordPress security plugins"
        ]
    }
];

async function loadSkills() {
    let skills = [];
    try {
        const response = await fetch('./data/skills.json');
        if (!response.ok) throw new Error('Network response was not ok');
        skills = await response.json();
    } catch (error) {
        console.warn('Fetch failed (likely CORS/local file), using fallback data:', error);
        skills = FALLBACK_SKILLS;
    }

    renderSkills(skills);
}

function renderSkills(skills) {
    const container = document.getElementById('skills-container');
    if (!container) return;

    container.innerHTML = ''; // Clear loading state

    // Group by category
    const categories = {};
    skills.forEach(skill => {
        if (!categories[skill.category]) {
            categories[skill.category] = [];
        }
        categories[skill.category].push(skill);
    });

    for (const [category, items] of Object.entries(categories)) {
        const categorySection = document.createElement('div');
        categorySection.style.marginBottom = '40px';
        categorySection.innerHTML = `<h3>${category} Skills</h3>`;
        const grid = document.createElement('div');
        grid.className = 'card-grid';

        items.forEach(skill => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <h4 style="margin-bottom: 10px; color: var(--text-primary);">${skill.name}</h4>
                <p>Proficiency: <span style="color: var(--accent-color)">${skill.level}</span></p>
            `;
            grid.appendChild(card);
        });

        categorySection.appendChild(grid);
        container.appendChild(categorySection);
    }
}

async function loadResources() {
    let resources = [];
    try {
        const response = await fetch('./data/resources.json');
        if (!response.ok) throw new Error('Network response was not ok');
        resources = await response.json();
    } catch (error) {
        console.warn('Fetch failed (likely CORS/local file), using fallback data:', error);
        resources = FALLBACK_RESOURCES;
    }

    renderResources(resources);
}

function renderResources(resources) {
    const container = document.getElementById('resources-container');
    if (!container) return;

    container.innerHTML = '';

    resources.forEach(unit => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 10px;">
                <h3 style="margin-right: 15px;">Week ${unit.week}: Unit ${unit.unit} - ${unit.title}</h3>
                <span style="font-size: 0.8rem; background: var(--secondary-color); padding: 4px 8px; border-radius: 4px; border: 1px solid var(--accent-color); color: var(--accent-color); white-space: nowrap;">
                    ${unit.focus}
                </span>
            </div>
            
            <div style="margin-bottom: 15px; background: rgba(100, 255, 218, 0.05); padding: 10px; border-radius: 4px; border-left: 3px solid var(--accent-color);">
                <h4 style="font-size: 0.9rem; margin-bottom: 5px; color: var(--accent-color);">Learning Outcome</h4>
                <p style="font-size: 0.9rem; margin: 0;">${unit.learning_outcome}</p>
            </div>

            <h4 style="font-size: 1rem; margin-bottom: 8px;">Key Tasks:</h4>
            <ul style="list-style-type: none; padding-left: 0;">
                ${unit.tasks.map(task => `<li style="margin-bottom: 5px; color: var(--text-secondary); position: relative; padding-left: 20px;">
                    <span style="position: absolute; left: 0; color: var(--accent-color);">•</span> ${task}
                </li>`).join('')}
            </ul>
        `;
        container.appendChild(card);
    });
}

function validateForm() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const feedback = document.getElementById('form-feedback');

    if (!name || !email || !message) {
        feedback.textContent = 'Please fill in all fields.';
        feedback.style.color = 'red';
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        feedback.textContent = 'Please enter a valid email address.';
        feedback.style.color = 'red';
        return;
    }

    feedback.textContent = 'Message sent successfully! (Simulation)';
    feedback.style.color = 'var(--accent-color)';
    document.getElementById('contact-form').reset();
}
