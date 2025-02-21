const mediaFiles = [
  //Alexandra
  { name: '2022-06-11 001', type: 'foto', src: 'Multimedia/Alexandra/2022-06-11 001.jpeg', artist: 'Alexandra' },
  { name: '2022-05-17 003', type: 'video', src: 'Multimedia/Alexandra/2022-05-17 003.mp4', artist: 'Alexandra' },
  { name: '2021-05-08 002', type: 'foto', src: 'Multimedia/Alexandra/2021-05-08 002.jpg', artist: 'Alexandra' },

  //Amalfis
  { name: '2024-02-27 001', type: 'foto', src: 'Multimedia/Amalfis/2024-02-27 001.jpg', artist: 'Amalfis' },
  
  //Anyeli
  { name: '2024-05-05 001', type: 'foto', src: 'Multimedia/Anyeli/2024-05-05 001.jpg', artist: 'Anyeli' },

  //Anyi
  { name: '2024-07-03 001', type: 'foto', src: 'Multimedia/Anyi/2024-07-03 001.jpg', artist: 'Anyi' },

  //Ashley
  { name: '2024-01-01 001', type: 'video', src: 'Multimedia/Ashley/2024-01-01 001.mp4', artist: 'Ashley' },

];

// { name: 'Nombre', type: 'foto', src: 'Multimedia/', artist: 'Actor' },
// { name: 'Nombre', type: 'video', src: 'Multimedia/', artist: 'Actor' },

const gallery = document.getElementById("gallery");
const videoElement = document.getElementById("fullscreenVideo");
const playPauseBtn = document.getElementById("playPause");
const seekBar = document.getElementById("seekBar");
const muteToggle = document.getElementById("muteToggle");
const artistFilter = document.getElementById("artistFilter");

const uniqueArtists = [...new Set(mediaFiles.map(media => media.artist))];
uniqueArtists.forEach(artist => {
    const option = document.createElement("option");
    option.value = artist;
    option.textContent = artist;
    artistFilter.appendChild(option);
});

artistFilter.addEventListener("change", renderGallery);

function renderGallery() {
  gallery.innerHTML = "";
  const selectedArtist = artistFilter.value;
  mediaFiles.filter(media => selectedArtist === "all" || media.artist === selectedArtist)
      .forEach(media => {
          const item = document.createElement("div");
          item.classList.add("item");
          if (media.type === "foto") {
              const img = document.createElement("img");
              img.src = media.src;
              item.appendChild(img);
              img.addEventListener("click", () => openFullscreenImg(media.src));
          } else if (media.type === "video") {
              const video = document.createElement("video");
              video.src = media.src;
              item.appendChild(video);
              video.addEventListener("click", () => openFullscreenVideo(media.src));
          }
          gallery.appendChild(item);
      });
}

function openFullscreenImg(src) {
  document.getElementById("fullscreenImg").src = src;
  document.getElementById("fullscreenImg").style.display = "block";
  document.getElementById("videoContainer").style.display = "none";
  document.getElementById("fullscreen").style.display = "flex";
}

function openFullscreenVideo(src) {
  videoElement.src = src;
  videoElement.style.display = "block";
  document.getElementById("fullscreenImg").style.display = "none";
  document.getElementById("videoContainer").style.display = "block";
  document.getElementById("fullscreen").style.display = "flex";
}

playPauseBtn.addEventListener("click", () => {
  if (videoElement.paused) {
      videoElement.play();
      playPauseBtn.textContent = "❚❚";
  } else {
      videoElement.pause();
      playPauseBtn.textContent = "▶";
  }
});

videoElement.addEventListener("timeupdate", () => {
  seekBar.value = (videoElement.currentTime / videoElement.duration) * 100;
});

seekBar.addEventListener("input", () => {
  videoElement.currentTime = (seekBar.value / 100) * videoElement.duration;
});

muteToggle.addEventListener("click", () => {
  videoElement.muted = !videoElement.muted;
  muteToggle.textContent = videoElement.muted ? "🔇" : "🔊";
});

document.getElementById("closeFullscreenImg").addEventListener("click", () => {
  document.getElementById("fullscreen").style.display = "none";
});

document.getElementById("closeFullscreen").addEventListener("click", () => {
  document.getElementById("fullscreen").style.display = "none";
  videoElement.pause();
});

renderGallery();


function renderGallery() {
  gallery.innerHTML = "";
  const selectedArtist = artistFilter.value;

  // Ordenar por nombre antes de renderizar
  mediaFiles.sort((a, b) => a.name.localeCompare(b.name));

  mediaFiles
    .filter(media => selectedArtist === "all" || media.artist === selectedArtist)
    .forEach(media => {
      const item = document.createElement("div");
      item.classList.add("item");
      if (media.type === "foto") {
        const img = document.createElement("img");
        img.src = media.src;
        item.appendChild(img);
        img.addEventListener("click", () => openFullscreenImg(media.src));
      } else if (media.type === "video") {
        const video = document.createElement("video");
        video.src = media.src;
        item.appendChild(video);
        video.addEventListener("click", () => openFullscreenVideo(media.src));
      }
      gallery.appendChild(item);
    });
}
