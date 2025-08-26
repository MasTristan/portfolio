// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  const translations = {
    en: {
      "lang-english": "English",
      "lang-french": "Français",
      "nav-home": "Home",
      "nav-about": "About",
      "nav-skills": "Skills",
      "nav-resume": "Resume",
      "nav-portfolio": "Portfolio",
      "nav-contact": "Contact",
      "hero-im": "I'm ",
      "typing-texts": ["Data Engineer", "Developer", "Analyst"],
      "about-title": "About",
      "about-description":
        "Data Engineer passionate about computer science, data and new technologies.",
      "about-origin-title": "Origin",
      "about-origin-content":
        "This passion started in Formula 1, where every piece of data helps improve the car's performance and gain an edge over the competition.",
      "about-work-title": "At Work",
      "about-work-content":
        "I design and maintain data pipelines, analyze system performance, and develop KPI reports to inform decision-making.",
      "about-outside-title": "Outside Work",
      "about-outside-content":
        "I use connected tools to track my fitness, expenses, and investments, enabling me to make the best decisions at the right time.",
      "about-age-label": "Age:",
      "about-phone-label": "Phone:",
      "about-email-label": "Email:",
      "about-degree-label": "Degree:",
      "about-degree-value": "Data Engineer",
      "about-summary":
        "Passionate about leveraging data in all its forms, from collection and analysis to structuring and visualization, I'm looking for a company where I can put my skills to work on innovative projects.",
      "skills-title": "Skills",
      "skills-description":
        "Versatile data analysis specialist with a broad toolkit: expert in statistical modeling, data wrangling, visualization, and pipeline architecture, complemented by solid foundations in web development. Comfortable picking up new technologies and frameworks quickly to deliver robust, scalable solutions.",
      "skills-frontend": "Front-end Development",
      "skills-dataviz": "Data Visualization",
      "skills-backend": "Back-end Development",
      "skills-ml": "Machine Learning",
      "skills-db": "Database Administration",
      "resume-title": "Resume",
      "resume-download": "Download my resume",
      "resume-summary-title": "Summary",
      "resume-summary-text":
        "Recent Data Engineering graduate with hands-on experience in building data pipelines and analytics solutions. Eager to leverage data to drive insights and efficiency in a fast-paced, growth-oriented company.",
      "resume-education": "Education",
      "resume-edu1-title": "Graduated • Bachelor of Engineering Degree",
      "resume-edu2-title": "Graduated • EEIC UIT",
      "resume-experience": "Professional Experience",
      "resume-exp1-title": "Apprenticeship • Data Analyst",
      "resume-exp2-title": "International Experience • Data Analyst",
      "resume-exp3-title": "Apprenticeship • Data Project Manager",
      "portfolio-title": "Portfolio",
      "portfolio-description":
        "Here are some of my web development and data visualization projects, built as a Data Engineer.",
      "portfolio-filter-all": "All",
      "portfolio-filter-webapp": "Web App",
      "portfolio-filter-dataviz": "Data Viz",
      "portfolio-item1-title": "Gribouillon QuickDraw",
      "portfolio-item1-desc":
        "Reproduction of the QuickDraw game: free-hand drawing app with real-time pattern recognition. Front-end in React, back-end in Flask, and ML model for inference.",
      "portfolio-item2-title": "Smart Library",
      "portfolio-item2-desc":
        "Web application for library management: user administration, tracking dashboard, and full features of a connected library system.",
      "portfolio-item3-title": "Sales Dashboard",
      "portfolio-item3-desc":
        "Personal project analyzing a large volume of sales data 📈.",
      "portfolio-item4-title": "eau'ptimiz Dashboard",
      "portfolio-item4-desc":
        "Project in partnership with the Loire department 🌍 to analyze and monitor pipe conditions and water leaks.",
      "portfolio-item5-title": "Air France Dashboard",
      "portfolio-item5-desc":
        "Personal project to track Air France flight data in real time ✈️.",
      "portfolio-item6-title": "Formula 1 Dashboard",
      "portfolio-item6-desc":
        "Personal project to monitor real-time performance of my favorite team, McLaren 🏎️.",
      "portfolio-item7-title": "F1 Tableau Dashboard",
      "portfolio-item7-desc":
        "Tableau project combining current analysis and McLaren's historical legacy (1980s–90s).",
      "testimonials-title": "Testimonials",
      "testimonial1-name": "Martin",
      "testimonial1-role": "Operations Director",
      "testimonial1-text":
        "I am really happy with the work done! He took the time to understand my needs and when he did, he delivered flawlessly. I will definitely work with Tristan again soon. Thanks!",
      "testimonial2-name": "Jordi",
      "testimonial2-role": "CTO",
      "testimonial2-text":
        "He has excellent communication and comprehension skills, as well as the ability to analyze and carry out tasks. He has expanded his knowledge of data management in the business, and learned to identify and extract valuable KPIs.",
      "contact-title": "Contact",
      "contact-email-label": "Email:",
      "contact-phone-label": "Call:",
      "form-name": "Your Name",
      "form-email": "Your Email",
      "form-subject": "Subject",
      "form-message": "Message",
      "form-send": "Send Message",
      "footer-role": "Data Engineer",
      "footer-rights": "© 2025 Tristan Mas. All rights reserved.",
    },
    fr: {
      "lang-english": "Anglais",
      "lang-french": "Français",
      "nav-home": "Accueil",
      "nav-about": "À propos",
      "nav-skills": "Compétences",
      "nav-resume": "CV",
      "nav-portfolio": "Portfolio",
      "nav-contact": "Contact",
      "hero-im": "Je suis ",
      "typing-texts": ["Ingénieur Data", "Développeur", "Analyste"],
      "about-title": "À propos",
      "about-description":
        "Ingénieur Data passionné par l'informatique, les données et les nouvelles technologies.",
      "about-origin-title": "Origine",
      "about-origin-content":
        "Cette passion a commencé en Formule 1, où chaque donnée permet d'améliorer les performances de la voiture et de prendre l'avantage sur la concurrence.",
      "about-work-title": "Au travail",
      "about-work-content":
        "Je conçois et maintiens des pipelines de données, analyse les performances du système et développe des rapports d'indicateurs pour éclairer la prise de décision.",
      "about-outside-title": "En dehors du travail",
      "about-outside-content":
        "J'utilise des outils connectés pour suivre ma forme, mes dépenses et mes investissements, me permettant de prendre les meilleures décisions au bon moment.",
      "about-age-label": "Âge :",
      "about-phone-label": "Téléphone :",
      "about-email-label": "Email :",
      "about-degree-label": "Diplôme :",
      "about-degree-value": "Ingénieur Data",
      "about-summary":
        "Passionné par l'exploitation de la donnée sous toutes ses formes, de la collecte à la visualisation, je recherche une entreprise où mettre mes compétences au service de projets innovants.",
      "skills-title": "Compétences",
      "skills-description":
        "Spécialiste polyvalent de l'analyse de données avec une boîte à outils étendue : modélisation statistique, transformation de données, visualisation et architecture de pipelines, complétées par de solides bases en développement web. À l'aise pour adopter rapidement de nouvelles technologies et livrer des solutions robustes et évolutives.",
      "skills-frontend": "Développement Front-end",
      "skills-dataviz": "Visualisation de données",
      "skills-backend": "Développement Back-end",
      "skills-ml": "Apprentissage automatique",
      "skills-db": "Administration de bases de données",
      "resume-title": "CV",
      "resume-download": "Télécharger mon CV",
      "resume-summary-title": "Résumé",
      "resume-summary-text":
        "Jeune diplômé en Data Engineering avec une expérience pratique dans la construction de pipelines de données et de solutions analytiques. Motivé pour exploiter les données afin de générer des insights et de l'efficacité dans une entreprise dynamique et en croissance.",
      "resume-education": "Formation",
      "resume-edu1-title": "Diplômé • Bachelor d'ingénierie",
      "resume-edu2-title": "Diplômé • DUT GEII",
      "resume-experience": "Expérience professionnelle",
      "resume-exp1-title": "Apprentissage • Data Analyst",
      "resume-exp2-title": "Expérience internationale • Data Analyst",
      "resume-exp3-title": "Apprentissage • Chef de projet Data",
      "portfolio-title": "Portfolio",
      "portfolio-description":
        "Voici quelques-uns de mes projets de développement web et de visualisation de données, réalisés en tant qu'Ingénieur Data.",
      "portfolio-filter-all": "Tous",
      "portfolio-filter-webapp": "Application Web",
      "portfolio-filter-dataviz": "Data Viz",
      "portfolio-item1-title": "Gribouillon QuickDraw",
      "portfolio-item1-desc":
        "Reproduction du jeu QuickDraw : application de dessin libre avec reconnaissance de motifs en temps réel. Front-end en React, back-end en Flask et modèle de ML pour l'inférence.",
      "portfolio-item2-title": "Smart Library",
      "portfolio-item2-desc":
        "Application web pour la gestion de bibliothèque : administration des utilisateurs, tableau de bord de suivi et toutes les fonctionnalités d'une bibliothèque connectée.",
      "portfolio-item3-title": "Tableau de bord des ventes",
      "portfolio-item3-desc":
        "Projet personnel analysant un large volume de données de ventes 📈.",
      "portfolio-item4-title": "Tableau de bord eau'ptimiz",
      "portfolio-item4-desc":
        "Projet en partenariat avec le département de la Loire 🌍 pour analyser et surveiller l'état des canalisations et les fuites d'eau.",
      "portfolio-item5-title": "Tableau de bord Air France",
      "portfolio-item5-desc":
        "Projet personnel pour suivre en temps réel les données des vols Air France ✈️.",
      "portfolio-item6-title": "Tableau de bord Formule 1",
      "portfolio-item6-desc":
        "Projet personnel pour suivre en temps réel les performances de mon équipe favorite, McLaren 🏎️.",
      "portfolio-item7-title": "Tableau de bord F1 Tableau",
      "portfolio-item7-desc":
        "Projet Tableau combinant analyse actuelle et héritage historique de McLaren (années 1980–90).",
      "testimonials-title": "Témoignages",
      "testimonial1-name": "Martin",
      "testimonial1-role": "Directeur des opérations",
      "testimonial1-text":
        "Je suis vraiment satisfait du travail réalisé ! Il a pris le temps de comprendre mes besoins et, lorsqu'il l'a fait, il a livré sans faute. Je retravaillerai certainement avec Tristan bientôt. Merci !",
      "testimonial2-name": "Jordi",
      "testimonial2-role": "CTO",
      "testimonial2-text":
        "Il possède d'excellentes capacités de communication et de compréhension, ainsi que la capacité d'analyser et d'exécuter les tâches. Il a enrichi ses connaissances en gestion des données dans l'entreprise et a appris à identifier et extraire des KPI précieux.",
      "contact-title": "Contact",
      "contact-email-label": "Email :",
      "contact-phone-label": "Téléphone :",
      "form-name": "Votre nom",
      "form-email": "Votre email",
      "form-subject": "Sujet",
      "form-message": "Message",
      "form-send": "Envoyer",
      "footer-role": "Ingénieur Data",
      "footer-rights": "© 2025 Tristan Mas. Tous droits réservés.",
    },
  };

  let typingTexts = translations.en["typing-texts"];
  const savedLang = localStorage.getItem("lang") || "en";

  // Initialize all functionality
  initNavigation();
  initLanguageSwitcher();
  initPortfolioFilters();
  initContactForm();
  initTypingEffect();
  initScrollAnimations();
  initThemeToggle();
  setLanguage(savedLang);

  // Navigation functionality
  function initNavigation() {
    const navLinks = document.querySelectorAll(".nav-menu a");

    navLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();

        const targetId = this.getAttribute("href");
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
          const headerHeight = document.querySelector(".header").offsetHeight;
          const targetPosition = targetSection.offsetTop - headerHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });
        }
      });
    });

    // Update active nav link on scroll
    window.addEventListener("scroll", updateActiveNavLink);
  }

  function updateActiveNavLink() {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-menu a");
    const headerHeight = document.querySelector(".header").offsetHeight;

    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - headerHeight - 50;
      const sectionHeight = section.offsetHeight;

      if (
        window.pageYOffset >= sectionTop &&
        window.pageYOffset < sectionTop + sectionHeight
      ) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  }

  // Language switcher functionality
  function initLanguageSwitcher() {
    const langLinks = document.querySelectorAll(".lang-link");

    langLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        const lang = this.getAttribute("data-lang");
        setLanguage(lang);
      });
    });
  }

  function setLanguage(lang) {
    const trans = translations[lang];
    if (!trans) return;

    document.documentElement.setAttribute("lang", lang);

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (trans[key]) {
        el.innerHTML = trans[key];
      }
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder");
      if (trans[key]) {
        el.setAttribute("placeholder", trans[key]);
      }
    });

    typingTexts = trans["typing-texts"];
    if (window.updateTypingTexts) {
      window.updateTypingTexts(typingTexts);

    }

    localStorage.setItem("lang", lang);

    document.querySelectorAll(".lang-link").forEach((link) => {
      link.classList.toggle("active", link.getAttribute("data-lang") === lang);
    });
  }

  // Portfolio filters functionality
  function initPortfolioFilters() {
    const filterBtns = document.querySelectorAll(".filter-btn");
    const portfolioItems = document.querySelectorAll(".portfolio-item");

    filterBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        const filter = this.getAttribute("data-filter");

        // Update active filter button
        filterBtns.forEach((b) => b.classList.remove("active"));
        this.classList.add("active");

        // Filter portfolio items
        portfolioItems.forEach((item) => {
          const category = item.getAttribute("data-category");

          if (filter === "all" || category === filter) {
            item.style.display = "block";
            item.classList.add("fade-in");
          } else {
            item.style.display = "none";
            item.classList.remove("fade-in");
          }
        });
      });
    });
  }

  // Contact form functionality
  function initContactForm() {
    const form = document.getElementById("contactForm");
    const formStatus = document.getElementById("form-status");

    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(form);
        const name = formData.get("name").trim();
        const email = formData.get("email").trim();
        const subject = formData.get("subject").trim();
        const message = formData.get("message").trim();

        // Validate form
        const errors = validateForm(name, email, subject, message);

        if (errors.length > 0) {
          showFormStatus("error", errors.join("<br>"));
          return;
        }

        // Show loading state
        showFormStatus("loading", "Loading...");

        // Simulate form submission
        setTimeout(() => {
          showFormStatus("success", "Your message has been sent. Thank you!");
          form.reset();
        }, 2000);
      });
    }
  }

  function validateForm(name, email, subject, message) {
    const errors = [];

    if (!name) {
      errors.push("Name is required");
    }

    if (!email) {
      errors.push("Email is required");
    } else if (!isValidEmail(email)) {
      errors.push("Please enter a valid email address");
    }

    if (!subject) {
      errors.push("Subject is required");
    }

    if (!message) {
      errors.push("Message is required");
    }

    return errors;
  }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function showFormStatus(type, message) {
    const formStatus = document.getElementById("form-status");

    if (formStatus) {
      formStatus.className = `form-status ${type}`;
      formStatus.innerHTML = message;

      if (type === "success" || type === "error") {
        setTimeout(() => {
          formStatus.className = "form-status";
          formStatus.innerHTML = "";
        }, 5000);
      }
    }
  }

  // Typing effect for hero section
  function initTypingEffect() {
    const typingText = document.querySelector(".typing-text");
    const cursor = document.querySelector(".cursor");

    if (typingText && cursor) {
      let texts = typingTexts;
      let textIndex = 0;
      let charIndex = 0;
      let isDeleting = false;

      function typeEffect() {
        const currentText = texts[textIndex];

        if (isDeleting) {
          typingText.textContent = currentText.substring(0, charIndex - 1);
          charIndex--;
        } else {
          typingText.textContent = currentText.substring(0, charIndex + 1);
          charIndex++;
        }

        let typeSpeed = isDeleting ? 100 : 150;

        if (!isDeleting && charIndex === currentText.length) {
          typeSpeed = 2000; // Pause at end
          isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
          isDeleting = false;
          textIndex = (textIndex + 1) % texts.length;
          typeSpeed = 500; // Pause before next word
        }

        setTimeout(typeEffect, typeSpeed);
      }

      // Start typing effect after a short delay
      setTimeout(typeEffect, 1000);

      window.updateTypingTexts = function (newTexts) {
        texts = newTexts;
        textIndex = 0;
        charIndex = 0;
        isDeleting = false;
      };
    }
  }

  // Scroll animations
  function initScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in");
        }
      });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll(
      ".about-item, .skill-category, .portfolio-item, .testimonial-item, .resume-item",
    );
    animateElements.forEach((el) => {
      observer.observe(el);
    });
  }

  // Dark mode toggle
  function initThemeToggle() {
    const toggleBtn = document.getElementById("theme-toggle");
    if (!toggleBtn) return;

    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const savedTheme =
      localStorage.getItem("theme") || (prefersDark ? "dark" : "light");
    setTheme(savedTheme);

    toggleBtn.addEventListener("click", () => {
      const newTheme =
        document.body.getAttribute("data-theme") === "dark" ? "light" : "dark";
      setTheme(newTheme);
    });

    function setTheme(theme) {
      document.body.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
      toggleBtn.textContent = theme === "dark" ? "☀️" : "🌙";

    }
  }

  // Smooth scroll to top functionality
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  // Add scroll to top button (optional)
  function addScrollToTopButton() {
    const scrollBtn = document.createElement("button");
    scrollBtn.innerHTML = "↑";
    scrollBtn.className = "scroll-to-top";
    scrollBtn.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: var(--accent-color);
            color: white;
            border: none;
            font-size: 20px;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
        `;

    document.body.appendChild(scrollBtn);

    scrollBtn.addEventListener("click", scrollToTop);

    window.addEventListener("scroll", function () {
      if (window.pageYOffset > 300) {
        scrollBtn.style.opacity = "1";
        scrollBtn.style.visibility = "visible";
      } else {
        scrollBtn.style.opacity = "0";
        scrollBtn.style.visibility = "hidden";
      }
    });
  }

  // Initialize scroll to top button
  addScrollToTopButton();

  // Handle image loading errors
  function handleImageErrors() {
    const images = document.querySelectorAll("img");

    images.forEach((img) => {
      img.addEventListener("error", function () {
        // Create a placeholder div if image fails to load
        const placeholder = document.createElement("div");
        placeholder.style.cssText = `
                    width: ${this.width || 100}px;
                    height: ${this.height || 100}px;
                    background: #f0f0f0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #666;
                    font-size: 12px;
                    border-radius: 4px;
                `;
        placeholder.textContent = "Image not found";

        if (this.parentNode) {
          this.parentNode.replaceChild(placeholder, this);
        }
      });
    });
  }

  // Initialize image error handling
  handleImageErrors();

  // Mobile menu toggle (if needed in future)
  function initMobileMenu() {
    // This can be expanded for mobile hamburger menu functionality
    const header = document.querySelector(".header");
    let lastScrollY = window.pageYOffset;

    window.addEventListener("scroll", function () {
      const currentScrollY = window.pageYOffset;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        header.style.transform = "translateY(-100%)";
      } else {
        header.style.transform = "translateY(0)";
      }

      lastScrollY = currentScrollY;
    });
  }

  // Initialize mobile menu
  initMobileMenu();

  // Console log for debugging
  console.log("Portfolio website initialized successfully!");
});

// Global error handler
window.addEventListener("error", function (e) {
  console.error("JavaScript error:", e.error);
});

// Handle unhandled promise rejections
window.addEventListener("unhandledrejection", function (e) {
  console.error("Unhandled promise rejection:", e.reason);
});
