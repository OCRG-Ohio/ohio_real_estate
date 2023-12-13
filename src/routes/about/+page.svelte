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


	import heroThumb from "$lib/img/heroThumb.webp";

	import rendering from "$lib/img/building-vector.svg";
	import homeContactBg from "$lib/img/homeContact.jpg";
	import NotEditable from "$lib/components/NotEditable.svelte";
	import { currentUser, isEditing } from "$lib/stores.js";
	import WebsiteHeader from "$lib/components/WebsiteHeader.svelte";
	import { Card, Button, Toggle, Label, Input, Textarea } from "flowbite-svelte";



	import toast from "svelte-french-toast";
	import ContactForm from "$lib/components/ContactForm.svelte";

	export let data;
	export let form;

	let title, aboutUs, aboutTeam, ourStory, showUserMenu;

	function initOrReset() {
		$currentUser = data.currentUser;
		title = data.page?.title || "We do it smart,";
		aboutUs = data.page?.aboutUs || "Lorem Ipsum";
		aboutTeam = data.page?.aboutTeam || "Lorem Ipsum Team";
		ourStory = data.page?.ourStory || "Lorem Ipsum Team Story";
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
						ourStory
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
			<AccordionItem open>
				<span slot="header">Expertise</span>
				<p class="mb-2 text-dark">
					Our team comprises experienced professionals with in-depth knowledge of the commercial,
					residential, and investment real estate sectors. We stay ahead of market trends, providing
					our clients with invaluable insights to make informed decisions.
				</p>
			</AccordionItem>
			<AccordionItem>
				<span slot="header">Global Reach</span>
				<p class="mb-2 text-dark">
					At Ohio Concierge Realty Group caters to clients both within the country and worldwide.
					Whether you are a local buyer or seller, a global investor, or a business seeking to buy
					or sell commercial properties, we have the expertise to guide you.
				</p>
			</AccordionItem>
			<AccordionItem>
				<span slot="header">Personalized Service</span>
				<p class="mb-2 text-dark">
					We understand that no two clients are the same. That's why we take the time to understand
					your unique objectives and tailor our services to meet your needs. Cutting-Edge
					Technology: Ohio Concierge Realty Group leverages the latest technology and data analytics
					to streamline the real estate process, making it more efficient and convenient for you.
				</p>
			</AccordionItem>
			<AccordionItem>
				<span slot="header">Our Commitment</span>
				<p class="mb-2 text-dark">
					Our core values of integrity, transparency, professionalism, and a dedication to client
					success guide everything we do. Whether you're searching for the perfect home, seeking to
					make a sound investment, or require assistance with commercial real estate, Ohio Concierge
					Realty Group, is your trusted partner from start to finish.
				</p>
			</AccordionItem>
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
