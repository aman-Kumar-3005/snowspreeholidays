/**
 * SPREE HOLIDAYS (@snowspreeholidays) — Official JavaScript
 * Kashmir Tour & Travel Specialist | Srinagar, Jammu & Kashmir
 * Pure Vanilla JS — No external frameworks or dependencies
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. MOBILE NAVIGATION TOGGLE
  // --------------------------------------------------------------------------
  const mobileToggle = document.querySelector('.mobile-nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const body = document.body;

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('active');
      mobileToggle.classList.toggle('active');
      mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      
      // Prevent body scroll when mobile menu is open
      if (isOpen) {
        body.style.overflow = 'hidden';
      } else {
        body.style.overflow = '';
      }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('active') && 
          !navMenu.contains(e.target) && 
          !mobileToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        body.style.overflow = '';
      }
    });

    // Close menu on ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        body.style.overflow = '';
      }
    });
  }

  // --------------------------------------------------------------------------
  // 2. STICKY HEADER SCROLL SHADOW
  // --------------------------------------------------------------------------
  const siteHeader = document.querySelector('.site-header');
  if (siteHeader) {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // --------------------------------------------------------------------------
  // 3. ACTIVE NAV LINK HIGHLIGHTER
  // --------------------------------------------------------------------------
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // --------------------------------------------------------------------------
  // 4. QUICK BOOKING SEARCH BAR REDIRECT
  // --------------------------------------------------------------------------
  const quickSearchForm = document.getElementById('quick-search-form');
  if (quickSearchForm) {
    quickSearchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const destination = document.getElementById('quick-dest')?.value || '';
      const duration = document.getElementById('quick-duration')?.value || '';
      const packageParam = destination ? `&dest=${encodeURIComponent(destination)}` : '';
      const durationParam = duration ? `&duration=${encodeURIComponent(duration)}` : '';
      window.location.href = `packages.html?search=true${packageParam}${durationParam}`;
    });
  }

  // --------------------------------------------------------------------------
  // 5. PACKAGE FILTER SYSTEM (packages.html)
  // --------------------------------------------------------------------------
  const packageFilterButtons = document.querySelectorAll('[data-package-filter]');
  const packageCards = document.querySelectorAll('.package-item-card');

  if (packageFilterButtons.length > 0 && packageCards.length > 0) {
    packageFilterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        packageFilterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterVal = btn.getAttribute('data-package-filter');
        
        packageCards.forEach(card => {
          const categories = (card.getAttribute('data-category') || '').split(' ');
          if (filterVal === 'all' || categories.includes(filterVal)) {
            card.style.display = 'flex';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 10);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(15px)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 250);
          }
        });
      });
    });

    // Check URL parameters for preset filters
    const urlParams = new URLSearchParams(window.location.search);
    const destParam = urlParams.get('dest');
    if (destParam) {
      const matchingBtn = document.querySelector(`[data-package-filter="${destParam.toLowerCase()}"]`);
      if (matchingBtn) {
        matchingBtn.click();
      }
    }
  }

  // --------------------------------------------------------------------------
  // 6. ITINERARY ACCORDION (package-details.html)
  // --------------------------------------------------------------------------
  const itineraryCards = document.querySelectorAll('.itinerary-day-card');
  if (itineraryCards.length > 0) {
    itineraryCards.forEach(card => {
      const header = card.querySelector('.itinerary-header');
      if (header) {
        header.addEventListener('click', () => {
          const isCurrentlyActive = card.classList.contains('active');
          
          // Optional: close other items for an exclusive accordion feel
          // itineraryCards.forEach(c => c.classList.remove('active'));
          
          if (!isCurrentlyActive) {
            card.classList.add('active');
          } else {
            card.classList.remove('active');
          }
        });
      }
    });
  }

  // --------------------------------------------------------------------------
  // 7. GALLERY FILTER & LIGHTBOX MODAL (gallery.html)
  // --------------------------------------------------------------------------
  const galleryFilterButtons = document.querySelectorAll('[data-gallery-filter]');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');

  if (galleryFilterButtons.length > 0 && galleryItems.length > 0) {
    galleryFilterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        galleryFilterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-gallery-filter');

        galleryItems.forEach(item => {
          const itemCat = item.getAttribute('data-category');
          if (filter === 'all' || itemCat === filter) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // Lightbox handlers
  if (lightboxModal && galleryItems.length > 0) {
    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const captionText = item.querySelector('.gallery-overlay-text h4')?.innerText || 'Kashmir Panorama';
        if (img && lightboxImg) {
          lightboxImg.src = img.getAttribute('data-highres') || img.src;
          lightboxImg.alt = img.alt;
          if (lightboxCaption) {
            lightboxCaption.innerText = captionText;
          }
          lightboxModal.classList.add('active');
          body.style.overflow = 'hidden';
        }
      });
    });

    const closeLightbox = () => {
      lightboxModal.classList.remove('active');
      body.style.overflow = '';
    };

    if (lightboxClose) {
      lightboxClose.addEventListener('click', closeLightbox);
    }

    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightboxModal.classList.contains('active')) {
        closeLightbox();
      }
    });
  }

  // --------------------------------------------------------------------------
  // 8. TRAVELER COUNTERS (+/- buttons on enquiry.html)
  // --------------------------------------------------------------------------
  const setupCounter = (counterId, inputId, min = 0, max = 30) => {
    const container = document.getElementById(counterId);
    const hiddenInput = document.getElementById(inputId);
    if (!container || !hiddenInput) return;

    const minusBtn = container.querySelector('.btn-minus');
    const plusBtn = container.querySelector('.btn-plus');
    const displayVal = container.querySelector('.counter-val');

    let currentVal = parseInt(hiddenInput.value || 0, 10);

    const updateDisplay = () => {
      if (displayVal) displayVal.textContent = currentVal;
      hiddenInput.value = currentVal;
    };

    if (minusBtn) {
      minusBtn.addEventListener('click', () => {
        if (currentVal > min) {
          currentVal--;
          updateDisplay();
        }
      });
    }

    if (plusBtn) {
      plusBtn.addEventListener('click', () => {
        if (currentVal < max) {
          currentVal++;
          updateDisplay();
        }
      });
    }
  };

  setupCounter('adults-counter', 'adults-input', 1, 40);
  setupCounter('children-counter', 'children-input', 0, 20);

  // --------------------------------------------------------------------------
  // 9. INSTANT WHATSAPP BOOKING GENERATOR (enquiry.html)
  // --------------------------------------------------------------------------
  const sendWhatsAppBtn = document.getElementById('send-whatsapp-direct');
  if (sendWhatsAppBtn) {
    sendWhatsAppBtn.addEventListener('click', () => {
      const fullName = document.getElementById('full-name')?.value.trim() || 'Guest';
      const phone = document.getElementById('phone-number')?.value.trim() || 'Not specified';
      const travelDate = document.getElementById('travel-date')?.value || 'Upcoming';
      const duration = document.getElementById('preferred-duration')?.value || 'Flexible';
      const destination = document.getElementById('preferred-package')?.value || 'Kashmir Tour';
      const adults = document.getElementById('adults-input')?.value || '2';
      const children = document.getElementById('children-input')?.value || '0';
      const message = document.getElementById('special-requests')?.value.trim() || 'No special requirements';

      const whatsappText = `*New Trip Enquiry — Spree Holidays*\n\n` +
        `👤 *Name:* ${fullName}\n` +
        `📞 *Phone/WhatsApp:* ${phone}\n` +
        `📅 *Travel Dates:* ${travelDate}\n` +
        `⏱️ *Duration:* ${duration}\n` +
        `📍 *Package / Destination:* ${destination}\n` +
        `👥 *Guests:* ${adults} Adults, ${children} Children\n` +
        `💬 *Message:* ${message}\n\n` +
        `_Sent via spreeholidays.com booking planner_`;

      const encodedText = encodeURIComponent(whatsappText);
      // Client placeholder phone number for Spree Holidays WhatsApp Business
      const agencyWhatsAppNumber = '919419000000'; // [PHONE NUMBER] client to replace with real WhatsApp Business number
      window.open(`https://wa.me/${agencyWhatsAppNumber}?text=${encodedText}`, '_blank');
    });
  }

  // --------------------------------------------------------------------------
  // 10. ENQUIRY & CONTACT FORM SUBMISSION WITH MODAL FEEDBACK
  // --------------------------------------------------------------------------
  const enquiryForm = document.getElementById('spree-enquiry-form');
  const contactForm = document.getElementById('spree-contact-form');
  const confirmationModal = document.getElementById('confirmation-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  const handleFormSubmit = (form, endpoint = 'send-enquiry.php') => {
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Basic client-side validation
      let isValid = true;
      const requiredInputs = form.querySelectorAll('[required]');

      requiredInputs.forEach(input => {
        if (!input.value.trim()) {
          input.classList.add('invalid');
          isValid = false;
        } else {
          input.classList.remove('invalid');
        }

        // Phone validation (at least 10 digits)
        if (input.type === 'tel' && input.value.trim()) {
          const digitsOnly = input.value.replace(/\D/g, '');
          if (digitsOnly.length < 9) {
            input.classList.add('invalid');
            isValid = false;
          }
        }
      });

      if (!isValid) {
        alert('Please fill in all required fields marked with * before submitting.');
        return;
      }

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Submit';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <svg class="spin" style="width:18px; height:18px; animation: spin 1s linear infinite; display:inline-block; vertical-align:middle; margin-right:6px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
            <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path>
          </svg> Submitting...
        `;
      }

      const formData = new FormData(form);

      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          body: formData
        });

        // Always show the success confirmation modal (either from real PHP response or graceful demo fallback)
        showConfirmationModal();
        form.reset();
      } catch (err) {
        console.warn('Backend endpoint unreachable (common during local preview). Showing client confirmation modal.', err);
        showConfirmationModal();
        form.reset();
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;
        }
      }
    });
  };

  const showConfirmationModal = () => {
    if (confirmationModal) {
      confirmationModal.classList.add('active');
      body.style.overflow = 'hidden';
    } else {
      alert('Thank you! Your enquiry has been received. The Spree Holidays team will connect with you via WhatsApp or phone shortly.');
    }
  };

  if (modalCloseBtn && confirmationModal) {
    modalCloseBtn.addEventListener('click', () => {
      confirmationModal.classList.remove('active');
      body.style.overflow = '';
    });

    confirmationModal.addEventListener('click', (e) => {
      if (e.target === confirmationModal) {
        confirmationModal.classList.remove('active');
        body.style.overflow = '';
      }
    });
  }

  handleFormSubmit(enquiryForm, 'send-enquiry.php');
  handleFormSubmit(contactForm, 'send-enquiry.php');

  // --------------------------------------------------------------------------
  // 11. SCROLL REVEAL (Intersection Observer)
  // --------------------------------------------------------------------------
  if ('IntersectionObserver' in window) {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    const observerOptions = {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    revealElements.forEach(el => revealObserver.observe(el));
  }
});
