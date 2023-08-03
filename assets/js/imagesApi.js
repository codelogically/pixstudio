// Preview Image

const previewImage = document.querySelector(".preview-image");
const title = document.getElementById("title");
const photographer = document.getElementById("photographer");
const imgSrc = document.getElementById("preview-img");
const closePrev = document.querySelector(".close");
const downloadImgBtn = document.getElementById("downloadImg");
const fullScreenBtn = document.getElementById("expand");
const fullScreen = document.querySelector(".full-screen");
const closeFullScreen = document.querySelector(".close-full-screen");
const fullScreenImg = document.getElementById("full-screen-img");

const previewImg = (imgTitle, imgUrl, downloadableImg, captureBy) => {
  imgSrc.src = imgUrl;
  title.innerText = imgTitle ? imgTitle : "Title Not Available";
  photographer.innerHTML = `<i class="fi fi-sr-camera"></i> ${captureBy}`;
  previewImage.classList.add("show-preview");
  downloadImgBtn.setAttribute("data-src", downloadableImg); // Showing Preview of Image
  // downloadImgBtn.setAttribute("data-full-screen", img)
  fullScreenBtn.addEventListener("click", () => {
    fullScreen.classList.add("open");
    document.body.style.overflow = "hidden";
    fullScreenImg.src = imgUrl;
  });
};

closePrev.addEventListener("click", () => {
  previewImage.classList.remove("show-preview");
});

downloadImgBtn.addEventListener("click", (e) => {
  downloadImg(e.target.dataset.downloadableImg); // Downloading Image by Clicking on Download Button
});

closeFullScreen.addEventListener("click", () => {
  fullScreen.classList.remove("open");
  document.body.style.overflow = "auto";
});

const apiKey = "NFOn6gizVcAcYcxzCcuMYrHPhqC2KtQl1Ulh567AUjIb5JnP1wofNuOU";
const perPage = 15;
let currentPage = 1;
let searchTerm = null;

const galleryWrapper = document.querySelector(".gallery-wrapper");
const loadMoreBtn = document.getElementById("load-more");
const searchImages = document.getElementById("search-images");

// Images downloading function

const downloadImg = () => {
  fetch(downloadImgBtn.getAttribute("data-src"))
    .then((res) => res.blob())
    .then((file) => {
      const a = document.createElement("a");
      a.href = URL.createObjectURL(file);
      a.download = `pixhub-image-${new Date().getHours()}-${new Date().getMinutes()}-${new Date().getSeconds()}`;
      a.click();
    })
    .catch(() => {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-start",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        width: "400px",
        color: "#0b132a",
      });

      Toast.fire({
        icon: "error",
        iconColor: "#FF5A5A",
        title: `<h1>Failed to Download Image</h1>`,
      });
    });
};

// Generating Html to display the Images

const generateHTML = (images) => {
  galleryWrapper.innerHTML += images
    .map(
      (img) =>
        `
      <div class="img-container" onclick="previewImg('${img.alt}', '${img.src.large2x}', '${img.src.original}', '${img.photographer}')">
        <div class="img-details">
          <div class="detail-wrapper">
            <span class="title">${img.alt}</span>
            <span class="photographer"><i class="fi fi-sr-camera"></i> ${img.photographer}</span>
          </div>
        </div>
        <img src="${img.src.large2x}" alt="${img.alt}" loading="lazy" />
      </div>
      `
    )
    .join("");
};

// Fetching Api For Images

const getImages = (apiURL) => {
  loadMoreBtn.innerText = "Loading...";
  fetch(apiURL, {
    headers: { Authorization: apiKey },
  })
    .then((res) => res.json())
    .then((data) => {
      loadMoreBtn.innerText = "Load More";
      console.log(data);
      generateHTML(data.photos);
    })
    .catch(() => {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-start",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        width: "350px",
        color: "#0b132a",
      });

      Toast.fire({
        icon: "error",
        iconColor: "#FF5A5A",
        title: `<h1>Failed to Load Images</h1>`,
      });
    });
};

// Loading more image if load more button clicked

const loadMoreImages = () => {
  currentPage++;
  let apiURL = `https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`;
  apiURL = searchTerm
    ? `https://api.pexels.com/v1/search?query=${searchTerm}&page=${currentPage}&per_page=${perPage}`
    : apiURL;
  getImages(apiURL);
};

// Images searching function

const loadSearchedImages = (e) => {
  if (e.target.value === "") {
    searchTerm = null;
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
      title: `<h1>Type Something to Search</h1`,
    });
    return false;
  }

  if (e.key === "Enter") {
    searchTerm = e.target.value;
    galleryWrapper.innerHTML = "";
    getImages(
      `https://api.pexels.com/v1/search?query=${searchTerm}&page=${currentPage}&per_page=${perPage}`
    );
    searchImages.value = "";
  }
};

// Function calling to display the videos

getImages(
  `https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`
);

loadMoreBtn.addEventListener("click", loadMoreImages);
searchImages.addEventListener("keyup", loadSearchedImages);
