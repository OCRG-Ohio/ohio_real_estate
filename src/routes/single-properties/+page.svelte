<script>
	import { fetchJSON } from "$lib/util";

	import PrimaryButton from "$lib/components/PrimaryButton.svelte";

	import LoginMenu from "$lib/components/LoginMenu.svelte";
	import ohio_1 from "$lib/img/ohioCity_1.webp";
	import ohio_2 from "$lib/img/ohioCity_2.webp";
	import white_2 from "$lib/img/whiteBuilding.webp";
	import { currentUser, isEditing } from "$lib/stores.js";
	import WebsiteHeader from "$lib/components/WebsiteHeader.svelte";
	import ContactPageForm from "$lib/components/ContactPageForm.svelte";
	import SwiperComponent from '$lib/components/HomeSwiper.svelte';

let images = [
  { src:ohio_1, alt: 'Image 1' },
  { src:ohio_2, alt: 'Image 2' },
  { src:ohio_1, alt: 'Image 3' },
  
];

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
	<title>Properties Single</title>
	<meta name="description" content="Real Estate and Concierge Services" />
	<link rel="alternate" hreflang="en" href="https://editable.website" />
	<link rel="canonical" href="https://editable.website" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/fotorama/4.6.4/fotorama.css"
    integrity="sha512-bjwk1c6AQQOi6kaFhKNrqoCNLHpq8PT+I42jY/il3r5Ho/Wd+QUT6Pf3WGZa/BwSdRSIjVGBsPtPPo95gt/SLg=="
    crossorigin="anonymous" referrerpolicy="no-referrer" />
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"
	integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous">
	</script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/fotorama/4.6.4/fotorama.js"
	integrity="sha512-cWEytOR8S4v/Sd3G5P1Yb7NbYgF1YAUzlg1/XpDuouZVo3FEiMXbeWh4zewcYu/sXYQR5PgYLRbhf18X/0vpRg=="
	crossorigin="anonymous" referrerpolicy="no-referrer"></script>
</svelte:head>

<WebsiteHeader bind:showUserMenu on:cancel={initOrReset} on:save={savePage}>
	<PrimaryButton on:click={toggleEdit}>Edit page</PrimaryButton>
	<LoginMenu />
</WebsiteHeader>
<div class="container-fluid propertiesSingle  py-10">
	<div class="container mx-auto ">
		<SwiperComponent {images} />
		<div class="grid grid-cols-12 xl:gap-6">
			<div class="col-span-12 xl:col-span-8 2xl:col-span-9">
				<div class="propertyDetailInfo">	
				
					<section class="propertyInfo">
						<div class="title mb-8 mt-4">
							<div class="flex flex-col md:flex-wrap md:flex-row md:justify-between lg:items-end">
								<div class="">
									<h3 class="text-lg md:text-2xl font-medium">Phasellus Suscipit Elementum</h3>
									<div class="address">Nullam 123, NW Drive</div>
								</div>
								
								<span class="font-normal">$99,999,999</span>
							</div>
							
							<hr class="mt-4" />
						</div>
						<div class="propertyText">
							<div class="grid grid-cols-12">
								<div class="col-span-12 md:col-span-3 xl:col-span-2 mb-4 lg:mb-0">
									<ul class="flex flex-wrap gap-y-2">
										<li class="w-full flex flex-row items-center gap-x-2">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="12"
												height="12"
												viewBox="0 0 24 24"
												fill="currentColor"
												aria-hidden="true">
												<circle cx="12" cy="12" r="10" />
											</svg> Active
										</li>
										<li class="w-full flex flex-row items-center gap-x-2">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="24"
												height="24"
												fill="none"
												viewBox="0 0 24 24"
												aria-hidden="true"
												focusable="false"
												tabindex="-1"
												aria-labelledby=""
												><path
													fill="currentColor"
													fill-rule="evenodd"
													d="M6.5 4A2.5 2.5 0 0 0 4 6.5V11h1a2 2 0 0 1 2-2h2.5a2 2 0 0 1 2 2h1a2 2 0 0 1 2-2H17a2 2 0 0 1 2 2h1V6.5A2.5 2.5 0 0 0 17.5 4h-11Zm-2 8A2.5 2.5 0 0 0 2 14.5V19h1.233l-.458 1.706a1 1 0 1 0 1.932.518L5.303 19h13.394l.596 2.224a1 1 0 0 0 1.932-.518L20.767 19H22v-4.5a2.5 2.5 0 0 0-2.5-2.5h-15Z"
													clip-rule="evenodd"></path>
											</svg> 4 Beds
										</li>
										<li class="w-full flex flex-row items-center gap-x-2">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="24"
												height="24"
												fill="none"
												viewBox="0 0 24 24"
												aria-hidden="true"
												focusable="false"
												tabindex="-1"
												aria-labelledby=""
												><path
													fill="currentColor"
													d="M4 8.5A2.5 2.5 0 0 1 6.5 6h11A2.5 2.5 0 0 1 20 8.5V17H4V8.5ZM4 19h16v1.5a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 20.5V19Z"
												></path
												><path
													stroke="currentColor"
													stroke-linecap="round"
													stroke-width="2"
													d="M2 3h17.5A2.5 2.5 0 0 1 22 5.5v2a2.5 2.5 0 0 1-2.5 2.5H2"></path>
											</svg> 4 Baths
										</li>
										<li class="w-full flex flex-row items-center gap-x-2">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="24"
												height="24"
												fill="none"
												viewBox="0 0 24 24"
												aria-hidden="true"
												focusable="false"
												tabindex="-1"
												aria-labelledby=""
												><path
													fill="currentColor"
													d="M21.756 11.41 19.144 8.8a.208.208 0 0 1-.06-.147V3.667a.833.833 0 0 0-.834-.834h-2.5a.833.833 0 0 0-.833.833v.402a.208.208 0 0 1-.356.148l-1.972-1.972a.833.833 0 0 0-1.178 0l-9.167 9.167a.834.834 0 0 0 .59 1.422h1.04a.208.208 0 0 1 .21.209v8.125a.833.833 0 0 0 .833.833h4.791a.208.208 0 0 0 .209-.208v-3.959a2.084 2.084 0 0 1 4.166 0v3.959a.208.208 0 0 0 .209.208h4.791a.833.833 0 0 0 .834-.833v-8.125a.208.208 0 0 1 .208-.209h1.042a.834.834 0 0 0 .589-1.422Z"
												></path>
											</svg> Residential
										</li>
									</ul>
								</div>

								<div class="col-span-12 md:col-span-9 xl:col-span-10">
									<p class="mt-0">
										Ut ligula neque, condimentum eu sollicitudin non, porttitor non velit. Fusce
										fringilla, velit eu semper dapibus, purus mi commodo sapien, vitae cursus elit
										dui id libero. Nunc in vulputate elit. Pellentesque ut risus urna. Quisque nisl
										mauris, blandit a rhoncus et, tempus eget nunc. Suspendisse blandit laoreet
										nulla, non maximus justo condimentum at. Etiam non egestas nunc.
									</p>
									<p>
										Ut pulvinar risus volutpat sapien laoreet euismod. Morbi a commodo purus.
										Vivamus sed laoreet eros, vel feugiat arcu. Donec a justo sit amet elit rutrum
										luctus. Nulla vitae ante libero. Quisque consectetur nisi non nisl commodo, sit
										amet venenatis dui vulputate. Nam aliquam augue et interdum cursus. Maecenas
										luctus lacus neque, quis dapibus purus ultricies eget.
									</p>
									<p>
										Nulla condimentum placerat augue, vel lacinia massa cursus nec. Integer bibendum
										egestas nisi nec accumsan. Vestibulum quis malesuada magna. Mauris facilisis
										risus metus, ut pulvinar dolor vulputate eget. Donec venenatis odio quis est
										vehicula convallis. Sed pulvinar eu augue quis molestie. Aliquam ante libero,
										maximus sed nunc non, aliquet semper ex. Nullam lobortis posuere euismod. Nullam
										eu metus a eros lacinia semper in sit amet ipsum. Vestibulum facilisis tortor
										ante, at tristique magna ultrices at. Vivamus iaculis pharetra venenatis.
									</p>
								</div>
							</div>
						</div>
					</section>

					<section class="propertyFeatures mt-8">
						<div>
							<div>
								<h3 class="text-xl font-medium mb-4">Interior Features</h3>
							</div>
							<dl class="grid gap-4">
								<div class="flex flex-col md:flex-row md:justify-between md:gap-x-4">
									<dt>
										<p class="font-medium">Bedrooms</p>
									</dt>
									<dd>
										<p>4 Beds</p>
									</dd>
								</div>
								<hr />
								<div class="flex flex-col md:flex-row md:justify-between md:gap-x-4">
									<dt>
										<p class="font-medium">Bathrooms</p>
									</dt>
									<dd>
										<p>4 Baths</p>
									</dd>
								</div>
								<hr />
								<div class="flex flex-col md:flex-row md:justify-between md:gap-x-4">
									<dt>
										<p class="font-medium">Appliances</p>
									</dt>
									<dd>
										<p>Quisque, Vestibulum, Nunc, Nullam, Fusce</p>
									</dd>
								</div>
								<hr />
								<div class="flex flex-col md:flex-row md:justify-between md:gap-x-4">
									<dt>
										<p class="font-medium">Fireplace</p>
									</dt>
									<dd>
										<p>No</p>
									</dd>
								</div>
								<hr />
								<div class="flex flex-col md:flex-row md:justify-between md:gap-x-4">
									<dt>
										<p class="font-medium">Cooling</p>
									</dt>
									<dd>
										<p>Yes</p>
									</dd>
								</div>
								<hr />
								<div class="flex flex-col md:flex-row md:justify-between md:gap-x-4">
									<dt>
										<p class="font-medium">Cooling Description</p>
									</dt>
									<dd>
										<p>Central</p>
									</dd>
								</div>
								<hr />
								<div class="flex flex-col md:flex-row md:justify-between md:gap-x-4">
									<dt>
										<p class="font-medium">Heating</p>
									</dt>
									<dd>
										<p>Yes</p>
									</dd>
								</div>
								<hr />
								<div class="flex flex-col md:flex-row md:justify-between md:gap-x-4">
									<dt>
										<p class="font-medium">Heating Description</p>
									</dt>
									<dd>
										<p>Natural Gas</p>
									</dd>
								</div>
							</dl>
						</div>
						<div class="exteriorFeatures">
							<div>
								<h3 class="text-xl font-medium mb-3">Exterior/Building Features</h3>
							</div>
							<dl class="grid gap-4">
								<div class="flex flex-col md:flex-row md:justify-between md:gap-x-4">
									<dt>
										<p class="font-medium">Lot Size</p>
									</dt>
									<dd>
										<p>0.37 acres</p>
									</dd>
								</div>
							</dl>
						</div>
					</section>
					<section class="schoolFeatures mt-8">
						<div>
							<div>
								<h3 class="text-xl font-medium mb-3">School Information</h3>
							</div>
							<dl class="grid gap-4">
								<div class="flex flex-col md:flex-row md:justify-between md:gap-x-4">
									<dt>
										<p class="font-medium">School District</p>
									</dt>
									<dd>
										<p>Aliquam lorem</p>
									</dd>
								</div>
								<!-- Add more rows as needed -->
							</dl>
						</div>
						<!-- Add more sections as needed -->
					</section>
					<section class="otherFeatures mt-8 mb-12">
						<div>
							<div>
								<h3 class="text-xl font-medium mb-3">Other Property Details</h3>
							</div>
							<dl class="grid gap-4">
								<div class="flex flex-col md:flex-row md:justify-between md:gap-x-4">
									<dt>
										<p class="font-medium">Days on Market</p>
									</dt>
									<dd>
										<p>Maecenas</p>
									</dd>
								</div>
								<hr />
								<div class="flex flex-col md:flex-row md:justify-between md:gap-x-4">
									<dt>
										<p class="font-medium">Garage</p>
									</dt>
									<dd>
										<p>No</p>
									</dd>
								</div>
								<hr />
								<div class="flex flex-col md:flex-row md:justify-between md:gap-x-4">
									<dt>
										<p class="font-medium">Parking</p>
									</dt>
									<dd>
										<p>No</p>
									</dd>
								</div>
								<hr />
								<div class="flex flex-col md:flex-row md:justify-between md:gap-x-4">
									<dt>
										<p class="font-medium">View</p>
									</dt>
									<dd>
										<p>No</p>
									</dd>
								</div>
								<hr />
								<div class="flex flex-col md:flex-row md:justify-between md:gap-x-4">
									<dt>
										<p class="font-medium">County</p>
									</dt>
									<dd>
										<p>Pellentesque</p>
									</dd>
								</div>
								<hr />
								<div class="flex flex-col md:flex-row md:justify-between md:gap-x-4">
									<dt>
										<p class="font-medium">Pool</p>
									</dt>
									<dd>
										<p>No</p>
									</dd>
								</div>
								<hr />
								<div class="flex flex-col md:flex-row md:justify-between md:gap-x-4">
									<dt>
										<p class="font-medium">Zoning</p>
									</dt>
									<dd>
										<p>Residential</p>
									</dd>
								</div>
							</dl>
						</div>
					</section>
				</div>
			</div>

			<!-- Sidebar Column (1/4) -->
			<div class="col-span-12 xl:col-span-4 2xl:col-span-3 xl:mt-8">
				<div class="propertiesForm">
					<div class="contactInfo">
						<h2>Ohio Conceirage Properties Group</h2>
						<a href="tel:123456789">Phone: (123) 456-7890</a>
						<a href="mailto:mail@domain.com">Email: mail@domain.com</a>
					</div>

					<ContactPageForm />
				</div>
			</div>
		</div>
	</div>
</div>
