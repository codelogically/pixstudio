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

const email = document.getElementById("email");
const password = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");

const loginValidation = (e) => {
  e.preventDefault();

  if (email.value === "" && password.value === "") {
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
      title: `<h2>Enter Email and Password</h2>`,
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
      title: `<h2>Enter Email to Login</h2>`,
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
      title: `<h2>Enter Password to Login</h2>`,
    });
    return false;
  }

  else if (email.value !== "" && password.value !== "") {
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
      icon: "success",
      iconColor: "#a5dc86",
      title: `<h2>Login Successful</h2>`,
    });
  }
  return false;
};

loginBtn.addEventListener("click", loginValidation);
