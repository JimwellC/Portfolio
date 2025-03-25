'use strict';



/**
 * add event listener on multiple elements
 */

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}



/**
 * PRELOADER
 */

const preloader = document.querySelector("[data-preloader]");

window.addEventListener("DOMContentLoaded", function () {
  preloader.classList.add("loaded");
  document.body.classList.add("loaded");
});



/**
 * NAVBAR
 * navbar toggle for mobile
 */

const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navToggleBtn = document.querySelector("[data-nav-toggle-btn]");
const navbar = document.querySelector("[data-navbar]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  navToggleBtn.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
}

addEventOnElements(navTogglers, "click", toggleNavbar);



/**
 * HEADER
 * header active when window scroll down to 100px
 */

const header = document.querySelector("[data-header]");

window.addEventListener("scroll", function () {
  if (window.scrollY >= 100) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
});



/**
 * SLIDER
 */

const sliders = document.querySelectorAll("[data-slider]");

const initSlider = function (currentSlider) {

  const sliderContainer = currentSlider.querySelector("[data-slider-container]");
  const sliderPrevBtn = currentSlider.querySelector("[data-slider-prev]");
  const sliderNextBtn = currentSlider.querySelector("[data-slider-next]");

  let totalSliderVisibleItems = Number(getComputedStyle(currentSlider).getPropertyValue("--slider-items"));
  let totalSlidableItems = sliderContainer.childElementCount - totalSliderVisibleItems;

  let currentSlidePos = 0;

  const moveSliderItem = function () {
    sliderContainer.style.transform = `translateX(-${sliderContainer.children[currentSlidePos].offsetLeft}px)`;
  }

  /**
   * NEXT SLIDE
   */
  const slideNext = function () {
    const slideEnd = currentSlidePos >= totalSlidableItems;

    if (slideEnd) {
      currentSlidePos = 0;
    } else {
      currentSlidePos++;
    }

    moveSliderItem();
  }

  sliderNextBtn.addEventListener("click", slideNext);

  /**
   * PREVIOUS SLIDE
   */
  const slidePrev = function () {
    if (currentSlidePos <= 0) {
      currentSlidePos = totalSlidableItems;
    } else {
      currentSlidePos--;
    }

    moveSliderItem();
  }

  sliderPrevBtn.addEventListener("click", slidePrev);

  const dontHaveExtraItem = totalSlidableItems <= 0;
  if (dontHaveExtraItem) {
    sliderNextBtn.style.display = 'none';
    sliderPrevBtn.style.display = 'none';
  }

  /**
   * slide with [shift + mouse wheel]
   */

  currentSlider.addEventListener("wheel", function (event) {
    if (event.shiftKey && event.deltaY > 0) slideNext();
    if (event.shiftKey && event.deltaY < 0) slidePrev();
  });

  /**
   * RESPONSIVE
   */

  window.addEventListener("resize", function () {
    totalSliderVisibleItems = Number(getComputedStyle(currentSlider).getPropertyValue("--slider-items"));
    totalSlidableItems = sliderContainer.childElementCount - totalSliderVisibleItems;

    moveSliderItem();
  });

}

for (let i = 0, len = sliders.length; i < len; i++) { initSlider(sliders[i]); }


/**
 * BACK TO TOP BUTTON
 */

const backTopBtn = document.querySelector("[data-back-top-btn]");

window.addEventListener("scroll", function () {
  const bodyHeight = document.body.scrollHeight;
  const windowHeight = window.innerHeight;
  const scrollEndPos = bodyHeight - windowHeight;
  const totalScrollPercent = (window.scrollY / scrollEndPos) * 100;

  backTopBtn.textContent = `${totalScrollPercent.toFixed(0)}%`;

  // visible back top btn when scrolled 5% of the page
  if (totalScrollPercent > 5) {
    backTopBtn.classList.add("show");
  } else {
    backTopBtn.classList.remove("show");
  }
});

/**
 * CUSTOM CURSOR
 */

const cursor = document.querySelector("[data-cursor]");
const anchorElements = document.querySelectorAll("a");
const buttons = document.querySelectorAll("button");

// change cursorElement position based on cursor move
document.body.addEventListener("mousemove", function (event) {
  setTimeout(function () {
    cursor.style.top = `${event.clientY}px`;
    cursor.style.left = `${event.clientX}px`;
  }, 100);
});

/**PAGINATION */
document.addEventListener('DOMContentLoaded', function () {
  const certificatePages = document.querySelectorAll('.certificate-page');
  const paginationLinks = document.querySelectorAll('.pagination a[data-page]');
  const certificateTitle = document.getElementById('certificate-title');
  let currentPage = 1;

  function showPage(page) {
    certificatePages.forEach((item) => {
      item.style.display = item.getAttribute('data-page') == page ? 'block' : 'none';
    });
    paginationLinks.forEach((link) => {
      link.parentElement.classList.toggle('active', link.getAttribute('data-page') == page);
    });
    const activeLink = document.querySelector('.pagination a[data-page="' + page + '"]');
    if (activeLink) {
      certificateTitle.textContent = activeLink.getAttribute('data-title');
    }
  }

  paginationLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      currentPage = parseInt(link.getAttribute('data-page'));
      showPage(currentPage);
    });
  });

  // Initialize
  showPage(currentPage);


  // Remove focus from project cards after redirection
  const projectLinks = document.querySelectorAll('.portfolio-card .layer-link');
  projectLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      setTimeout(() => {
        link.blur();
      }, 100);
    });
  });

  AOS.init();
});





document.addEventListener('DOMContentLoaded', function () {
  const carousel = document.querySelector('[data-carousel]');
  const carouselInner = carousel.querySelector('[data-carousel-inner]');
  const prevButton = carousel.querySelector('[data-carousel-prev]');
  const nextButton = carousel.querySelector('[data-carousel-next]');
  const items = carouselInner.querySelectorAll('.carousel-item');
  let currentIndex = 0;

  function updateCarousel() {
    items.forEach((item, index) => {
      item.classList.toggle('active', index === currentIndex);
    });
    const offset = -currentIndex * 100;
    carouselInner.style.transform = `translateX(${offset}%)`;
  }

  prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : items.length - 1;
    updateCarousel();
  });

  nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex < items.length - 1) ? currentIndex + 1 : 0;
    updateCarousel();
  });

  updateCarousel();
});


//CONTACT FORM

document.addEventListener("DOMContentLoaded", function () {
  const sendButton = document.querySelector(".send-button");
  const resetButton = document.getElementById("reset-btn");

  sendButton.addEventListener("click", function () {
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("mail").value.trim();
      const message = document.getElementById("message").value.trim();

      if (name === "" || email === "" || message === "") {
          alert("Please fill out all fields before submitting.");
          return;
      }

      // Show pop-up message
      document.getElementById("popup").style.display = "block";
  });

  // Close pop-up
  document.getElementById("popup-close").addEventListener("click", function () {
      document.getElementById("popup").style.display = "none";

      // Clear the form fields after closing
      document.getElementById("name").value = "";
      document.getElementById("mail").value = "";
      document.getElementById("message").value = "";
  });

  // Reset button clears form
  resetButton.addEventListener("click", function () {
      document.getElementById("name").value = "";
      document.getElementById("mail").value = "";
      document.getElementById("message").value = "";
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const themeToggle = document.getElementById("themeToggle");
  const body = document.body;

  // Load saved preference
  if (localStorage.getItem("theme") === "light") {
    body.classList.add("light-mode");
  }

  themeToggle.addEventListener("click", () => {
    body.classList.toggle("light-mode");
    const isLight = body.classList.contains("light-mode");
    localStorage.setItem("theme", isLight ? "light" : "dark");
  });
});

