/* ===========================
   NEXAGEN PHARMACEUTICALS
   Main JavaScript
   =========================== */

'use strict';

/* ===========================
   NAVBAR
   =========================== */
const initNavbar = () => {
  const navbar = document.querySelector('.navbar');
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  const navLinks = document.querySelectorAll('.nav-link[data-section]');

  // Scroll effect
  const handleScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
    updateActiveLink();
  };

  // Active link on scroll
  const updateActiveLink = () => {
    const sections = document.querySelectorAll('section[id]');
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 100) current = sec.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.dataset.section === current);
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Hamburger toggle
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open');
      document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    });

    // Close on link click
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }
};

/* ===========================
   SCROLL REVEAL
   =========================== */
const initScrollReveal = () => {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(el => observer.observe(el));
};

/* ===========================
   COUNTER ANIMATION
   =========================== */
const animateCounter = (el, target, suffix = '', duration = 1800) => {
  let start = 0;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease out cubic
    const current = Math.floor(eased * target);
    el.textContent = current.toLocaleString() + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
};

const initCounters = () => {
  const counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.counter);
        const suffix = el.dataset.suffix || '';
        animateCounter(el, target, suffix);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
};

/* ===========================
   PRODUCT MODAL
   =========================== */
const productData = {
  tablets: {
    title: 'Solid Oral Dosage Forms',
    category: 'Tablets & Capsules',
    description: 'Our solid oral dosage manufacturing facility operates under strict GMP conditions with automated granulation, compression, and coating lines. We produce immediate-release, modified-release, enteric-coated, and bi-layered tablets at commercial scale.',
    products: [
      { name: 'Amoxicillin 500mg Capsules', indication: 'Broad-spectrum antibiotic', ref: 'NXG-AMX-500' },
      { name: 'Metformin HCl 1000mg Extended-Release', indication: 'Type 2 Diabetes Management', ref: 'NXG-MET-1000XR' },
      { name: 'Atorvastatin 20mg Film-Coated Tablets', indication: 'Hyperlipidemia & CVD Prevention', ref: 'NXG-ATV-020' },
      { name: 'Omeprazole 20mg Gastro-Resistant Capsules', indication: 'GERD & Peptic Ulcer Disease', ref: 'NXG-OMP-020' },
    ],
    capacity: '500 million units/year',
    certifications: ['WHO-GMP', 'EU GMP Annex 1', 'US FDA 21 CFR Part 211'],
  },
  injectables: {
    title: 'Sterile Injectable Solutions',
    category: 'Injectables & IV',
    description: 'Class A/B aseptic filling suites capable of producing ampoules, vials, prefilled syringes, and large-volume parenterals. Full lyophilization capability with validated cold-chain logistics for temperature-sensitive biologicals.',
    products: [
      { name: 'Ceftriaxone 1g for Injection', indication: 'Hospital-acquired infections', ref: 'NXG-CTX-1G' },
      { name: 'Dextrose 5% in Water (D5W) 500ml', indication: 'IV fluid & nutrition support', ref: 'NXG-D5W-500' },
      { name: 'Ondansetron 4mg/2ml Injection', indication: 'Chemotherapy-induced nausea', ref: 'NXG-OND-4MG' },
      { name: 'Meropenem 500mg Powder for Infusion', indication: 'Severe hospital infections', ref: 'NXG-MEM-500' },
    ],
    capacity: '80 million ampoules & vials/year',
    certifications: ['WHO-GMP Sterile', 'PIC/S', 'ISO 14644 Class A'],
  },
  otc: {
    title: 'Over-the-Counter Products',
    category: 'OTC & Consumer Health',
    description: 'A comprehensive consumer health portfolio spanning analgesics, antacids, vitamins & mineral supplements, topical preparations, and cough-cold medications — all manufactured to Rx-grade GMP standards.',
    products: [
      { name: 'NexaRelief Paracetamol 500mg', indication: 'Fever & Mild-to-Moderate Pain', ref: 'NXG-OTC-PCM' },
      { name: 'NexaVit Multivitamin & Minerals', indication: 'Daily Nutritional Supplement', ref: 'NXG-OTC-MVM' },
      { name: 'NexaDigest Antacid Suspension', indication: 'Heartburn & Indigestion', ref: 'NXG-OTC-ANT' },
      { name: 'NexaCold Combination Tablets', indication: 'Cold, Flu & Catarrh Relief', ref: 'NXG-OTC-CLD' },
    ],
    capacity: '1.2 billion units/year',
    certifications: ['WHO-GMP', 'ISO 22000', 'Halal Certified'],
  },
  devices: {
    title: 'Drug-Device Combination Products',
    category: 'Medical Devices',
    description: 'We develop and manufacture drug-device combination products including pre-filled auto-injectors, inhalation devices (MDIs, DPIs), transdermal patch systems, and wound care products registered under both pharmaceutical and device regulatory frameworks.',
    products: [
      { name: 'Salbutamol 100mcg Metered-Dose Inhaler', indication: 'Bronchial Asthma & COPD', ref: 'NXG-DEV-MDI' },
      { name: 'Insulin Glargine 300U/ml Pre-filled Pen', indication: 'Type 1 & Type 2 Diabetes', ref: 'NXG-DEV-INS' },
      { name: 'NexaDerm Silver Wound Dressing', indication: 'Chronic & Infected Wounds', ref: 'NXG-DEV-WND' },
      { name: 'Salmeterol/Fluticasone DPI 50/250mcg', indication: 'Moderate-to-Severe Asthma', ref: 'NXG-DEV-DPI' },
    ],
    capacity: '15 million devices/year',
    certifications: ['ISO 13485', 'CE Marking Class IIa', 'CDSCO Approved'],
  },
};

const initModals = () => {
  const overlay = document.getElementById('productModal');
  if (!overlay) return;

  const closeBtn = overlay.querySelector('.modal-close');
  const modalTitle = overlay.querySelector('#modalTitle');
  const modalCategory = overlay.querySelector('#modalCategory');
  const modalDesc = overlay.querySelector('#modalDesc');
  const modalProducts = overlay.querySelector('#modalProducts');
  const modalCapacity = overlay.querySelector('#modalCapacity');
  const modalCerts = overlay.querySelector('#modalCerts');

  document.querySelectorAll('[data-modal]').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const key = trigger.dataset.modal;
      const data = productData[key];
      if (!data) return;

      modalTitle.textContent = data.title;
      modalCategory.textContent = data.category;
      modalDesc.textContent = data.description;
      modalProducts.innerHTML = data.products.map(p => `
        <li style="padding:14px 0;border-bottom:1px solid var(--gray-50);display:flex;justify-content:space-between;align-items:flex-start;gap:16px;">
          <div>
            <div style="font-weight:600;font-size:0.92rem;color:var(--text-dark);margin-bottom:3px;">${p.name}</div>
            <div style="font-size:0.82rem;color:var(--text-light);">${p.indication}</div>
          </div>
          <span style="font-family:var(--font-mono);font-size:0.75rem;color:var(--gray-400);flex-shrink:0;">${p.ref}</span>
        </li>
      `).join('');
      modalCapacity.textContent = data.capacity;
      modalCerts.innerHTML = data.certifications.map(c =>
        `<span class="badge badge-blue">${c}</span>`
      ).join('');

      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeModal = () => {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  };

  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
};

/* ===========================
   CONTACT FORM VALIDATION
   =========================== */
const initContactForm = () => {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const validate = (input) => {
    const group = input.closest('.form-group');
    const error = group?.querySelector('.form-error');
    let valid = true;
    let msg = '';

    if (!input.value.trim()) {
      valid = false;
      msg = 'This field is required.';
    } else if (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
      valid = false;
      msg = 'Please enter a valid email address.';
    } else if (input.name === 'phone' && input.value.trim().length < 7) {
      valid = false;
      msg = 'Please enter a valid phone number.';
    }

    input.classList.toggle('error', !valid);
    if (error) {
      error.textContent = msg;
      error.classList.toggle('show', !valid);
    }
    return valid;
  };

  form.querySelectorAll('input[required], select[required], textarea[required]').forEach(input => {
    input.addEventListener('blur', () => validate(input));
    input.addEventListener('input', () => validate(input));
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let allValid = true;
    inputs.forEach(input => { if (!validate(input)) allValid = false; });

    if (!allValid) return;

    const name = form.querySelector('[name="name"]').value;
    const email = form.querySelector('[name="email"]').value;
    const company = form.querySelector('[name="company"]').value || 'N/A';
    const interest = form.querySelector('[name="interest"]').value;
    const message = form.querySelector('[name="message"]').value;

    const subject = `Inquiry from ${name} — ${interest}`;
    const body = `Name: ${name}\nEmail: ${email}\nCompany: ${company}\nInterest: ${interest}\n\nMessage:\n${message}`;
    window.location.href = `mailto:info@nexagenpharma.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    const success = document.getElementById('formSuccess');
    if (success) success.classList.add('show');
    form.reset();
    setTimeout(() => success?.classList.remove('show'), 6000);
  });
};

/* ===========================
   PRODUCT PAGE FILTERS
   =========================== */
const initProductFilters = () => {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('[data-category]');
  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.filter;

      productCards.forEach(card => {
        if (cat === 'all' || card.dataset.category === cat) {
          card.style.display = '';
          setTimeout(() => card.classList.add('revealed'), 10);
        } else {
          card.style.display = 'none';
          card.classList.remove('revealed');
        }
      });
    });
  });
};

/* ===========================
   INIT
   =========================== */
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollReveal();
  initCounters();
  initModals();
  initContactForm();
  initProductFilters();
});
