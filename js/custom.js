/*
Author URI: http://webthemez.com/
Note: 
Licence under Creative Commons Attribution 3.0 
Do not remove the back-link in this web template 
-------------------------------------------------------*/

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

// Funkcja otwierania galerii
function openGallery(project) {
  if (!images[project]) return; // Sprawdzenie, czy istnieje taki projekt
  currentProject = project;
  currentImageIndex = 0; // Reset indeksu do pierwszego zdjęcia
  const modal = document.querySelector(`#${project}`);
  if (modal) {
    modal.style.display = "flex"; // Pokazanie modala
    updateGalleryImage();
    updateImageCounter();
    updateArrows();
  }
}


// Funkcja zamykania galerii
function closeGallery() {
  const modal = document.querySelector(`#${currentProject}`);
  if (modal) {
    modal.style.display = "none";
  }
  currentProject = "";
}

// Funkcja zmiany obrazu
function changeImage(direction) {
  const projectImages = images[currentProject];
  if (!projectImages) return;

  const newIndex = currentImageIndex + direction;

  // Sprawdzenie zakresu indeksów
  if (newIndex >= 0 && newIndex < projectImages.length) {
    currentImageIndex = newIndex;
    updateGalleryImage();
    updateImageCounter();
    updateArrows();
  }
}


// Aktualizacja obrazu w galerii
function updateGalleryImage() {
  const modalImage = document.querySelector(`#${currentProject} .gallery-image`);
  if (modalImage && images[currentProject]) {
    modalImage.src = images[currentProject][currentImageIndex];
  }
}

// Aktualizacja licznika zdjęć
function updateImageCounter() {
  const counter = document.querySelector(`#${currentProject} .image-counter`);
  if (counter && images[currentProject]) {
    counter.textContent = `Zdjęcie ${currentImageIndex + 1} z ${images[currentProject].length}`;
  }
}

// Aktualizacja stanu strzałek (aktywne/nieaktywne)
function updateArrows() {
  const prevButton = document.querySelector(`#${currentProject} .prev`);
  const nextButton = document.querySelector(`#${currentProject} .next`);

  if (currentImageIndex === 0) {
    prevButton.disabled = true; // Wyłącz przycisk "Poprzedni", jeśli jesteś na pierwszym zdjęciu
  } else {
    prevButton.disabled = false; // Włącz przycisk "Poprzedni"
  }

  if (currentImageIndex === images[currentProject].length - 1) {
    nextButton.disabled = true; // Wyłącz przycisk "Następny", jeśli jesteś na ostatnim zdjęciu
  } else {
    nextButton.disabled = false; // Włącz przycisk "Następny"
  }
}

// Dodanie zdarzeń do strzałek
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("prev")) {
    changeImage(-1);
  } else if (event.target.classList.contains("next")) {
    changeImage(1);
  } else if (event.target.classList.contains("close")) {
    closeGallery();
  }
});

// Dodanie zdarzeń do przycisków "Zobacz więcej"
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
        begin: function() {
        },
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
        container.isotope({
            filter: '*'
        }); // Ustawiamy domyślnie filtr na wszystko
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
            $(this).css({
                width: postWidth + 'px'
            });
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


});

wow = new WOW({
    animateClass: 'animated',
    offset: 100,
    mobile: true // Pozwala na animacje na urządzeniach mobilnych
});


wow.init();
document.getElementById('').onclick = function() {
    var section = document.createElement('section');
    section.className = 'wow fadeInDown';
    section.className = 'wow shake';
    section.className = 'wow zoomIn';
    section.className = 'wow lightSpeedIn';
    this.parentNode.insertBefore(section, this);
};
$(document).ready(function () {
  // Płynne przewijanie do sekcji kontaktu
  $("contact-link").on("click", function (event) {
      event.preventDefault();
      $("html, body").animate(
          {
              scrollTop: $("#contact").offset().top
          },
          1000
      );
  });

  // WOW.js – ręczne dodanie animacji do kontaktu
  $(window).on("scroll", function () {
      if ($(window).scrollTop() + $(window).height() > $("#contact").offset().top + 100) {
          $("#contact").addClass("animated fadeInUp");
      }
  });

  // Inicjalizacja WOW.js
  new WOW().init();
});
