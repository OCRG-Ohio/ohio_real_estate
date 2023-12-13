<script>
  //@ts-nocheck
  import { ArrowRightOutline } from 'flowbite-svelte-icons';
	import { onMount } from "svelte";

  import { register } from 'swiper/element/bundle';

  import { Navigation, Pagination } from 'swiper/modules';
  import PlainText from '$lib/components/PlainText.svelte';
  import RichText from '$lib/components/RichText.svelte';
  import { fetchJSON } from '$lib/util';
  import PrimaryButton from '$lib/components/PrimaryButton.svelte';
  import SecondaryButton from '$lib/components/SecondaryButton.svelte';
  import LoginMenu from '$lib/components/LoginMenu.svelte';
  import ArticleTeaser from '$lib/components/ArticleTeaser.svelte';
  import Testimonial from '$lib/components/Testimonial.svelte';
  import IntroStep from '$lib/components/IntroStep.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import bannerImage from '$lib/img/hero4.jpeg';
  import homeStats from '$lib/img/homeStats.jpg';
  import box1 from '$lib/img/box1.png';
  import box2 from '$lib/img/box2.png';
  import box3 from '$lib/img/box3.png';
  import homeCta from '$lib/img/home-cta.webp';
  import rendering from '$lib/img/building-vector.svg';
	import ohio_2 from "$lib/img/ohioCity_2.webp";

  import homeContactBg from '$lib/img/homeContact.jpg';
  import NotEditable from '$lib/components/NotEditable.svelte';
  import { currentUser, isEditing } from '$lib/stores.js';
  import WebsiteHeader from '$lib/components/WebsiteHeader.svelte';
  import { Card, Button, Toggle } from 'flowbite-svelte';
   import ContactForm from "$lib/components/ContactForm.svelte";
  export let data;
  import { GiftBoxSolid, ArrowUpRightFromSquareOutline,ShieldCheckOutline,ScaleBalancedOutline,ZoomInOutline } from 'flowbite-svelte-icons';

  let title,
    aboutUs, 
    aboutUs2,
    showUserMenu;

  function initOrReset() {
    $currentUser = data.currentUser;
    title = data.page?.title || 'We do it smart,';
    aboutUs = data.page?.aboutUs || 'Lorem Ipsum';
    aboutUs2 = data.page?.aboutUs2 || 'Lorem Ipsum2';
    $isEditing = false;
  }

  // --------------------------------------------------------------------------
  // Page logic
  // --------------------------------------------------------------------------

  function toggleEdit() {
    $isEditing = true;
    showUserMenu = false;
  }

  async function savePage() {
    try {
      // Only persist the start page when logged in as an admin
      if ($currentUser) {
        await fetchJSON('POST', '/api/save-page', {
          pageId: 'home',
          page: {
            title,
            aboutUs,
            aboutUs2,          
          }
        });
      }
      $isEditing = false;
    } catch (err) {
      console.error(err);
      alert('There was an error. Please try again.');
    }
  }

  initOrReset();


onMount(() => {

  register();
  

  const swiperEl = document.querySelector('swiper-container');

// swiper parameters
const swiperParams = {
   modules: [Navigation, Pagination],
  slidesPerView: 1,
  spaceBetween: 30,
  
  navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
  breakpoints: {
    768: {
      slidesPerView: 2,
    },
    1199: {
      slidesPerView: 3,
    },
    1400: {
      slidesPerView: 4,
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

<svelte:head>
  <title>Di Lusso Real Estate</title>
  <meta name="description" content="Real Estate and Concierge Services" />
  <link rel="alternate" hreflang="en" href="https://editable.website" />
  <link rel="canonical" href="https://editable.website" />
</svelte:head>

<WebsiteHeader bind:showUserMenu on:cancel={initOrReset} on:save={savePage}>
  <PrimaryButton on:click={toggleEdit}>Edit page</PrimaryButton>
  <LoginMenu />
</WebsiteHeader>

<!-- <div class="container-fluid heroSection p-0 flex items-center h-[50vh] md:h-screen" style="background: url({ohio_2}) top center no-repeat; background-size: cover;background-attachment: fixed;">
  <div class="container mx-auto">
  <div class="heroText relative mt-10 flex flex-col items-start">
  <h2 class="md:max-w-xl">
   <PlainText bind:content={title} />
   </h2>
    <p>Ohio Concierge Realty Group</p>
    
    <a href="home-valuation.html" class="tBtn2">Search Homes 
    </a>
  </div>
  
</div>

</div> -->
<!-- End Hero Section -->
<!-- <div class="container mx-auto">
	<div class="heroText mt-28 lg:max-w-2xl">
		<h1 class="">
			<PlainText bind:content={title} />
		</h1>
	</div>
</div> -->
<div class="container mx-auto block md:hidden mt-20">
  <h1>
    <PlainText bind:content={title} />
  </h1>
</div>
<div
	class="container-fluid heroSection home p-0 flex h-[50vh] md:h-[70vh] xl:h-screen items-center justify-center "
	style="background: url({ohio_2}) top center no-repeat; background-size: cover;background-attachment: fixed;">
<div class=" grid-cols-12 self-stretch md:grid hidden">
  <div class="heroText col-span-12 md:col-span-6 xl:col-span-5  flex flex-col justify-center items-start md:bg-white md:pl-12 xl:pl-20">
    <h1 class="md:max-w-lg lg:max-w-2xl 2xl:max-w-3xl xl:mr-16 text-primary-700">
      <PlainText bind:content={title} />
    </h1>
    <a href="/properties" class="tBtn2 tBtn2Alt mt-6">Property Search</a>    

  </div>
</div>
    
  
	
</div>

  <div class="container-fluid aboutUs" style="background: url({rendering}) top right no-repeat; background-size: contain;">   
    <div class="container mx-auto grid grid-cols-3 py-10 md:py-20 lg:py-28 2xl:py-32" >   
    <div class="aboutText col-span-3 md:col-span-2">
      <h2 class="small-title">We do it smart</h2>
      <RichText multiLine bind:content={aboutUs} />      
       <a href="/about" class="tBtn2 tBtn2Alt mt-6   md:mt-8">Learn More</a>    
    </div>
  </div>
</div>
  <div class="container-fluid ohioSlider homeSlider listingsSec img-100 py-12 md:py-20 lg:py-28 2xl:py-32 bg-accent md:px-16" >
    <div class="container mx-auto">
      <div class="aboutSlideHeader">
        <h2 class="small-title swiperTitle">Featured Properties</h2>
        <!-- <h3>Ohio Concierge Realty Group</h3> -->
      </div>
      <swiper-container  init="false">    
        <div slot="container-start" class="navWrapper">
          <div class="swiper-button-next">
            <i class="fa-solid fa-arrow-right"></i>   
           </div>
           <div class="swiper-button-prev">
             <i class="fa-solid fa-arrow-left"></i>
           </div>
        </div>  
          <swiper-slide>
            <div class="listingsBox shadow-md">
              <div class="listingsImage">
                <img src="https://picsum.photos/id/84/768/512">
                <div class="listingType">For Sale</div>
              </div>
              <div class="listingContent">
                <span class="price">$4,500,000</span>
                <p>456 Ipsum Avenue, Sit Amet City, FL 54321</p>
                <div class="listingInfo mt-3">
                  <span>5 Beds</span> -
                  <span>3 Baths</span> -
                  <span>4,200 Sq.Ft.</span>
                </div>
              </div>
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="listingsBox shadow-md">
              <div class="listingsImage">
                <img src="https://picsum.photos/id/43/768/512">
                <div class="listingType">For Sale</div>
              </div>
              <div class="listingContent">
                <span class="price">$5,999,000</span>
                <p>123 Dollar Ipsum Lane, Lorem Two, OH 12345</p>
                <div class="listingInfo mt-3">
                  <span>4 Beds</span> - <span>4 Baths</span> - <span>3,660 Sq.Ft.</span>
                </div>
              </div>
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="listingsBox shadow-md">
              <div class="listingsImage">
                <img src="https://picsum.photos/id/122/768/512">
                <div class="listingType">For Sale</div>
              </div>
              <div class="listingContent">
                <span class="price">$3,200,000</span>
                <p>789 Sit Avenue, Dolor Ipsum, TX 98765</p>
                <div class="listingInfo mt-3">
                  <span>3 Beds</span> -
                  <span>2 Baths</span> -
                  <span>2,000 Sq.Ft.</span>
                </div>
              </div>
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="listingsBox">
              <div class="listingsImage">
                <img src="https://picsum.photos/id/84/768/512">
                <div class="listingType">For Sale</div>
              </div>
              <div class="listingContent">
                <span class="price">$2,750,000</span>
                <p>987 Ipsum Street, Consectetur City, IL 34567</p>
                <div class="listingInfo mt-3">
                  <span>6 Beds</span> -
                  <span>5 Baths</span> -
                  <span>5,000 Sq.Ft.</span>
                </div>
              </div>
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="listingsBox">
              <div class="listingsImage">
                <img src="https://picsum.photos/id/43/768/512">
                <div class="listingType">For Sale</div>
              </div>
              <div class="listingContent">
                <span class="price">$3,850,000</span>
                <p>321 Amet Street, Adipiscing City, WA 56789</p>
                <div class="listingInfo mt-3">
                  <span>4 Beds</span> -
                  <span>3 Baths</span> -
                  <span>3,200 Sq.Ft.</span>
                </div>
              </div>
            </div>
          </swiper-slide>    
      
      </swiper-container>
    <a href="/properties" class="tBtn2 tBtn2Alt mt-6">View All</a>    

    </div>
  </div>


  <!-- ======= Services Section ======= -->
  <section class="services  py-12 md:py-20 lg:py-28 2xl:py-32 lg:pl-16" >
    <div class="container mx-auto" data-aos="fade-up">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 lg:gap-30 xl:gap-44">
        <div class="col-sapn-1 md:col-span-2">
          <h2 class="small-title">We make it simple</h2>
          <p>Nunc vel nunc elit. Phasellus dictum elit sit amet sem maximus rutrum. Pellentesque a sem pulvinar, pretium mauris sit amet, faucibus nunc. Nam a tellus sollicitudin enim consequat convallis. Suspendisse sit amet sapien posuere, volutpat quam hendrerit, suscipit tellus.</p>
        </div>
        <div class="col-sapn-1 md:col-span-1">
          <ul class="max-w-md space-y-1 md:space-y-2  text-gray-800 list-inside">
            <li class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M4.5 12.75a.75.75 0 0 1 .75-.75h13.5a.75.75 0 0 1 0 1.5H5.25a.75.75 0 0 1-.75-.75"/></svg>
                 New Construction
            </li>
            <li class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M4.5 12.75a.75.75 0 0 1 .75-.75h13.5a.75.75 0 0 1 0 1.5H5.25a.75.75 0 0 1-.75-.75"/></svg>
                 Remodeling & Renovation
            </li>
            <li class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M4.5 12.75a.75.75 0 0 1 .75-.75h13.5a.75.75 0 0 1 0 1.5H5.25a.75.75 0 0 1-.75-.75"/></svg>
                 Design Services
            </li>
            <li class="flex items-center">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M4.5 12.75a.75.75 0 0 1 .75-.75h13.5a.75.75 0 0 1 0 1.5H5.25a.75.75 0 0 1-.75-.75"/></svg>
                 Project Management
            </li>
            <li class="flex items-center">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M4.5 12.75a.75.75 0 0 1 .75-.75h13.5a.75.75 0 0 1 0 1.5H5.25a.75.75 0 0 1-.75-.75"/></svg>
                 No Hassle Payment Process
            </li>
            
        </ul>
          
        </div>
      </div>
    </div>
    </section>
  <section class="services pb-12 md:pb-16 lg:pb-20 2xl:pb-24 lg:px-16">
    <div class="container mx-auto" >

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 pb-4">
     
        <div class="rounded-lg shadow p-6 relative isolate border hover:border-primary-700" style="background: url({box1}) top right no-repeat; background-size: contain;">
          <ZoomInOutline class="w-7 h-7 mb-3 text-gray-600 dark:text-gray-400" strokeWidth="1"/>
          <a href="/">
            <h5 class="mb-2 text-xl lg:text-2xl  tracking-tight text-myBlue dark:text-white">Property Search</h5>
          </a>
          <p class="mb-3  text-gray-600 dark:text-gray-400">Ut autem aut autem non a. Sint sint sit facilis nam iusto sint. Libero corrupti neque eum hic non
            ut nesciunt dolorem.</p>
            <a href="/properties" class="tBtn2 tBtn2Alt mt-6 border-myBlue">Learn More</a>

          </div>
        <div class="text-gray-600  rounded-lg border hover:border-primary-700 shadow  p-6 isolate" style="background: url({box2}) top right no-repeat; background-size: contain;">
          <ScaleBalancedOutline class="w-7 h-7 mb-3 text-gray-600 dark:text-gray-400" strokeWidth="1"/>
          <a href="/">
            <h5 class="mb-2 text-xl lg:text-2xl tracking-tight text-myBlue dark:text-white">Property Valuation</h5>
          </a>
          <p class="mb-3  text-gray-600 dark:text-gray-400">Ut autem aut autem non a. Sint sint sit facilis nam iusto sint. Libero corrupti neque eum hic non
            ut nesciunt dolorem.</p>
            <a href="/valuation" class="tBtn2 tBtn2Alt mt-6 border-myBlue">Learn More</a>

          </div>
        <div class="text-gray-600  rounded-lg border hover:border-primary-700 shadow p-6 isolate" style="background: url({box3}) top left no-repeat; background-size: contain;">
          <ShieldCheckOutline class="w-7 h-7 mb-3 text-gray-600 dark:text-gray-400" strokeWidth="1" />
          <a href="/">
            <h5 class="mb-2 text-xl lg:text-2xl  tracking-tight text-myBlue dark:text-white">Concerage Services</h5>
          </a>
          <p class="mb-3  text-gray-600 dark:text-gray-400">Ut autem aut autem non a. Sint sint sit facilis nam iusto sint. Libero corrupti neque eum hic non
            ut nesciunt dolorem.</p>
            <a href="/concierge" class="tBtn2 tBtn2Alt mt-6 border-myBlue">Learn More</a>

          </div>
     
     
      </div>

    </div>
  </section><!-- End Services Section -->

  <!-- ======= Call To Action Section ======= -->
    <div
    class="container-fluid callToAction aboutCta py-20 flex items-center justify-center"
    style="background: url({homeCta}) center center no-repeat; background-size: cover; ">
    <div
      class="container mx-auto relative z-10 flex items-center justify-end">
      <ContactForm />
     
    </div>
  </div>



