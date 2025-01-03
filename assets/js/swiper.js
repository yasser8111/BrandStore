// swiper ========================================================================

var swiper = new Swiper(".swiper-category", {
  direction: "horizontal",
  slidesPerView: 3,
  spaceBetween: 5,
  loop: true,
  breakpoints: {
    1024: {
      slidesPerView: 7,
      spaceBetween: 15,
    },
    768: {
      slidesPerView: 5,
      spaceBetween: 10,
    },
    500: {
      slidesPerView: 4,
      spaceBetween: 5,
    },
  },
  autoplay: {
    delay: 3000, // التمرير التلقائي بعد 3 ثواني
    disableOnInteraction: false, // التمرير التلقائي لا يتوقف عند التفاعل
  },
});