$(window).load(function() {
  jQuery('#all').click();
  return false;
});

$(document).ready(function() {
$('.scroll-link').on('click', function(e) {
  e.preventDefault();
  const targetID = $(this).attr('href'); // Pobiera ID z href
  const targetOffset = $(targetID).offset().top; // Pobiera pozycję sekcji

  $('html, body').animate({
      scrollTop: targetOffset - 50 // -50 to offset dla nagłówka
  }, 1000, 'swing');
});

// === SWIPER HERO SLIDER ===
var swiper = new Swiper(".hero-swiper", {
  loop: true,
  autoplay: {
    delay: 4000, // Czas między slajdami
    disableOnInteraction: false
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true
  },
  effect: "fade" // Efekt przejścia
});

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

function openGallery(project) {
  if (!images[project]) return;
  currentProject = project;
  currentImageIndex = 0;
  const modal = document.querySelector(`#${project}`);
  if (modal) {
    modal.style.display = "flex";
    updateGalleryImage();
    updateImageCounter();
    updateArrows();
  }
}

function closeGallery() {
  const modal = document.querySelector(`#${currentProject}`);
  if (modal) {
    modal.style.display = "none";
  }
  currentProject = "";
}

function changeImage(direction) {
  const projectImages = images[currentProject];
  if (!projectImages) return;

  const newIndex = currentImageIndex + direction;

  if (newIndex >= 0 && newIndex < projectImages.length) {
    currentImageIndex = newIndex;
    updateGalleryImage();
    updateImageCounter();
    updateArrows();
  }
}

function updateGalleryImage() {
  const modalImage = document.querySelector(`#${currentProject} .gallery-image`);
  if (modalImage && images[currentProject]) {
    modalImage.src = images[currentProject][currentImageIndex];
  }
}

function updateImageCounter() {
  const counter = document.querySelector(`#${currentProject} .image-counter`);
  if (counter && images[currentProject]) {
    counter.textContent = `Zdjęcie ${currentImageIndex + 1} z ${images[currentProject].length}`;
  }
}

function updateArrows() {
  const prevButton = document.querySelector(`#${currentProject} .prev`);
  const nextButton = document.querySelector(`#${currentProject} .next`);

  prevButton.disabled = currentImageIndex === 0;
  nextButton.disabled = currentImageIndex === images[currentProject].length - 1;
}

document.addEventListener("click", (event) => {
  if (event.target.classList.contains("prev")) {
    changeImage(-1);
  } else if (event.target.classList.contains("next")) {
    changeImage(1);
  } else if (event.target.classList.contains("close")) {
    closeGallery();
  }
});

document.querySelectorAll(".btn-view").forEach((button) => {
  button.addEventListener("click", function (event) {
    event.preventDefault();
    const projectId = this.getAttribute("onclick").match(/'([^']+)'/)[1];
    openGallery(projectId);
  });
});

function resizeText() {
  var preferredWidth = 767;
  var displayWidth = window.innerWidth;
  var percentage = displayWidth / preferredWidth;
  var fontsizetitle = 25;
  var newFontSizeTitle = Math.floor(fontsizetitle * percentage);
  $(".divclass").css("font-size", newFontSizeTitle)
}

if ($('#main-nav ul li:first-child').hasClass('active')) {
  $('#main-nav').css('background', 'none');
}

$('#mainNav').onePageNav({
  currentClass: 'active',
  changeHash: false,
  scrollSpeed: 950,
  scrollThreshold: 0.2,
  filter: '',
  easing: 'swing',
  begin: function() {},
  end: function() {
    if (!$('#main-nav ul li:first-child').hasClass('active')) {
      $('.header').addClass('addBg');
    } else {
      $('.header').removeClass('addBg');
    }
  },
  scrollChange: function($currentListItem) {
    if (!$('#main-nav ul li:first-child').hasClass('active')) {
      $('.header').addClass('addBg');
    } else {
      $('.header').removeClass('addBg');
    }
  }
});

var container = $('#portfolio_wrapper');

container.isotope({
  animationEngine: 'best-available',
  animationOptions: {
    duration: 200,
    queue: false
  },
  layoutMode: 'fitRows'
});

$('#filters a').click(function() {
  $('#filters a').removeClass('active');
  $(this).addClass('active');
  container.isotope({ filter: '*' });
  return false;
});

function splitColumns() {
  var winWidth = $(window).width(),
      columnNumb = 1;

  if (winWidth > 1024) {
    columnNumb = 4;
  } else if (winWidth > 900) {
    columnNumb = 2;
  } else if (winWidth > 479) {
    columnNumb = 2;
  } else if (winWidth < 479) {
    columnNumb = 1;
  }

  return columnNumb;
}

function setColumns() {
  var winWidth = $(window).width(),
      columnNumb = splitColumns(),
      postWidth = Math.floor(winWidth / columnNumb);

  container.find('.portfolio-item').each(function() {
    $(this).css({ width: postWidth + 'px' });
  });
}

function setProjects() {
  setColumns();
  container.isotope('reLayout');
}

container.imagesLoaded(function() {
  setColumns();
});

$(window).bind('resize', function() {
  setProjects();
});

wow = new WOW({
  animateClass: 'animated',
  offset: 100,
  mobile: true 
});

wow.init();
});

// Minimal custom.js with working blog save/load and display
document.addEventListener("DOMContentLoaded", function () {
  const toggleFormBtn = document.getElementById("toggleFormBtn");
  const postForm = document.getElementById("postForm");
  const savePostBtn = document.getElementById("savePostBtn");
  const titleInput = document.getElementById("titleInput");
  const contentInput = document.getElementById("contentInput");
  const imageInput = document.getElementById("imageInput");
  const blogCatalog = document.getElementById("blogCatalog");

  let posts = JSON.parse(localStorage.getItem("blogPosts")) || [];

  function clearForm() {
    titleInput.value = "";
    contentInput.value = "";
    imageInput.value = "";
  }

  function addToCatalog(post) {
    const card = document.createElement("div");
    card.className = "blog-card";

    const img = document.createElement("img");
    img.src = post.image || "img/default.jpg";

    const overlay = document.createElement("div");
    overlay.className = "blog-title";
    overlay.innerText = post.title;

    card.appendChild(img);
    card.appendChild(overlay);

    card.addEventListener("click", () => {
      const viewer = document.getElementById("blogPostViewer");
      document.getElementById("postViewTitle").textContent = post.title;
      document.getElementById("postViewContent").textContent = post.content;
      viewer.classList.remove("hidden");
      viewer.scrollIntoView({ behavior: "smooth" });
    });

    blogCatalog.prepend(card);
  }

  function renderCatalog() {
    blogCatalog.innerHTML = "";
    posts.forEach(post => addToCatalog(post));
  }
 
  function showPost(title, content, image) {
    const viewer = document.getElementById("blogPostViewer");
    document.getElementById("postViewTitle").textContent = title;
    document.getElementById("postViewContent").textContent = content;
    const img = document.getElementById("postViewImage");
    img.src = image || "img/default.jpg";
    viewer.classList.remove("hidden");
    window.scrollTo({ top: viewer.offsetTop - 100, behavior: "smooth" });
  }
  
  function closePostViewer() {
    document.getElementById("blogPostViewer").classList.add("hidden");
  }
  function savePost(title, content, image) {
    const post = {
      title,
      content,
      date: new Date().toLocaleDateString(),
      image: image || null
    };

    posts.unshift(post);
    localStorage.setItem("blogPosts", JSON.stringify(posts));
    renderCatalog();
    clearForm();
    postForm.classList.add("hidden");
    toggleFormBtn.classList.remove("hidden");
  }

  toggleFormBtn.onclick = () => {
    postForm.classList.remove("hidden");
    toggleFormBtn.classList.add("hidden");
    clearForm();
  };

  savePostBtn.onclick = () => {
    const title = titleInput.value.trim();
    const content = contentInput.value.trim();
    if (!title || !content) return alert("Tytuł i treść są wymagane.");

    const file = imageInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        savePost(title, content, reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      savePost(title, content, null);
    }
  };

  renderCatalog();
});
