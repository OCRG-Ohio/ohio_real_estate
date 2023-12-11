<script lang="ts">
	import ohio_1 from "$lib/img/propertiesBanner.webp";
	import white_2 from "$lib/img/whiteBuilding.webp";

	import { fetchJSON } from "$lib/util";

	import PrimaryButton from "$lib/components/PrimaryButton.svelte";

	import LoginMenu from "$lib/components/LoginMenu.svelte";

	import rendering from "$lib/img/building-vector.svg";
	import { currentUser, isEditing } from "$lib/stores.js";
	import WebsiteHeader from "$lib/components/WebsiteHeader.svelte";

	import { Range, Label, Search, Select } from "flowbite-svelte";
	import PlainText from "$lib/components/PlainText.svelte";
	export let data;

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
	let priceValue = 1; // Default value for Price slider
	let livingAreaValue = 1; // Default value for Living Area slider
	let selectedType: string, selectedBedRoom: number, selectedBathRoom: number;
	const propertyTypes = [
		{ value: "Residential", name: "Residential" },
		{ value: "Townhouse", name: "Townhouse" },
		{ value: "Condo", name: "Condo" },
		{ value: "Commercial", name: "Commercial" },
		{ value: "Multi-Family", name: "Multi-Family" },
		{ value: "Land", name: "Land" },
		{ value: "Co-Op", name: "Co-Op" },
		{ value: "Manufactured", name: "Manufactured" },
		{ value: "Other", name: "Other" }
	];
	const bedroomOptions = [
		{ value: "1", name: "1+ Bedrooms" },
		{ value: "2", name: "2+ Bedrooms" },
		{ value: "3", name: "3+ Bedrooms" },
		{ value: "4", name: "4+ Bedrooms" },
		{ value: "5", name: "5+ Bedrooms" }
	];
	const bathroomOptions = [
		{ value: "1", name: "1+ Bathrooms" },
		{ value: "2", name: "2+ Bathrooms" },
		{ value: "3", name: "3+ Bathrooms" },
		{ value: "4", name: "4+ Bathrooms" },
		{ value: "5", name: "5+ Bathrooms" }
	];
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

<div
	class="container-fluid p-0 flex items-center justify-center propertiesBanner"
	style="background: url({ohio_1}) top center no-repeat; background-size: cover;">
	<h1 class="lg:max-w-2xl text-primary-700">Search Homes</h1>
</div>

<div class="container-fuid propertiesPage pt-12">
	<div class="container mx-auto">
		<form class="w-full mx-auto md:w-full">
			<!-- Search Bar -->
			<div class="mb-4">
				<Search placeholder="Search by address, city, state, zip..." />

				<!-- Select Fields -->
				<div class="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-6 mb-4 my-4">
					<div class="">
						<Select
							placeholder="Property Type"
							class="mt-2"
							items={propertyTypes}
							bind:value={selectedType} />
					</div>
					<div class="">
						<Select
							placeholder="Bedrooms"
							class="mt-2"
							items={bedroomOptions}
							bind:value={selectedBedRoom} />
					</div>
					<div class="">
						<Select
							placeholder="Bathrooms"
							class="mt-2"
							items={bathroomOptions}
							bind:value={selectedBathRoom} />
					</div>
				</div>

				<!-- Range Sliders -->
				<div class="grid grid-cols-1 md:grid-cols-2 gap-3 slidecontainer">
					<div class="">
						<!-- <h1>Price</h1>
					<input type="range" min="1" max="5" class="slider" id="myRange1" bind:value={priceValue} on:input={handlePriceInput} step="0.1" /> -->
						<Label>Price</Label>
						<Range id="small-range" min="1" max="5" bind:value={priceValue} size="sm" step="0.1" />
						<p>${priceValue} M</p>
					</div>
					<div class="">
						<Label>Living Area</Label>
						<Range
							id="living-area"
							min="1"
							max="5"
							bind:value={livingAreaValue}
							size="sm"
							step="0.2" />

						<p>{livingAreaValue} K sqft</p>
					</div>
				</div>
			</div>
		</form>
	</div>
</div>
<div class="container-fluid listingsSec img-100 py-6">
	<div class="container mx-auto">
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 2xl:gap-10">
			<div class="">
				<div class="listingsBox shadow-md">
					<a href="/single-properties">
						<div class="listingsImage">
							<img src="https://picsum.photos/id/43/768/512" alt="Listing Image" />
							<div class="listingType">For Sale</div>
						</div>
						<div class="listingContent">
							<span class="price">$5,999,000</span>
							<p>123 Dollar Ipsum Lane, Lorem Two, OH 12345</p>
							<div class="listingInfo">
								<span>4 Beds</span> - <span>4 Baths</span> - <span>3,660 Sq.Ft.</span>
							</div>
						</div>
					</a>
				</div>
			</div>
			<div class="">
				<div class="listingsBox shadow-md">
					<div class="listingsImage">
						<img src="https://picsum.photos/id/84/768/512" alt="Listing Image" />
						<div class="listingType">For Sale</div>
					</div>
					<div class="listingContent">
						<span class="price">$4,500,000</span>
						<p>456 Ipsum Avenue, Sit Amet City, FL 54321</p>
						<div class="listingInfo">
							<span>5 Beds</span> - <span>3 Baths</span> - <span>4,200 Sq.Ft.</span>
						</div>
					</div>
				</div>
			</div>

			<div class="">
				<div class="listingsBox shadow-md">
					<div class="listingsImage">
						<img src="https://picsum.photos/id/122/768/512" alt="Listing Image" />
						<div class="listingType">For Sale</div>
					</div>
					<div class="listingContent">
						<span class="price">$3,200,000</span>
						<p>789 Sit Avenue, Dolor Ipsum, TX 98765</p>
						<div class="listingInfo">
							<span>3 Beds</span> - <span>2 Baths</span> - <span>2,000 Sq.Ft.</span>
						</div>
					</div>
				</div>
			</div>

			<div class="">
				<div class="listingsBox shadow-md">
					<div class="listingsImage">
						<img src="https://picsum.photos/id/84/768/512" alt="Listing Image" />
						<div class="listingType">For Sale</div>
					</div>
					<div class="listingContent">
						<span class="price">$2,750,000</span>
						<p>987 Ipsum Street, Consectetur City, IL 34567</p>
						<div class="listingInfo">
							<span>6 Beds</span> - <span>5 Baths</span> - <span>5,000 Sq.Ft.</span>
						</div>
					</div>
				</div>
			</div>
			<div class="">
				<div class="listingsBox shadow-md">
					<div class="listingsImage">
						<img src="https://picsum.photos/id/43/768/512" alt="Listing Image" />
						<div class="listingType">For Sale</div>
					</div>
					<div class="listingContent">
						<span class="price">$3,850,000</span>
						<p>321 Amet Street, Adipiscing City, WA 56789</p>
						<div class="listingInfo">
							<span>4 Beds</span> - <span>3 Baths</span> - <span>3,200 Sq.Ft.</span>
						</div>
					</div>
				</div>
			</div>

			<div class="">
				<div class="listingsBox shadow-md">
					<div class="listingsImage">
						<img src="https://picsum.photos/id/122/768/512" alt="Listing Image" />
						<div class="listingType">For Sale</div>
					</div>
					<div class="listingContent">
						<span class="price">$6,200,000</span>
						<p>654 Ipsum Drive, Elit City, NV 23456</p>
						<div class="listingInfo">
							<span>7 Beds</span> - <span>6 Baths</span> - <span>6,500 Sq.Ft.</span>
						</div>
					</div>
				</div>
			</div>
			<div class="">
				<div class="listingsBox shadow-md">
					<div class="listingsImage">
						<img src="https://picsum.photos/id/43/768/512" />
						<div class="listingType">For Sale</div>
					</div>
					<div class="listingContent">
						<span class="price">$3,600,000</span>
						<p>246 Dolor Street, Consectetur Ipsum, CA 67890</p>
						<div class="listingInfo">
							<span>4 Beds</span> -
							<span>3 Baths</span> -
							<span>2,800 Sq.Ft.</span>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="py-5">
			<div class="w-full text-center">
				<a href="#" class="tBtn2 tBtn2Alt mt-8 md:mt-14"><span>View More Listings</span></a>
			</div>
		</div>
	</div>
</div>
