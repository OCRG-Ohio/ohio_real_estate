<script>
	//@ts-nocheck
	import { ArrowRightOutline } from "flowbite-svelte-icons";
	import { onMount } from "svelte";

	import { register } from "swiper/element/bundle";

	import { Navigation, Pagination } from "swiper/modules";
	import PlainText from "$lib/components/PlainText.svelte";
	import RichText from "$lib/components/RichText.svelte";
	import { fetchJSON } from "$lib/util";
	import PrimaryButton from "$lib/components/PrimaryButton.svelte";
	import SecondaryButton from "$lib/components/SecondaryButton.svelte";
	import LoginMenu from "$lib/components/LoginMenu.svelte";
	import ArticleTeaser from "$lib/components/ArticleTeaser.svelte";
	import Testimonial from "$lib/components/Testimonial.svelte";
	import IntroStep from "$lib/components/IntroStep.svelte";
	import Footer from "$lib/components/Footer.svelte";
	import bannerImage from "$lib/img/hero4.jpeg";
	import homeStats from "$lib/img/homeStats.jpg";
	import box1 from "$lib/img/flowerhouse.webp";
	import box2 from "$lib/img/homesearch.webp";
	import box3 from "$lib/img/moderninterior2.webp";
	import homeCta from "$lib/img/home-cta.webp";
	import rendering from "$lib/img/building-vector.svg";
	import ohio_2 from "$lib/img/ohioCity_2.webp";
	import aboutThumb from "$lib/img/aboutUs.webp";

	import homeContactBg from "$lib/img/homeContact.jpg";
	import NotEditable from "$lib/components/NotEditable.svelte";
	import { currentUser, isEditing } from "$lib/stores.js";
	import WebsiteHeader from "$lib/components/WebsiteHeader.svelte";
	import { Card, Button, Toggle } from "flowbite-svelte";
	import ContactForm from "$lib/components/ContactForm.svelte";
	export let data;
	import {
		GiftBoxSolid,
		ArrowUpRightFromSquareOutline,
		ShieldCheckOutline,
		ScaleBalancedOutline,
		ZoomInOutline
	} from "flowbite-svelte-icons";

	let title, aboutUs, aboutUs2, serviceBox1, serviceBox2, serviceBox3, showUserMenu;

	function initOrReset() {
		$currentUser = data.currentUser;
		title = data.page?.title || "We do it smart,";
		aboutUs = data.page?.aboutUs || "Lorem Ipsum";
		aboutUs2 = data.page?.aboutUs2 || "Lorem Ipsum2";
		serviceBox1 =
			data.page?.serviceBox1 ||
			"<h2 >Property Search</h2><p>Ut autem aut autem non a. Sint sint sit facilis nam iusto sint. Libero corrupti neque eum hic non ut nesciunt dolorem.</p>";
		serviceBox2 =
			data.page?.serviceBox2 ||
			"<h2 >Property Valuation</h2><p>Ut autem aut autem non a. Sint sint sit facilis nam iusto sint. Libero corrupti neque eum hic non ut nesciunt dolorem.</p>";
		serviceBox3 =
			data.page?.serviceBox3 ||
			"<h2 >Concerage Services</h2><p>Ut autem aut autem non a. Sint sint sit facilis nam iusto sint. Libero corrupti neque eum hic non ut nesciunt dolorem.</p>";
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
					pageId: "home",
					page: {
						title,
						aboutUs,
						aboutUs2,
						serviceBox1,
						serviceBox2,
						serviceBox3
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

	onMount(() => {
		register();

		const swiperEl = document.querySelector("swiper-container");

		// swiper parameters
		const swiperParams = {
			modules: [Navigation, Pagination],
			slidesPerView: 1,
			spaceBetween: 30,

			navigation: {
				nextEl: ".swiper-button-next",
				prevEl: ".swiper-button-prev"
			},
			breakpoints: {
				768: {
					slidesPerView: 1
				},
				1024: {
					slidesPerView: 2
				},
				1400: {
					slidesPerView: 2
				}
			},
			on: {
				init() {
					// ...
				}
			}
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

<div class="container mx-auto block md:hidden mt-20">
	<h1>
		<PlainText bind:content={title} />
	</h1>
</div>
<div
	class="container-fluid heroSection home p-0 flex h-screen items-center justify-center bgNormal"
	style="background: url({ohio_2}) top center no-repeat; background-size: cover;background-attachment: fixed;">
	<div class=" grid-cols-12 self-stretch md:grid hidden">
		<div
			class="heroText col-span-12 md:col-span-6 xl:col-span-5 flex flex-col justify-center items-start md:bg-white md:pl-12 xl:pl-20">
			<h1 class="md:max-w-lg lg:max-w-2xl 2xl:max-w-3xl xl:mr-16 text-primary-700">
				<PlainText bind:content={title} />
			</h1>
			<a href="/properties" class="tBtn2 tBtn2Alt mt-6">Property Search</a>
		</div>
	</div>
</div>

<section class="services py-12 md:py-16 lg:py-20 2xl:py-24">
	<div class="container mx-auto max-w-6xl">
		<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-4 lg:gap-10 pb-4">
			<a href="properties" class="serviceBoxContent">
				<div class="bgImg">
					<img src={box1} alt="" />
				</div>
				<div class="absText">
					<RichText multiLine bind:content={serviceBox1} />
				</div>
			</a>
			<a href="valuation" class="serviceBoxContent">
				<div class="bgImg">
					<img src={box2} alt="" />
				</div>
				<div class="absText">
					<RichText multiLine bind:content={serviceBox2} />
				</div>
			</a>
			<a href="concierge" class="serviceBoxContent">
				<div class="bgImg">
					<img src={box3} alt="" />
				</div>
				<div class="absText">
					<RichText multiLine bind:content={serviceBox3} />
				</div>
			</a>
		</div>
	</div>
</section>

<!-- <div
	class="container-fluid aboutUs"
	style="background: url({rendering}) top right no-repeat; background-size: contain;">
	<div class="container mx-auto grid grid-cols-3 py-10 md:py-20 lg:py-28 2xl:py-32">
		<div class="aboutText col-span-3 md:col-span-2">
			<h2 class="small-title">We do it smart</h2>
			<RichText multiLine bind:content={aboutUs} />
			<a href="/about" class="tBtn2 tBtn2Alt mt-6 md:mt-8">Learn More</a>
		</div>
	</div>
</div> -->
<section class="services bg-accent">
	<div class="" data-aos="fade-up">
		<div class="grid grid-cols-1 lg:grid-cols-2">
			<div class="col-sapn-1 aspect-square lg:aspect-auto" style="background: url({aboutThumb}) center center no-repeat; background-size: cover;">
     
		
			</div>
			<div class="col-sapn-1 px-5 py-12 lg:p-14 2xl:p-24 ">
        		<RichText multiLine bind:content={aboutUs2} />
				<ul class="max-w-md space-y-1 md:space-y-2 text-gray-800 list-inside mt-10">
					<li class="flex items-center">
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
							><path
								fill="currentColor"
								d="M4.5 12.75a.75.75 0 0 1 .75-.75h13.5a.75.75 0 0 1 0 1.5H5.25a.75.75 0 0 1-.75-.75" /></svg>
						New Construction
					</li>
					<li class="flex items-center">
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
							><path
								fill="currentColor"
								d="M4.5 12.75a.75.75 0 0 1 .75-.75h13.5a.75.75 0 0 1 0 1.5H5.25a.75.75 0 0 1-.75-.75" /></svg>
						Remodeling & Renovation
					</li>
					<li class="flex items-center">
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
							><path
								fill="currentColor"
								d="M4.5 12.75a.75.75 0 0 1 .75-.75h13.5a.75.75 0 0 1 0 1.5H5.25a.75.75 0 0 1-.75-.75" /></svg>
						Design Services
					</li>
					<li class="flex items-center">
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
							><path
								fill="currentColor"
								d="M4.5 12.75a.75.75 0 0 1 .75-.75h13.5a.75.75 0 0 1 0 1.5H5.25a.75.75 0 0 1-.75-.75" /></svg>
						Project Management
					</li>
					<li class="flex items-center">
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
							><path
								fill="currentColor"
								d="M4.5 12.75a.75.75 0 0 1 .75-.75h13.5a.75.75 0 0 1 0 1.5H5.25a.75.75 0 0 1-.75-.75" /></svg>
						No Hassle Payment Process
					</li>
				</ul>
			</div>
		</div>
	</div>
</section>
<NotEditable>
	<div
		class="container-fluid ohioSlider homeSlider listingsSec img-100 py-12 md:py-16 lg:py-20 2xl:py-24">
		<div class="container mx-auto max-w-6xl">
			<div class="aboutSlideHeader">
				<h2 class="small-title swiperTitle">Featured Properties</h2>
				<!-- <h3>Ohio Concierge Realty Group</h3> -->
			</div>
			<swiper-container init="false">
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
							<img src="https://picsum.photos/id/84/768/512" />
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
							<img src="https://picsum.photos/id/43/768/512" />
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
							<img src="https://picsum.photos/id/122/768/512" />
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
							<img src="https://picsum.photos/id/84/768/512" />
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
							<img src="https://picsum.photos/id/43/768/512" />
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
</NotEditable>

<!-- ======= Services Section ======= -->


<!-- End Services Section -->

<!-- ======= Call To Action Section ======= -->
<NotEditable>
	<div
		class="container-fluid callToAction aboutCta py-20 flex items-center justify-center bgNormal"
		style="background: url({homeCta}) center center no-repeat; background-size: cover; ">
		<div class="container mx-auto relative z-10 flex items-center justify-end">
			<ContactForm />
		</div>
	</div>
</NotEditable>
