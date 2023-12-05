<script>
 
	import team1 from "$lib/img/team-1.jpg";
	import team2 from "$lib/img/team-4.jpg";
	import ohio_1 from "$lib/img/ohioCity_1.webp";
	import ohio_2 from "$lib/img/ohioCity_2.webp";
	import white_2 from "$lib/img/whiteBuilding.webp";
	
    import { AccordionItem, Accordion } from 'flowbite-svelte';
    import { fetchJSON } from '$lib/util';

    import { onMount } from "svelte";

    import PlainText from '$lib/components/PlainText.svelte';
  import RichText from '$lib/components/RichText.svelte';

  import PrimaryButton from '$lib/components/PrimaryButton.svelte';

  import LoginMenu from '$lib/components/LoginMenu.svelte';

  import bannerImage from '$lib/img/hero4.jpeg';
 
  import rendering from '$lib/img/building-vector.svg';
  import homeContactBg from '$lib/img/homeContact.jpg';
  import NotEditable from '$lib/components/NotEditable.svelte';
  import { currentUser, isEditing } from '$lib/stores.js';
  import WebsiteHeader from '$lib/components/WebsiteHeader.svelte';
  import { Card, Button, Toggle } from 'flowbite-svelte';
  export let data; 

  let title,
    aboutUs, 
    aboutTeam,
    ourStory,
    showUserMenu;

  function initOrReset() {
    $currentUser = data.currentUser;
    title = data.page?.title || 'We do it smart,';
    aboutUs = data.page?.aboutUs || 'Lorem Ipsum';
    aboutTeam = data.page?.aboutTeam || 'Lorem Ipsum Team';
    ourStory = data.page?.ourStory || 'Lorem Ipsum Team Story';
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
          pageId: 'about',
          page: {
            title,
            aboutUs, 
            aboutTeam ,
            ourStory       
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



</script>
<svelte:head>
  <title>About Us</title>
  <meta name="description" content="Make changes to your website while browsing it." />
  <link rel="alternate" hreflang="en" href="https://editable.website" />
  <link rel="canonical" href="https://editable.website" />
</svelte:head>

<WebsiteHeader bind:showUserMenu on:cancel={initOrReset} on:save={savePage}>
  <PrimaryButton on:click={toggleEdit}>Edit page</PrimaryButton>
  <LoginMenu />
</WebsiteHeader>

<div class="container-fluid heroSection p-0 flex items-center h-[50vh] md:h-screen" style="background: url({ohio_1}) top center no-repeat; background-size: cover;background-attachment: fixed;">
    <div class="container mx-auto">
    <div class="heroText relative mt-10 flex flex-col items-start">
    <h2 class="md:max-w-4xl">
     <PlainText bind:content={title} />
     </h2>
    
      
      
    </div>
    
  </div>
  
  </div>
  <!-- End Hero Section -->
  
  
    <div class="container-fluid aboutUs" style="background: url({rendering}) top right no-repeat; background-size: contain;">   
      <div class="container mx-auto grid grid-cols-3 py-16 md:py-28" >   
      <div class="aboutText col-span-3 md:col-span-2">
       
        <RichText multiLine bind:content={aboutUs} />
        
      <a href="/about" class="tBtn2 tBtn2Alt md:mt-14">Learn More</a>
      
      </div>
    </div>
  </div>
  <div class="isolate bg-accent">
    <div class="diffSec container  mx-auto py-16 md:py-24 lg:py-32 2xl:py-36 max-w-3xl relative ">
        <h2 class="small-title text-center mb-8">Our core values</h2>
        <Accordion class="shadow-md" activeClass="font-light bg-primary-50 text-blue-600 focus:ring-0" inactiveClass="font-light bg-white dark:text-gray-400 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-gray-800">
            <AccordionItem open>
              <span slot="header">Expertise</span>
              <p class="mb-2 text-grey-500 ">Our team comprises experienced professionals with in-depth knowledge of the commercial,
                residential, and investment real estate sectors. We stay ahead of market trends,
                providing our clients with invaluable insights to make informed decisions.</p>
            </AccordionItem>
            <AccordionItem>
              <span slot="header">Global Reach</span>
              <p class="mb-2 text-grey-500">At Ohio Concierge Realty Group caters to clients both within the country and worldwide.
                Whether you are a local buyer or seller, a global investor, or a business seeking to buy
                or sell commercial properties, we have the expertise to guide you.</p>
            </AccordionItem>
            <AccordionItem>
              <span slot="header">Personalized Service</span>
              <p class="mb-2 text-grey-500">We understand that no two clients are the same. That's why we take the time to
                understand your unique objectives and tailor our services to meet your needs.
                Cutting-Edge Technology: Ohio Concierge Realty Group leverages the latest technology and
                data analytics to streamline the real estate process, making it more efficient and
                convenient for you.</p>
            </AccordionItem>
            <AccordionItem>
              <span slot="header">Our Commitment</span>
              <p class="mb-2 text-grey-500">Our core values of integrity, transparency, professionalism, and a dedication to client
                success guide everything we do. Whether you're searching for the perfect home, seeking
                to make a sound investment, or require assistance with commercial real estate, Ohio
                Concierge Realty Group, is your trusted partner from start to finish.</p>
            </AccordionItem>      
          </Accordion>
      </div>
  </div>







<div class="container-fluid aboutPage py-16 md:py-24 lg:py-32 2xl:py-36">
	<div class="container mx-auto">
        <div class="grid grid-cols-4">
            <div class="aboutText col-span-3 md:col-span-2">
                
                <RichText multiLine bind:content={aboutTeam} />               
                 
              
              </div>
        </div>
		
	</div>
	<div class="teamSec mt-16 text-white">
		<div class="flexItem">
			<img src={team1} />
			<div class="teamText ">
				<h3>Maecenas Mollis</h3>
				<p>Nullam</p>
			</div>
		</div>
		<div class="flexItem">
			<img src={team2} />
			<div class="teamText">
				<h3>Sed Tristique</h3>
				<p>Vestibulum</p>
			</div>
		</div>
		<div class="flexItem bg-gray">
			<div class="flexText">
				<p class="text-primary-700">Interested to work in real estate?</p>
				
                <a href="/about" class="tBtn2 tBtn2Alt  mt-8 md:mt-14">Apply here</a>
			</div>
		</div>
	</div>	
</div>
<div class="container-fluid callToAction aboutCta h-screen flex items-center" style="background: url({white_2}) top left no-repeat; background-size: cover;background-attachment:fixed;"> 
    <div class="container mx-auto flex flex-wrap items-center gap-16 lg:gap-24 xl:gap-32 relative z-10">
        <div class="aboutText flex-1 md:col-span-2">
            
            <RichText multiLine bind:content={ourStory} />               
             
          
          </div>

          <div class=" ctaText shadow-md">
            <a href="#">
              <h2 class="title title-2">We always want to go a step further</h2>
              <p class="texte-c contenu widowFix">That's why we take the time to find the solutions that meet
                your needs
              </p>
             
              <a href="/about" class="tBtn2 tBtn2Alt mt-6 border-myBlue">Let's go further</a>
      
            </a>
          </div>
    </div>
  
  </div>
