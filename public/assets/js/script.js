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
  navigation: {
    nextEl: '.next',
    prevEl: '.prev',
  },
  breakpoints: {
    425: {
      slidesPerView: 2,
      spaceBetween: 15,
    },
    640: {
      slidesPerView: 3,
      spaceBetween: 15,
    },
    1440: {
      slidesPerView: 4,
      spaceBetween: 24,
    },
  },
});
var swiper = new Swiper(".mySwiper2", {
  slidesPerView: 1,
  spaceBetween: 30,
  loop:true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  autoplay:{
    reverseDirection:true,
  },
  navigation: {
    nextEl: '.next',
    prevEl: '.prev',
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
var swiper = new Swiper(".mySwiper3", {
  slidesPerView: 1,
  spaceBetween: 30,
  loop:true,
  // pagination: {
  //   el: ".swiper-pagination",
  //   clickable: true,
  // },
  autoplay:{
    reverseDirection:true,
  },
  // navigation: {
  //   nextEl: '.next',
  //   prevEl: '.prev',
  // },
  // breakpoints: {
  //   640: {
  //     slidesPerView: 1,
  //     spaceBetween: 15,
  //   },
  //   768: {
  //     slidesPerView: 2,
  //     spaceBetween: 30,
  //   },
  //   1024: {
  //     slidesPerView: 3,
  //     spaceBetween: 40,
  //   },
  // },
});

// Slider Image
const container = document.querySelector('.container');
document.querySelector('.slider').addEventListener('input', (e) => {
  container.style.setProperty('--position', `${e.target.value}%`);
})

// Slider change Images
var houseCleaningAfterImagesArr = ['assets/images/service-after.jpg','assets/images/roofWashing1.jpg']
var houseCleaningBeforeImagesArr = ['assets/images/service-before.jpg','assets/images/roofWashing2.jpg',]
var fenceafterImagesArr = ['assets/images/service-before.jpg','assets/images/service-after.jpg','assets/images/roofWashing2.jpg','assets/images/roofWashing1.jpg']
var fenceBeforeImagesArr = ['assets/images/service-before.jpg','assets/images/service-after.jpg','assets/images/roofWashing2.jpg','assets/images/roofWashing1.jpg']

function AfterBefore(Services,index){
  if(Services == house_cliening){
    if(index >= 4){
      document.querySelector('.image-before').src = houseCleaningAfterImagesArr[index];
      document.querySelector('.image-after').src = houseCleaningBeforeImagesArr[index];
    }
  }
}


var houseServices1 = 'assets/images/service-before.jpg';
var houseServices2 = 'assets/images/service-after.jpg';
var roofWashing1 = 'assets/images/roofWashing2.jpg';
var roofWashing2 = 'assets/images/roofWashing1.jpg';
var Outdoor1 = 'assets/images/garden1.jpeg';
var Outdoor2 = 'assets/images/garden2.jpeg';
var deckWashi1 = 'assets/images/dackWash2.png';
var deckWashi2 = 'assets/images/deckWash1.png';

function changeImage(services,index){
  // console.log(132);
  if(services == house_cliening){
    if(index >= 4){
      document.querySelector('.image-before').src = houseCleaningAfterImagesArr[index];
      document.querySelector('.image-after').src = houseCleaningBeforeImagesArr[index];
    }
  }
  // if(services == "outdoor_cliening"){
  //   document.querySelector('.image-before').src = Outdoor1;  
  //   document.querySelector('.image-after').src = Outdoor2;  
  // }else if(services == "house_cliening"){
  //   document.querySelector('.image-before').src = houseServices1;  
  //   document.querySelector('.image-after').src = houseServices2;  
  // }else if(services == "roof_washing"){
  //   document.querySelector('.image-before').src = roofWashing1;  
  //   document.querySelector('.image-after').src = roofWashing2;  
  // } else if(services == "deckWashing"){
  //   document.querySelector('.image-before').src = deckWashi1;  
  //   document.querySelector('.image-after').src = deckWashi2;  
  // }
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
})