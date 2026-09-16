/* =========================================================
   script.js — Abdulrehman Portfolio
   Shared script for the whole single-page site: nav + active
   section tracking, scroll progress bar, reveal-on-scroll,
   skill bar animation, project rendering (from real data only
   — the 5 URLs below are used exactly as given, never altered),
   and the contact form (frontend validation, Formspree-ready).
   ========================================================= */

/* =========================================================
   CONTACT DETAILS
   ========================================================= */
const WHATSAPP_NUMBER = "923079657528"; // 03079657528 in international format
const EMAIL = "mianabdulrehman922@gmail.com";
const WA_MESSAGE = "Hello Abdulrehman, I'd like to talk about a project.";

/* =========================================================
   PROJECT DATA — URLs are exact, never modified
   ========================================================= */
const PROJECTS = [
  {
    title: "Academy Nova Hub",
    description: "A modern educational platform website designed with a clean and professional academic experience.",
    tech: ["HTML", "CSS", "JavaScript", "Responsive Design"],
    url: "https://academy-nova-hub.lovable.app/",
    gradient: "linear-gradient(135deg, #4F7DFF, #34D9E8)",
    icon: "cap",
    image: "images/academy-nova-hub.jpg",
  },
  {
    title: "Rustic Table",
    description: "A stylish restaurant website featuring a modern dining experience, attractive visuals and responsive layout.",
    tech: ["HTML", "CSS", "JavaScript", "Responsive Design"],
    url: "https://rustic-table-dishup.lovable.app/",
    gradient: "linear-gradient(135deg, #9B6BFF, #4F7DFF)",
    icon: "fork",
    image: "images/rustic-table.jpg",
  },
  {
    title: "Gold Royal Fitness",
    description: "A premium fitness and gym website designed with a bold visual identity and modern responsive interface.",
    tech: ["HTML", "CSS", "JavaScript", "Responsive Design"],
    url: "https://gold-royal-fitness.lovable.app/",
    gradient: "linear-gradient(135deg, #34D9E8, #9B6BFF)",
    icon: "dumbbell",
    image: "images/gold-royal-fitness.jpg",
  },
  {
    title: "Real Project",
    description: "A modern real-world website project focused on professional presentation, responsive design and user experience.",
    tech: ["HTML", "CSS", "JavaScript"],
    url: "https://mianabdulrehman922-star.github.io/real/",
    gradient: "linear-gradient(135deg, #4F7DFF, #9B6BFF)",
    icon: "code",
    image: "images/real-project.jpg",
  },
  {
    title: "VU Learn Nova",
    description: "An educational platform concept created for Virtual University students to provide a better learning and study experience.",
    tech: ["HTML", "CSS", "JavaScript", "Responsive Design"],
    url: "https://mianabdulrehman922-star.github.io/vu-learn-nova/",
    gradient: "linear-gradient(135deg, #9B6BFF, #34D9E8)",
    icon: "book",
    image: "images/vu-learn-nova.jpg",
  },
];


const ICONS = {
  cap: `<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#0A0B10" stroke-width="1.8"><path d="M12 3L1 8l11 5 9-4.1V15"/><path d="M5 10.5V16c0 1.7 3.1 3 7 3s7-1.3 7-3v-5.5"/></svg>`,
  fork: `<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#0A0B10" stroke-width="1.8"><path d="M7 2v8a2 2 0 002 2v10M7 2v8M11 2v8"/><path d="M17 2c-1.5 0-3 1.5-3 4v4a3 3 0 003 3v9"/></svg>`,
  dumbbell: `<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#0A0B10" stroke-width="1.8"><path d="M6 7v10M18 7v10M2 10v4M22 10v4M6 12h12"/></svg>`,
  code: `<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#0A0B10" stroke-width="1.8"><path d="M8 4L2 12l6 8M16 4l6 8-6 8"/></svg>`,
  book: `<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#0A0B10" stroke-width="1.8"><path d="M4 4.5A2.5 2.5 0 016.5 2H20v18H6.5A2.5 2.5 0 004 22.5"/><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/></svg>`,
};

/* =========================================================
   WhatsApp / mailto links
   ========================================================= */
document.querySelectorAll(".js-whatsapp").forEach((el) => {
  el.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`;
  el.target = "_blank";
  el.rel = "noopener noreferrer";
});
document.querySelectorAll(".js-email").forEach((el) => { el.href = `mailto:${EMAIL}`; });
document.querySelectorAll(".js-email-text").forEach((el) => { el.textContent = EMAIL; });
document.querySelectorAll(".js-phone-text").forEach((el) => { el.textContent = "0307 9657528"; });

/* =========================================================
   Nav: hamburger, active-section indicator, scroll progress
   ========================================================= */
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    hamburger.setAttribute("aria-expanded", navLinks.classList.contains("open") ? "true" : "false");
  });
  navLinks.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => navLinks.classList.remove("open")));
}

const sections = document.querySelectorAll("section[id]");
const navAnchors = document.querySelectorAll(".nav-links a[href^='#']");
if (sections.length && navAnchors.length && "IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navAnchors.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === `#${entry.target.id}`));
        }
      });
    },
    { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
  );
  sections.forEach((s) => sectionObserver.observe(s));
}

const progressBar = document.querySelector(".scroll-progress");
function updateScrollProgress() {
  if (!progressBar) return;
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = `${docHeight > 0 ? (scrollTop / docHeight) * 100 : 0}%`;
}
window.addEventListener("scroll", updateScrollProgress, { passive: true });
updateScrollProgress();

/* =========================================================
   Reveal-on-scroll + skill bar fill (single IntersectionObserver
   handles both — one deliberate entrance, not scattered effects)
   ========================================================= */
const revealTargets = document.querySelectorAll(".reveal");
if (revealTargets.length && "IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          const bar = entry.target.querySelector(".skill-bar-fill");
          if (bar) bar.style.width = bar.dataset.level;
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealTargets.forEach((el) => revealObserver.observe(el));
} else {
  revealTargets.forEach((el) => {
    el.classList.add("in-view");
    const bar = el.querySelector(".skill-bar-fill");
    if (bar) bar.style.width = bar.dataset.level;
  });
}

/* =========================================================
   Render project cards
   Each card shows a live screenshot of the real project URL
   (via thum.io's free screenshot service — no API key needed,
   generated on-demand from the actual site). If that image
   ever fails to load (slow network, service rate-limited), the
   gradient + icon placeholder underneath shows instead — never
   a broken image icon.
   ========================================================= */
const projectsGrid = document.getElementById("projectsGrid");
if (projectsGrid) {
  projectsGrid.innerHTML = PROJECTS.map((p, i) => `
    <article class="project-card reveal">
      <div class="project-thumb thumb-loading" data-project-index="${i}">
        <span class="project-num">0${i + 1}</span>
        <div class="placeholder-art" style="background:${p.gradient};">
          ${ICONS[p.icon] || ""}
        </div>
        <img alt="${p.title} live preview" loading="lazy" />
      </div>
      <div class="project-body">
        <h3>${p.title}</h3>
        <p>${p.description}</p>
        <div class="tech-badges">${p.tech.map((t) => `<span>${t}</span>`).join("")}</div>
        <div class="card-actions">
          <a class="demo-btn" href="${p.url}" target="_blank" rel="noopener noreferrer">
            Live Demo
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17L17 7M8 7h9v9"/></svg>
          </a>
        </div>
      </div>
    </article>
  `).join("");

  // Screenshot loading: prefer a real image the user has placed in
  // /images (guaranteed to work, no third party involved). If none is
  // provided or it fails to load, fall back through a chain of free
  // screenshot services, since any single one can rate-limit, cold-start
  // slowly, or be blocked for a given target site — and if every source
  // fails, the gradient + icon placeholder underneath stays visible,
  // never a broken image icon.
  function screenshotSources(p) {
    const enc = encodeURIComponent(p.url);
    const sources = [];
    if (p.image) sources.push(p.image);
    sources.push(
      `https://image.thum.io/get/width/720/crop/450/noanimate/${p.url}`,
      `https://api.microlink.io/?url=${enc}&screenshot=true&meta=false&embed=screenshot.url`,
      `https://s0.wp.com/mshots/v1/${enc}?w=720&h=450`
    );
    return sources;
  }

  projectsGrid.querySelectorAll(".project-thumb").forEach((thumb) => {
    const p = PROJECTS[Number(thumb.dataset.projectIndex)];
    const sources = screenshotSources(p);
    const img = thumb.querySelector("img");
    let attempt = 0;

    function tryNext() {
      if (attempt >= sources.length) {
        thumb.classList.remove("thumb-loading");
        img.style.display = "none";
        return;
      }
      img.src = sources[attempt];
      attempt += 1;
    }
    img.addEventListener("error", tryNext);
    img.addEventListener("load", () => {
      thumb.classList.remove("thumb-loading");
      img.classList.add("loaded");
    });
    tryNext();
  });

  // Late-added cards need their own reveal observer since they weren't
  // in the DOM when the page-load observer above was set up.
  const newReveals = projectsGrid.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add("in-view"); io.unobserve(entry.target); }
      });
    }, { threshold: 0.1 });
    newReveals.forEach((el) => io.observe(el));
  } else {
    newReveals.forEach((el) => el.classList.add("in-view"));
  }
}

/* =========================================================
   Contact form — validates, then posts to Formspree if
   FORMSPREE_ENDPOINT is configured. Frontend-only otherwise:
   no fake backend, just a clear message pointing to email/WhatsApp.
   ========================================================= */
// TODO: paste your Formspree endpoint here (https://formspree.io/f/xxxxxxx)
// receiving email should be set to mianabdulrehman922@gmail.com in Formspree's dashboard.
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xdekneav";

const contactForm = document.getElementById("contactForm");
if (contactForm) {
  const fields = {
    contactName: { required: true, message: "Please enter your full name." },
    contactEmail: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Please enter a valid email address." },
    contactSubject: { required: true, message: "Please enter a subject." },
    contactMessage: { required: true, message: "Please enter your message." },
  };

  function validateField(id) {
    const el = document.getElementById(id);
    const rule = fields[id];
    const group = el.closest(".form-group");
    const value = el.value.trim();
    const valid = !(rule.required && !value) && !(rule.pattern && value && !rule.pattern.test(value));
    group.classList.toggle("invalid", !valid);
    return valid;
  }
  Object.keys(fields).forEach((id) => document.getElementById(id).addEventListener("blur", () => validateField(id)));

  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const allValid = Object.keys(fields).map(validateField).every(Boolean);
    const msg = document.getElementById("contactFormMsg");
    const submitBtn = contactForm.querySelector("button[type=submit]");

    if (!allValid) {
      msg.textContent = "Please fix the highlighted fields before submitting.";
      msg.className = "form-msg show error";
      return;
    }

    if (!FORMSPREE_ENDPOINT) {
      msg.textContent = `Message form isn't connected yet — please email ${EMAIL} or use WhatsApp below, and I'll reply directly.`;
      msg.className = "form-msg show error";
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "Sending…";
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(contactForm),
      });
      if (res.ok) {
        msg.textContent = "Your message has been sent. I'll get back to you soon.";
        msg.className = "form-msg show success";
        contactForm.reset();
      } else {
        msg.textContent = `Something went wrong. Please email ${EMAIL} directly instead.`;
        msg.className = "form-msg show error";
      }
    } catch (err) {
      console.error(err);
      msg.textContent = `Something went wrong. Please email ${EMAIL} directly instead.`;
      msg.className = "form-msg show error";
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Send Message";
    }
  });
}

document.querySelectorAll(".js-year").forEach((el) => { el.textContent = new Date().getFullYear(); });

/* =========================================================
   Extra design/animation polish
   - Cursor-follow glow inside the hero
   - Subtle 3D tilt on project cards (mouse-driven)
   - Staggered reveal delays so grids animate in one-by-one
   ========================================================= */
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Hero cursor glow
const hero = document.querySelector(".hero");
if (hero && !reduceMotion) {
  const glow = document.createElement("div");
  glow.className = "hero-cursor-glow";
  hero.appendChild(glow);
  hero.addEventListener("mousemove", (e) => {
    const rect = hero.getBoundingClientRect();
    glow.style.setProperty("--x", `${e.clientX - rect.left}px`);
    glow.style.setProperty("--y", `${e.clientY - rect.top}px`);
  });
}

// Stagger reveal delays within each grid/row so cards cascade in
document.querySelectorAll(".grid, .timeline").forEach((group) => {
  group.querySelectorAll(".reveal").forEach((el, i) => {
    el.style.setProperty("--d", `${Math.min(i * 90, 360)}ms`);
  });
});

// 3D tilt on project cards — attached after cards render
function attachTilt(card) {
  if (reduceMotion) return;
  card.addEventListener("mousemove", (e) => {
    const r = card.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    card.style.setProperty("--ry", `${px * 10}deg`);
    card.style.setProperty("--rx", `${-py * 10}deg`);
  });
  card.addEventListener("mouseleave", () => {
    card.style.setProperty("--rx", "0deg");
    card.style.setProperty("--ry", "0deg");
  });
}
document.querySelectorAll(".project-card").forEach(attachTilt);
if (projectsGrid) {
  // Re-run tilt + stagger for the cards rendered above (this block runs
  // after project rendering since script order is top-to-bottom).
  const cards = projectsGrid.querySelectorAll(".project-card");
  cards.forEach((card, i) => {
    attachTilt(card);
    card.style.setProperty("--d", `${Math.min(i * 90, 360)}ms`);
  });
}
