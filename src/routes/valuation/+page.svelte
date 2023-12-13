<script>
  
    import ValuationForm2 from '$lib/components/ValuationForm2.svelte'

    import PageHeader from '$lib/img/valuation2.webp'

	import team1 from "$lib/img/team-1.jpg";
	import team2 from "$lib/img/team-4.jpg";
	import ohio_1 from "$lib/img/conFooter3.webp";
	import ohio_2 from "$lib/img/ohioCity_2.webp";
	import white_2 from "$lib/img/conFooter2.webp";

	import { AccordionItem, Accordion } from "flowbite-svelte";
	import { fetchJSON } from "$lib/util";
	import IntroStep from '$lib/components/IntroStep.svelte';
	import TabsCom from '$lib/components/TabsCom.svelte';

	import { onMount } from "svelte";

	import PlainText from "$lib/components/PlainText.svelte";
	import RichText from "$lib/components/RichText.svelte";

	import PrimaryButton from "$lib/components/PrimaryButton.svelte";

	import LoginMenu from "$lib/components/LoginMenu.svelte";

	import { Tabs, TabItem } from 'flowbite-svelte';

	import heroThumb from "$lib/img/heroThumb2.webp";

	import rendering from "$lib/img/building-vector.svg";
	import homeContactBg from "$lib/img/homeContact.jpg";
	import NotEditable from "$lib/components/NotEditable.svelte";
	import { currentUser, isEditing } from "$lib/stores.js";
	import WebsiteHeader from "$lib/components/WebsiteHeader.svelte";


	export let data;	

	let valTab, showUserMenu;

	function initOrReset() {
		$currentUser = data.currentUser;
		
		valTab= JSON.parse(
      JSON.stringify(
        data.page?.tab1 || {
       
          title: "What's Your Property Worth?",
          disclaimer: 'Aenean egestas lacus id massa efficitur, vel pulvinar turpis varius. Praesent a sem turpis. Morbi egestas luctus nisl dictum convallis. Maecenas rhoncus congue neque. Etiam cursus turpis dolor, non accumsan ex dignissim sit amet. Ut blandit lobortis ornare. Phasellus placerat, sem in dapibus tincidunt, tellus libero feugiat ex, ut malesuada lectus ex id ipsum',
        thanks:"We're gathering your property information. Your home valuation report will arrive in your inbox."
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
				// @ts-ignore
				await fetchJSON("POST", "/api/save-page", {
					pageId: "valuation",
					page: {
						valTab,
                    							
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
    <title>Property valuation</title>
    <meta name="description" content="Real Estate and Concierge Services" />
    <link rel="alternate" hreflang="en" href="" />
    <link rel="canonical" href="" />
  </svelte:head>
  
  <WebsiteHeader bind:showUserMenu on:cancel={initOrReset} on:save={savePage}>
    <PrimaryButton on:click={toggleEdit}>Edit page</PrimaryButton>
    <LoginMenu />
  </WebsiteHeader>
  <div class="h-screen flex items center justify-center homeValuation" style="background: url({PageHeader}) top center no-repeat; background-size: cover;">
    <div class="container mx-auto lg:max-w-2xl">
 <ValuationForm2 bind:mytab={valTab} />
  </div>
</div>