let currentImageIndex = 0;
const images = {
  projekt1: [
    "img/portfolio1_1.jpg",
    "img/portfolio1_2.jpg",
    "img/portfolio1_3.jpg",
    "img/portfolio1_4.jpg",
    "img/portfolio1_5.jpg",
    "img/portfolio1_6.jpg"
  ],
  projekt2: [
    "img/portfolio2_1.jpg",
    "img/portfolio2_2.jpg",
    "img/portfolio2_3.jpg"
  ],
  projekt3: [
    "img/portfolio3_1.jpg",
    "img/portfolio3_2.jpg",
    "img/portfolio3_3.jpg",
    "img/portfolio3_4.jpg",
    "img/portfolio3_5.jpg",
    "img/portfolio3_6.jpg",
    "img/portfolio3_7.jpg"
  ]
};

let currentProject = "";
let lastScrollPosition = 0;

function openGallery(project) {
    if (!images[project]) {
        console.error(`Błąd: Projekt "${project}" nie istnieje!`);
        return;
    }

    currentProject = project;
    currentImageIndex = 0;
    const modal = document.querySelector(`#${project}`);

    if (!modal) {
        console.error(`Błąd: Nie znaleziono elementu z ID "${project}"`);
        return;
    }

    // 🔹 Zapisywanie pozycji scrolla
    lastScrollPosition = window.scrollY;

    // 🔹 Tworzenie czarnego tła z pozycją fixed dla poprawnego działania na telefonach
    let overlay = document.createElement("div");
    overlay.id = "gallery-overlay";
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100vw";
    overlay.style.height = "100vh";
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
    overlay.style.zIndex = "10000";
    overlay.style.display = "flex";
    overlay.style.justifyContent = "center";
    overlay.style.alignItems = "center";
    overlay.style.overflowY = "auto"; // Pozwala na przewijanie galerii na telefonach
    document.body.appendChild(overlay);

    // 🔹 Umieszczanie galerii w overlayu
    modal.style.display = "flex";
    modal.style.position = "relative";
    modal.style.zIndex = "10001"; // Zapewnia, że modal jest nad overlayem
    overlay.appendChild(modal);

    document.body.style.overflow = "hidden"; // Blokuje scroll na tle strony

    updateGalleryImage();

    overlay.addEventListener("click", (event) => {
        if (event.target === overlay) {
            closeGallery();
        }
    });
}

function closeGallery() {
    if (currentProject) {
        const modal = document.querySelector(`#${currentProject}`);
        modal.style.display = "none";

        // 🔹 Przywracanie scrolla i usuwanie czarnego tła
        document.body.style.overflow = "auto";
        const overlay = document.getElementById("gallery-overlay");
        if (overlay) {
            document.body.removeChild(overlay);
        }

        currentProject = "";
    }
}

function changeImage(direction) {
    if (!currentProject) return;

    currentImageIndex =
        (currentImageIndex + direction + images[currentProject].length) % images[currentProject].length;
    updateGalleryImage();
}

function updateGalleryImage() {
    if (!currentProject) return;

    const modalImage = document.querySelector(`#${currentProject} .gallery-image`);
    const counter = document.querySelector(`#${currentProject} .image-counter`);

    if (!modalImage) {
        console.error(`Błąd: Nie znaleziono obrazu w projekcie ${currentProject}`);
        return;
    }

    modalImage.src = images[currentProject][currentImageIndex];

    modalImage.style.maxWidth = "90vw";  // Maksymalna szerokość
    modalImage.style.maxHeight = "90vh"; // Maksymalna wysokość
    modalImage.style.objectFit = "contain"; // Zachowuje proporcje, bez rozciągania

    if (counter) {
        counter.textContent = `Zdjęcie ${currentImageIndex + 1} z ${images[currentProject].length}`;
    }
}
