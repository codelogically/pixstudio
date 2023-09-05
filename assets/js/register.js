/* -------------------------
    Preloader
------------------------- */

const preloader = document.querySelector(".preloader");

const hideLoader = () => {
  preloader.classList.add("hide-loader");
};

window.addEventListener("load", hideLoader);

// Image Slider

var swiper = new Swiper(".mySwiper", {
  autoplay: {
    delay: 2500,
  },
  loop: true,
  speed: 1000,
  pagination: {
    el: ".swiper-pagination",
  },
});

// Form Validation

const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const registerBtn = document.getElementById("registerBtn");

const registerValidation = () => {
  if (username.value === "" && email.value === "" && password.value === "") {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-start",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      heightAuto: false,
      width: "400px",
      color: "#0b132a",
    });

    Toast.fire({
      icon: "warning",
      iconColor: "#73adff",
      title: `<h2>Provide Username, Email and Password</h2>`,
    });
    return false;
  } else if (email.value === "") {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-start",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      heightAuto: false,
      width: "300px",
      color: "#0b132a",
    });

    Toast.fire({
      icon: "warning",
      iconColor: "#73adff",
      title: `<h2>Provide Your Email</h2>`,
    });
    return false;
  } else if (username.value === "") {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-start",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      heightAuto: false,
      width: "300px",
      color: "#0b132a",
    });

    Toast.fire({
      icon: "warning",
      iconColor: "#73adff",
      title: `<h2>Provide Your Username</h2>`,
    });
    return false;
  } else if (password.value === "") {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-start",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      heightAuto: false,
      width: "300px",
      color: "#0b132a",
    });

    Toast.fire({
      icon: "warning",
      iconColor: "#73adff",
      title: `<h2>Create new Password</h2>`,
    });
    return false;
  } else if (email.value !== "" && password.value !== "") {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-start",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      heightAuto: false,
      width: "350px",
      color: "#0b132a",
    });

    Toast.fire({
      icon: "success",
      iconColor: "#a5dc86",
      title: `<h2>Account Created Successfully</h2>`,
    });
  }
  return false;
};

registerBtn.addEventListener("click", registerValidation);
