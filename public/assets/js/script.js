AOS.init();
function toggleActive(ID,CLASS){
  document.getElementById(ID).classList.toggle(CLASS);
}
function removeActive(ID,CLASS){
  document.getElementById(ID).classList.remove(CLASS);
}
function addActive(ID,CLASS){
  document.getElementById(ID).classList.add(CLASS);
}
function removeAdd(ID,CLASS1,CLASS2){
  document.getElementById(ID).classList.remove(CLASS1);
  document.getElementById(ID).classList.add(CLASS2);
}

var swiper = new Swiper(".mySwiper1", {
  slidesPerView: 1,
  spaceBetween: 10,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    640: {
      slidesPerView: 1,
      spaceBetween: 15,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 40,
    },
  },
});

var swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  spaceBetween: 30,
  navigation: {
    nextEl: '.next',
    prevEl: '.prev',
  },
  breakpoints: {
    640: {
      slidesPerView: 1.5,
      spaceBetween: 15,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 15,
    },
    1024: {
      slidesPerView: 2,
      spaceBetween: 24,
    },
    1440: {
      slidesPerView: 2.5,
      spaceBetween: 24,
    },
  },
});

var swiper = new Swiper(".ourWork-swiper", {
  slidesPerView: 1,
  spaceBetween: 30,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".next",
    prevEl: ".prev",
  },
  breakpoints: {
    640: {
      slidesPerView: 2,
      spaceBetween: 15,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 15,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 25,
    },
  },
});

var swiper = new Swiper(".mySwiper2", {
  slidesPerView: 1,
  spaceBetween: 30,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  autoplay:{
    reverseDirection:false,
  },
  navigation: {
    nextEl: ".next",
    prevEl: ".prev",
  },
  breakpoints: {
    640: {
      slidesPerView: 1,
      spaceBetween: 15,
    },
    768: {
      slidesPerView: 32,
      spaceBetween: 30,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
  },
});

var swiper = new Swiper(".mySwiper3", {
  slidesPerView: 1,
  spaceBetween: 30,
  loop:true,
  autoplay:{
    delay: 2500,
    reverseDirection:false,
  },
});

// Slider Image
const container = document.querySelector('.container');
document.querySelector('.slider').addEventListener('input', (e) => {
  container.style.setProperty('--position', `${e.target.value}%`);
});

// Slider change Images

function AfterBefore(Services,index){
  if(Services == house_cliening){
    if(index >= 4){
      document.querySelector('.image-before').src = houseCleaningAfterImagesArr[index];
      document.querySelector('.image-after').src = houseCleaningBeforeImagesArr[index];
    }
  }
}

var houseServices1 = 'assets/images/service-before.webp';
var houseServices2 = 'assets/images/service-after.webp';
var roofWashing1 = 'assets/images/roofWashing2.webp';
var roofWashing2 = 'assets/images/roofWashing1.webp';
var Outdoor1 = 'assets/images/garden1.webp';
var Outdoor2 = 'assets/images/garden2.webp';
var deckWashi1 = 'assets/images/dackWash2.webp';
var deckWashi2 = 'assets/images/deckWash1.webp';

function changeImage(services,index){
  // console.log(132);
  if(services == house_cliening){
    if(index >= 4){
      document.querySelector('.image-before').src = houseCleaningAfterImagesArr[index];
      document.querySelector('.image-after').src = houseCleaningBeforeImagesArr[index];
    }
  }
}
document.getElementById('outdoor_cliening').addEventListener('click', function(){
  changeImage("outdoor_cliening");
});
document.getElementById('house_cliening').addEventListener('click', function(){
  changeImage("house_cliening");
});
document.getElementById('roof_washing').addEventListener('click', function(){
  changeImage("roof_washing");
});
document.getElementById('deckWashing').addEventListener('click', function(){
  changeImage("deckWashing");
});