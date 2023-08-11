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
const password = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");

const loginValidation = (e) => {
  e.preventDefault();

  if (username.value === "" && password.value === "") {
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
      icon: "warning",
      iconColor: "#73adff",
      title: `<h2>Enter Username and Password</h2>`,
    });
    return false;
  } else if (username .value === "") {
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
      title: `<h2>Enter Username to Login</h2>`,
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

  else if (username.value !== "" && password.value !== "") {
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
