/* -------------------------
    Header Scrolling Effect
------------------------- */

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
  header.classList.toggle("scroll", scrollY > 200);
});

/* -------------------------
    Preloader
------------------------- */

const preloader = document.querySelector(".preloader");

const hideLoader = () => {
  preloader.classList.add("hide-loader");
};

window.addEventListener("load", hideLoader);

/* -------------------------
    Go To Top Button
------------------------- */

const topBtn = document.getElementById("top");
const backToTop = document.querySelector(".top-btn");

window.addEventListener("scroll", () => {
  backToTop.classList.toggle("scroll-top", scrollY > 500);
});

const topFunction = () => {
  document.documentElement.scroll({
    top: 0,
    behaviour: "smooth",
  });
};

topBtn.addEventListener("click", topFunction);

/* -------------------------
    Menu Icon
  ------------------------- */

const menuIcon = document.querySelector(".menu-icon");
const navbar = document.querySelector(".navbar");

menuIcon.addEventListener("click", () => {
  menuIcon.classList.toggle("active");
  navbar.classList.toggle("open");
});
