let currentImageIndex = 0;
const images = {
  projekt1: [
    "img/portfolio1_1.jpg",
    "img/portfolio1_2.jpg",
    "img/portfolio1_3.jpg",
    "img/portfolio1_4.jpg",
    "img/portfolio1_5.jpg",
    "img/portfolio1_6.jpg"
  ]
};
let currentProject = "";

function openGallery(project) {
  currentProject = project;
  currentImageIndex = 0;
  document.querySelector(`#${project}`).style.display = "flex";
  updateGalleryImage();
}

function closeGallery() {
  document.querySelector(`#${currentProject}`).style.display = "none";
  currentProject = "";
}

function changeImage(direction) {
  currentImageIndex =
    (currentImageIndex + direction + images[currentProject].length) %
    images[currentProject].length;
  updateGalleryImage();
}

function updateGalleryImage() {
  const modal = document.querySelector(`#${currentProject} .gallery-image`);
  modal.src = images[currentProject][currentImageIndex];
}
