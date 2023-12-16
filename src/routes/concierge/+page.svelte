<script>
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
	import toast from "svelte-french-toast";
	import ContactForm from "$lib/components/ContactForm.svelte";
	let activeTab = 1;
	export let data;	

	let title, aboutUs, showUserMenu,  introStep1, introStep2, introStep3, introStep4, introStep5, tab1,tab2,tab3,tab4;

	function initOrReset() {
		$currentUser
		title = data.page?.title || "In consequat porttitor nisl at hendrerit Maecenas";
		aboutUs = data.page?.aboutUs || "Concierge";
		tab1 =	data.page?.tab || "Tab1 Content";

		tab1 = JSON.parse(
      JSON.stringify(
        data.page?.tab1 || {
       
          title: 'New Construction',
          detail: 'Lorem ipsum dolor sit amet, quo ei simul congue exerci, ad nec admodum perfecto mnesarchum, vim ea mazim fierent detracto. Ea quis iuvaret expetendis his, te elit voluptua dignissim per, habeo iusto primis ea eam.'
        }
      )
    );
		tab2 = JSON.parse(
      JSON.stringify(
        data.page?.tab2 || {
       
          title: 'New Construction',
          detail: 'Lorem ipsum dolor sit amet, quo ei simul congue exerci, ad nec admodum perfecto mnesarchum, vim ea mazim fierent detracto. Ea quis iuvaret expetendis his, te elit voluptua dignissim per, habeo iusto primis ea eam.'
        }
      )
    );
		tab3 = JSON.parse(
      JSON.stringify(
        data.page?.tab3 || {
       
          title: 'New Construction',
          detail: 'Lorem ipsum dolor sit amet, quo ei simul congue exerci, ad nec admodum perfecto mnesarchum, vim ea mazim fierent detracto. Ea quis iuvaret expetendis his, te elit voluptua dignissim per, habeo iusto primis ea eam.'
        }
      )
    );
		tab4 = JSON.parse(
      JSON.stringify(
        data.page?.tab4 || {
       
          title: 'New Construction',
          detail: 'Lorem ipsum dolor sit amet, quo ei simul congue exerci, ad nec admodum perfecto mnesarchum, vim ea mazim fierent detracto. Ea quis iuvaret expetendis his, te elit voluptua dignissim per, habeo iusto primis ea eam.'
        }
      )
    );
		introStep1 = JSON.parse(
      JSON.stringify(
        data.page?.introStep1 || {
       
          title: 'New Construction',
          description: 'Lorem ipsum dolor sit amet, quo ei simul congue exerci, ad nec admodum perfecto mnesarchum, vim ea mazim fierent detracto. Ea quis iuvaret expetendis his, te elit voluptua dignissim per, habeo iusto primis ea eam.'
        }
      )
    );
    introStep2 = JSON.parse(
      JSON.stringify(
        data.page?.introStep2 || {
  
          title: 'Remodeling & Renovation',
          description: 'Lorem ipsum dolor sit amet, quo ei simul congue exerci, ad nec admodum perfecto mnesarchum, vim ea mazim fierent detracto. Ea quis iuvaret expetendis his, te elit voluptua dignissim per, habeo iusto primis ea eam.'
        }
      )
    );
    introStep3 = JSON.parse(
      JSON.stringify(
        data.page?.introStep3 || {
      
          title: 'Design Services',
          description: 'Lorem ipsum dolor sit amet, quo ei simul congue exerci, ad nec admodum perfecto mnesarchum, vim ea mazim fierent detracto. Ea quis iuvaret expetendis his, te elit voluptua dignissim per, habeo iusto primis ea eam.'
        }
      )
    );
    introStep4 = JSON.parse(
      JSON.stringify(
        data.page?.introStep4 || {
        
          title: 'Project Management',
          description: 'Lorem ipsum dolor sit amet, quo ei simul congue exerci, ad nec admodum perfecto mnesarchum, vim ea mazim fierent detracto. Ea quis iuvaret expetendis his, te elit voluptua dignissim per, habeo iusto primis ea eam.'
        }
      )
    );	
	introStep5 = JSON.parse(
      JSON.stringify(
        data.page?.introStep4 || {
        
          title: 'No Hassle Payment Process',
          description: 'Lorem ipsum dolor sit amet, quo ei simul congue exerci, ad nec admodum perfecto mnesarchum, vim ea mazim fierent detracto. Ea quis iuvaret expetendis his, te elit voluptua dignissim per, habeo iusto primis ea eam.'
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
					pageId: "concierge",
					page: {
						title,
						aboutUs,
						 introStep1,
							introStep2,
							introStep3,
							introStep4,	
							introStep5,	
							tab1,					
							tab2,					
							tab3,					
							tab4,					
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
	<title>Conceirage Services</title>
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
	class="container-fluid heroSection about p-0 flex items-end h-[400px] md:h-[420px] lg:h-[480px] xl:h-[500px] 2xl:h-[650px] bgNormal"
	style="background: url({ohio_1}) top center no-repeat; background-size: cover;background-attachment: fixed;">
	<div class="heroThumb border-8 border-white shadow-md">
		<img src={heroThumb} alt="" />
	</div>
</div>


<div
	class="container-fluid aboutUs my-16 sm:my-20 md:my-24 xl:mt-40 2xl:mt-56"
	style="background: url({rendering}) top right no-repeat; background-size: contain;background-attachment:fixed;">
	<div class="container mx-auto grid grid-cols-4  ">
		
		<div class="aboutText col-span-4 md:col-span-3">
			<RichText multiLine bind:content={aboutUs} />
			
		</div>
	</div>
</div>

<div class="container-fluid conceirageServices mb-16 sm:mb-20 md:mb-24 xl:mb-36">
	<div class="container mx-auto mx-auto grid grid-cols-4 ">
		<div class="aboutText col-span-4">
			<h2 class="small-title">Our Services</h2>
			<Tabs class="tabUl">
             
			<TabsCom bind:tab={tab1} open={activeTab === 1}/>
			<TabsCom bind:tab={tab2} open={activeTab === 2}/>
			<TabsCom bind:tab={tab3} open={activeTab === 3}/>
			<TabsCom bind:tab={tab4} open={activeTab === 4}/>

			  </Tabs>
			
		</div>
		
	</div>
</div>
<!-- <div class="container-fluid conceirageServices mb-16 sm:mb-20 md:mb-24 xl:mb-36">
	<div class="container mx-auto mx-auto grid grid-cols-4 ">
		<div class="aboutText col-span-4 md:col-span-3">
			<h2 class="small-title">Our Services</h2>
			<Tabs class="tabUl">
				<TabItem open title="Pellentesque Condimentum">
					<div class="conceirageServicesTab">
						<ul>
						  <li><i class="fa-regular fa-circle-check"></i> Nullam diam</li>
						  <li><i class="fa-regular fa-circle-check"></i> Sed volutpa</li>
						  <li><i class="fa-regular fa-circle-check"></i> Cras consequat</li>
						</ul>
					  </div>
				</TabItem>
				<TabItem title="Duis Scelerisque">
					<div class="conceirageServicesTab">
						<ul>
						  <li><i class="fa-regular fa-circle-check"></i> Vestibulum et</li>
						  <li><i class="fa-regular fa-circle-check"></i> Duis scelerisque</li>
						  <li><i class="fa-regular fa-circle-check"></i> Nullam diam</li>
						  <li><i class="fa-regular fa-circle-check"></i> Sed volutpa</li>
						  <li><i class="fa-regular fa-circle-check"></i> Cras consequat</li>
						</ul>
					  </div>
				</TabItem>
				<TabItem title="Nullam Diam">
					<div class="conceirageServicesTab">
						<ul>
						  <li><i class="fa-regular fa-circle-check"></i> Duis scelerisque</li>
						  <li><i class="fa-regular fa-circle-check"></i> Nullam diam</li>
						  <li><i class="fa-regular fa-circle-check"></i> Sed volutpa</li>
						  <li><i class="fa-regular fa-circle-check"></i> Cras consequat</li>
						</ul>
					  </div>
				</TabItem>
				<TabItem title="Sed Volutpat">
					<div class="conceirageServicesTab">
						<ul>
						  <li><i class="fa-regular fa-circle-check"></i> Nullam diam</li>
						  <li><i class="fa-regular fa-circle-check"></i> Sed volutpa</li>
						  <li><i class="fa-regular fa-circle-check"></i> Cras consequat</li>
						</ul>
					  </div>
				</TabItem>
			  </Tabs>
			
		</div>
		
	</div>
</div> -->

<div class="container-fluid timeLine py-16 sm:py-20 md:py-24 xl:py-32">
	<div class="container mx-auto">
	  <div class="tl">
		<div class="tl-container tl-right">
		  <div class="tl-content">
			<IntroStep bind:intro={introStep1} />
		  </div>
		</div>
		<div class="tl-container tl-left">
		  <div class="tl-content">
			<IntroStep bind:intro={introStep2} />
		  </div>
		</div>
		<div class="tl-container tl-right">
		  <div class="tl-content">
			<IntroStep bind:intro={introStep3} />
		  </div>
		</div>
		<div class="tl-container tl-left">
		  <div class="tl-content">
			<IntroStep bind:intro={introStep4} />
		  </div>
		</div>
		<div class="tl-container tl-right">
		  <div class="tl-content">
			<IntroStep bind:intro={introStep5} />
		  </div>
		</div>
	  </div>
	</div>
  </div>


<div
	class="container-fluid callToAction noBefore aboutCta py-20 flex items-center bg-fixed bg-cover cover bgNormal"
	style="background: url({white_2}) center center no-repeat; ">
	<div
		class="container mx-auto relative z-10 flex justify-end">		
		<ContactForm />
	
	</div>
</div>