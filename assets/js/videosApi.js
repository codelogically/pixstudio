// Video Preview Section

const previewVid = document.querySelector(".preview-video");
const videoGrapher = document.getElementById("videographer");
const vidSrc = document.getElementById("vid_src");
const closePrev = document.querySelector(".close");
const downloadVidBtn = document.getElementById("downloadVid");

const previewVideo = (name, vidUrl, downloadableVid) => {
  previewVid.classList.add("show-preview");
  vidSrc.src = vidUrl;
  videoGrapher.innerHTML = `<i class="fi fi-sr-camera"></i> ${name}`;
  downloadVidBtn.setAttribute("data-src", downloadableVid);
}

downloadVidBtn.addEventListener("click", (e) => {
  downloadVideo(e.target.dataset.downloadableVid);
});

closePrev.addEventListener("click", () => {
  previewVid.classList.remove("show-preview");
});

const apiKey = "NFOn6gizVcAcYcxzCcuMYrHPhqC2KtQl1Ulh567AUjIb5JnP1wofNuOU";
const perPage = 15;
let currentPage = 1;
let searchTerm = null;

const galleryWrapper = document.querySelector(".gallery-wrapper");
const loadMoreBtn = document.getElementById("load-more");
const searchVideos = document.getElementById("search-videos");

// Video downloading function

const downloadVideo = async () => {
  await fetch(downloadVidBtn.getAttribute("data-src"))
    .then((res) => res.blob())
    .then((file) => {
      const a = document.createElement("a");
      a.href = URL.createObjectURL(file);
      a.download = `pixhub-video-${new Date().getHours()}-${new Date().getMinutes()}-${new Date().getSeconds()}`;
      a.click();
    })
    .catch(() => {
      const Toast = Swal.mixin({
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        width: "400px",
        color: "#0b132a",
      });

      Toast.fire({
        icon: "error",
        iconColor: "#FF5A5A",
        title: `<h1>Failed to Download Video</h1>`,
      });
    });
};

// Generating Html to display the videos

const generateHTML = (videos) => {
  galleryWrapper.innerHTML += videos
    .map(
      (video) =>
        `
    <div class="video-container" onclick="previewVideo('${video.user.name}', '${video.video_files[1].link}', '${video.video_files[0].link}')">
      <div class="video-details">
        <div class="detail-wrapper">
          <span class="videographer">
            <i class="fi fi-sr-camera"></i> ${video.user.name}
          </span>
        </div>
      </div>
      <video autoplay muted loop>
        <source src="${video.video_files[1].link}" type="video/mp4" />
      </video>
    </div>
    `
    )
    .join("");
};

// Fetching Api For Videos

const getVideos = (apiURL) => {
  loadMoreBtn.innerText = "Loading...";
  fetch(apiURL, {
    headers: { Authorization: apiKey },
  })
    .then((res) => res.json())
    .then((data) => {
      loadMoreBtn.innerText = "Load More";
      console.log(data);
      generateHTML(data.videos);
    })
    .catch(() => {
      const Toast = Swal.mixin({
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        width: "350px",
        color: "#0b132a",
      });

      Toast.fire({
        icon: "error",
        iconColor: "#FF5A5A",
        title: `<h1>Failed to Load Videos</h1>`,
      });
    });
};

// Loading more video if load more button clicked

const loadMoreVideos = () => {
  currentPage++;
  let apiURL = `https://api.pexels.com/videos/popular?page=${currentPage}per_page=${perPage}`;
  apiURL = searchTerm
    ? `https://api.pexels.com/videos/search?query=${searchTerm}&page=${currentPage}per_page=${perPage}`
    : apiURL;
  getVideos(apiURL);
};

// Videos searching function

const loadSearcheVideos = (e) => {
  if (e.target.value === "") {
    searchTerm = null;
    const Toast = Swal.mixin({
      toast: true,
      position: "top",
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
    getVideos(
      `https://api.pexels.com/videos/search?query=${searchTerm}&page=${currentPage}per_page=${perPage}`
    );
    searchVideos.value = "";
  }
};

// Function calling to display the videos

getVideos(
  `https://api.pexels.com/videos/popular?page=${currentPage}per_page=${perPage}`
);

loadMoreBtn.addEventListener("click", loadMoreVideos);
searchVideos.addEventListener("keyup", loadSearcheVideos);
