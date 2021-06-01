(() => {
  const swiper = new Swiper(".swiper-container", {
    // Optional parameters
    effect: "coverflow",
    loop: true,
    speed: 3000,
    autoplay: {
      deley: 2000,
    },

    // If we need pagination
    pagination: {
      el: ".swiper-pagination",
    },

    // Navigation arrows
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    // And if we need scrollbar
  });

  const targetElement = document.querySelectorAll(".animationTarget");
  document.addEventListener("scroll", () => {
    for (let i = 0; i < targetElement.length; i++) {
      const getElementDistance =
        targetElement[i].getBoundingClientRect().top +
        targetElement[i].clientHeight * 0.2;
      if (window.innerHeight > getElementDistance) {
        targetElement[i].classList.add("show");
      }
    }
  });
})();
