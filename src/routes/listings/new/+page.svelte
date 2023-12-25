<script lang="ts">
	import type { PageData, ActionData } from './$types';
	
	
	
	export let form: ActionData;
	import { Section } from "flowbite-svelte-blocks";
	import { Label, Input, Button, Select, Textarea, Fileupload,Checkbox ,Alert} from "flowbite-svelte";
	import { enhance } from "$app/forms";
	import WebsiteHeader from "$lib/components/WebsiteHeader.svelte";
	import PrimaryButton from '$lib/components/PrimaryButton.svelte';
	import LoginMenu from '$lib/components/LoginMenu.svelte';
	let selectedTypes = [];
	let textareaprops = {
    id: 'content',
    name: 'content',
    label: 'Property Detail',
    rows: 4,
    placeholder: 'Enter Property Highlights...'
  };
	let types = [
		{ value: "comercial", name: "Commercial" },
		{ value: "residencial", name: "Residencial" },
		{ value: "multifamily", name: "Multifamily" }
	];
	let categories = [
		{ value: "for_sale", name: "Commercial" },
		{ value: "residencial", name: "Residencial" },
		{ value: "multifamily", name: "Multifamily" }
	];  // Populate with available types for property
	let media = []; // Populate with available media options
	let selectedType="";



	function toggleEdit(e: MouseEvent): void {
		throw new Error('Function not implemented.');
	}
</script>
<WebsiteHeader class="bg-white">
	<PrimaryButton on:click={toggleEdit}>Edit page</PrimaryButton>
	<LoginMenu />
</WebsiteHeader>
<Section name="crudcreateform">
	<h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white mt-16">Add a New Property</h2>
	<form method="POST" use:enhance enctype="multipart/form-data">
		<div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
			<!-- Title Field -->
			<div class="sm:col-span-2">
				<Label for="title" class="mb-2">Title</Label>
				<Input type="text" id="title" name="title" placeholder="Property title" required />
			</div>
			<div class="sm:col-span-2">
				<Textarea {...textareaprops} name="content"/>
			</div>
			<!-- Address Field -->
			<div class="w-full">
				<Label for="address" class="mb-2">Address</Label>
				<Input type="text" id="address" name="address" placeholder="Property address" required />
			</div>

			<!-- City and State Field -->
			<div class="w-full">
				<Label for="city_state" class="mb-2">City and State</Label>
				<Input
					type="text"
					id="city_state"
					name="city_state"
					placeholder="City and State"
					required />
			</div>

			<!-- Price Field -->
			<div class="w-full">
				<Label for="price" class="mb-2">Price</Label>
				<Input type="number" id="price" name="price" placeholder="Price" required />
			</div>

			<!-- Beds Field -->
			<div class="w-full">
				<Label for="beds" class="mb-2">Beds</Label>
				<Input type="number" id="beds" name="beds" placeholder="Number of beds" required />
			</div>

			<!-- Baths Field -->
			<div class="w-full">
				<Label for="baths" class="mb-2">Baths</Label>
				<Input type="number" id="baths" name="baths" placeholder="Number of baths" required />
			</div>

			<!-- Area Field -->
			<div class="w-full">
				<Label for="area" class="mb-2">Area (sqft)</Label>
				<Input type="number" id="area" name="area" placeholder="Area in square feet" required />
			</div>

			<!-- Type Field -->
			<div class="w-full">
				<Label for="type" class="mb-2">Type</Label>
				<Select class="mt-2" items={types} bind:value={selectedType}  name="type" />
			</div>
			<div class="w-full">
				<Label for="category" class="mb-2">Category</Label>
<ul class=" bg-white rounded-lg border border-gray-200 flex">
  <li><Checkbox name="category" value="for_sale" class="p-3">For Sale</Checkbox></li>
  <li><Checkbox name="category" value="for_lease" class="p-3">For Lease</Checkbox></li>

</ul>
			</div>
			<Label for="featuredImage">Featured Image</Label>

			<Fileupload type="file" id="file" name="featuredImage" required />
			<Label for="galleryImages">Gallery Images</Label>
			<Fileupload type="file" id="galleryImages" name="galleryImages" multiple />
			<Button type="submit" class="w-40">Add Property</Button>
		</div>
		{#if form?.success}
		<Alert color="green">
			<span class="font-medium">Success alert!</span>	

		  </Alert>
{/if}
		
	</form>
</Section>
