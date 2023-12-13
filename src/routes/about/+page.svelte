<script>
	import team1 from "$lib/img/team-1.jpg";
	import team2 from "$lib/img/team-4.jpg";
	import ohio_1 from "$lib/img/ohioCity_1.webp";
	import ohio_2 from "$lib/img/ohioCity_2.webp";
	import white_2 from "$lib/img/whiteBuilding.webp";

	import { AccordionItem, Accordion } from "flowbite-svelte";
	import { fetchJSON } from "$lib/util";

	import { onMount } from "svelte";

	import PlainText from "$lib/components/PlainText.svelte";
	import RichText from "$lib/components/RichText.svelte";

	import PrimaryButton from "$lib/components/PrimaryButton.svelte";

	import LoginMenu from "$lib/components/LoginMenu.svelte";


	import heroThumb from "$lib/img/doorPurple.webp";

	import rendering from "$lib/img/building-vector.svg";
	import homeContactBg from "$lib/img/homeContact.jpg";
	import NotEditable from "$lib/components/NotEditable.svelte";
	import { currentUser, isEditing } from "$lib/stores.js";
	import WebsiteHeader from "$lib/components/WebsiteHeader.svelte";
	import { Card, Button, Toggle, Label, Input, Textarea } from "flowbite-svelte";



	import toast from "svelte-french-toast";
	import ContactForm from "$lib/components/ContactForm.svelte";
	import DropItem from "$lib/components/DropItem.svelte";
	let activeTab = 1;

	export let data;
	export let form;

	let title, aboutUs, aboutTeam, ourStory, drop1,drop2,drop3,drop4, showUserMenu;

	function initOrReset() {
		$currentUser = data.currentUser;
		title = data.page?.title || "We do it smart,";
		aboutUs = data.page?.aboutUs || "Lorem Ipsum";
		aboutTeam = data.page?.aboutTeam || "Lorem Ipsum Team";
		ourStory = data.page?.ourStory || "Lorem Ipsum Team Story";
		drop1 = JSON.parse(
      JSON.stringify(
        data.page?.drop1 || {
       
          title: 'Experties',
          detail: 'Our team comprises experienced professionals with in-depth knowledge of the commercial, residential, and investment real estate sectors. We stay ahead of market trends, providing our clients with invaluable insights to make informed decisions.'
        }
      )
    );
		drop2 = JSON.parse(
      JSON.stringify(
        data.page?.drop2 || {
       
          title: 'Global Reach',
          detail: 'Our team comprises experienced professionals with in-depth knowledge of the commercial, residential, and investment real estate sectors. We stay ahead of market trends, providing our clients with invaluable insights to make informed decisions.'
        }
      )
    );
		drop3 = JSON.parse(
      JSON.stringify(
        data.page?.drop3 || {
       
          title: 'Personalized Service',
          detail: 'Our team comprises experienced professionals with in-depth knowledge of the commercial, residential, and investment real estate sectors. We stay ahead of market trends, providing our clients with invaluable insights to make informed decisions.'
        }
      )
    );
		drop4 = JSON.parse(
      JSON.stringify(
        data.page?.drop4 || {
       
          title: 'Our Commitment',
          detail: 'Our team comprises experienced professionals with in-depth knowledge of the commercial, residential, and investment real estate sectors. We stay ahead of market trends, providing our clients with invaluable insights to make informed decisions.'
        }
      )
    );
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
				await fetchJSON("POST", "/api/save-page", {
					pageId: "about",
					page: {
						title,
						aboutUs,
						aboutTeam,
						ourStory,
						drop1,
						drop2,
						drop3,
						drop4,
					}
				});
			}
			$isEditing = false;
		} catch (err) {
			console.error(err);
			alert("There was an error. Please try again.");
		}
	}

	initOrReset();
</script>

<svelte:head>
	<title>About Us</title>
	<meta name="description" content="Real Estate and Concierge Services" />
	<link rel="alternate" hreflang="en" href="https://editable.website" />
	<link rel="canonical" href="https://editable.website" />
</svelte:head>

<WebsiteHeader bind:showUserMenu on:cancel={initOrReset} on:save={savePage}>
	<PrimaryButton on:click={toggleEdit}>Edit page</PrimaryButton>
	<LoginMenu />
</WebsiteHeader>
<div class="container mx-auto">
	<div class="heroText mt-24 md:mt-32  lg:max-w-2xl xl:max-w-3xl">
		<h1 class="">
			<PlainText bind:content={title} />
		</h1>
	</div>
</div>
<div
	class="container-fluid heroSection about p-0 flex items-end h-[400px] md:h-[420px] lg:h-[480px] xl:h-[500px] 2xl:h-[650px]"
	style="background: url({ohio_1}) top center no-repeat; background-size: cover;background-attachment: fixed;">
	<div class="heroThumb border-8 border-white shadow-md">
		<img src={heroThumb} alt="" />
	</div>
</div>
<!-- End Hero Section -->

<div
	class="container-fluid aboutUs my-16 sm:my-20 md:my-24 xl:mt-40 2xl:mt-56"
	style="background: url({rendering}) top right no-repeat; background-size: contain;background-attachment:fixed;">
	<div class="container mx-auto grid grid-cols-4  ">
		
		<div class="aboutText col-span-4 md:col-span-3">
			<RichText multiLine bind:content={aboutUs} />

			<!-- <a href="/concierge" class="tBtn2 tBtn2Alt mt-6 md:mt-8">Our Services</a> -->
		</div>
	</div>
</div>
<div class="isolate bg-accent">
	<div class="diffSec container mx-auto py-16 md:py-24 lg:py-32 2xl:py-36 max-w-3xl relative">
		<h2 class="small-title text-center mb-6">Our core values</h2>
		<Accordion
			class="shadow-md"
			activeClass="text-sm bg-primary-700 text-white focus:ring-0 text-lg font-light m-0"
			inactiveClass="font-light bg-white text-lg font-light m-o  hover:bg-white">
		<DropItem bind:drop={drop1} open={activeTab === 1}/>
		<DropItem bind:drop={drop2} open={activeTab === 2}/>
		<DropItem bind:drop={drop3} open={activeTab === 3}/>
		<DropItem bind:drop={drop4} open={activeTab === 4}/>
		

			
		</Accordion>
	</div>
</div>

<div class="container-fluid aboutPage pt-16 md:pt-24 lg:pt-32 2xl:pt-36">
	<div class="container mx-auto">
		<div class="grid grid-cols-4">
			<div class="aboutText col-span-4 md:col-span-3">
				<RichText multiLine bind:content={aboutTeam} />

		
			</div>
		</div>
	</div>
	<div class="teamSec mt-16 text-white">
		<div class="flexItem">
			<img src={team1} />
			<div class="teamText">
				<h3>Maecenas Mollis</h3>
				<p class="text-white">Nullam</p>
				<a class="text-white text-base block" href="#">loremipsum@mail.com</a>
				<a class="text-white text-base block">(123) 456-789-1155</a>
			</div>
		</div>
		<div class="flexItem">
			<img src={team2} />
			<div class="teamText">
				<h3>Sed Tristique</h3>
				<p class="text-white">Vestibulum</p>
				<a class="text-white text-base block" href="#">loremipsum@mail.com</a>
				<a class="text-white text-base block">(123) 456-789-1155</a>
			</div>
		</div>
		<div class="flexItem bg-accent self-stretch max-w-sm max-auto py-6 sm:py-">
			<div class="flexText">
				<h3 class="text-primary-700 font-md">Interested in working with us?</h3>

				<a href="/about" class="tBtn2 tBtn2Alt mt-8 mt-8 md:mt-14">Apply here</a>
			</div>
		</div>
	</div>
<div class="container mx-auto grid grid-cols-4 py-16 md:py-24 lg:py-32 2xl:py-36">
	<div class="aboutText col-span-4 md:col-span-3">
		<RichText multiLine bind:content={ourStory} />
	</div>
</div>
	
</div>
<div
	class="container-fluid callToAction aboutCta py-20 flex items-center bg-fixed bg-cover cover"
	style="background: url({white_2}) center center no-repeat; ">
	<div
		class="container mx-auto relative z-10">
		<!-- <div class="aboutText flex-1 md:col-span-2">
			<RichText multiLine bind:content={ourStory} />
		</div> -->

		
		<ContactForm />
	
	</div>
</div>
