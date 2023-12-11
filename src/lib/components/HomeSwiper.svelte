<script>
    import { onMount } from 'svelte';
    import { register } from 'swiper/element/bundle';

  
    let mySwiper;
    export let images;
    onMount(() => {

register();


const swiperEl = document.querySelector('swiper-container');

// swiper parameters
const swiperParams = {

slidesPerView: 1,
spaceBetween: 30,

navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
breakpoints: {
  768: {
    slidesPerView: 1,
  },
  1199: {
    slidesPerView: 2,
  },
  1400: {
    slidesPerView: 2,
  },
},
on: {
  init() {
    // ...
  },
},
};

// now we need to assign all parameters to Swiper element
Object.assign(swiperEl, swiperParams);

// and now initialize it
swiperEl.initialize();

});
  </script>
  
  <style>
    /* Add Swiper styles here */
  </style>
  
  <swiper-container init="false">
  
      {#each images as image}
        <swiper-slide>
          <img src={image.src} alt={image.alt} />
        </swiper-slide>
      {/each}
   
    </swiper-container>
  