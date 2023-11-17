new Swiper(".mySwiper", {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 32,
    navigation: {
      nextEl: ".slider-next",
      prevEl: ".slider-prev",
    },
    breakpoints: {
      1600: {
        spaceBetween: 32,
        slidesPerView: 2,
      },
      1279: {
        slidesPerView: 1,
      },
      770: {
        spaceBetween: 32,
        slidesPerView: 2,
      },
  },
  autoplay: {
      delay: 3000,
      disableOnInteraction: true,
  },
  on: {
  init: function () {
      this.el.addEventListener('mouseover', function () {
      this.autoplay.stop();
      }.bind(this));
      this.el.addEventListener('mouseout', function () {
      this.autoplay.start();
      }.bind(this));
  }
  },
});

// lazy Loading

const lazyImages = document.querySelectorAll('img[data-src]');
const windowHeight = document.documentElement.clientHeight;

let lazyImagesPositions = [];
//собрать все положения сверху
if(lazyImages.length > 0) {
  lazyImages.forEach(img => {
    if (img.dataset.src || img.dataset.srcset) {
      lazyImagesPositions.push(img.getBoundingClientRect().top + scrollY);
      lazyScrollSheck();
    }
  });
}
window.addEventListener('scroll', lazyScroll);

function lazyScroll() {
  if(document.querySelectorAll('img[data-src]').length > 0) {
    lazyScrollSheck();
  }
}

function lazyScrollSheck() {
  let imgIndex = lazyImagesPositions.findIndex(
    item => scrollY > item - windowHeight
  );
  if (imgIndex >= 0) {
    if(lazyImages[imgIndex].dataset.src) {
      lazyImages[imgIndex].src = lazyImages[imgIndex].dataset.src;
      lazyImages[imgIndex].removeAttribute('data-src');
    } else if (lazyImages[imgIndex].dataset.srcset) {
      lazyImages[imgIndex].srcset = lazyImages[imgIndex].dataset.src;
      lazyImages[imgIndex].removeAttribute('data-srcset');
    }
    delete lazyImagesPositions[imgIndex];
  }
}

// Показать еще
const showMore = document.querySelector('.btn-download');
const cards = document.querySelectorAll('.card__wrapper-item').length;

let items = 6;

showMore.addEventListener('click', () => {
  items += 6;
  const array = Array.from(document.querySelector('.card__wrapper').children);
  const visItems = array.slice(0 , items);

  visItems.forEach(el => el.classList.add('is-visible'));

  if(visItems.length === cards) {
    showMore.style.display = 'none';
  }
})