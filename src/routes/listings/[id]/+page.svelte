<script lang="ts">
	import { error } from "@sveltejs/kit";
	import type { PageData, ActionData } from "../[id]/$types";
	import { Section } from "flowbite-svelte-blocks";
	import {
		Label,
		Input,
		Button,
		Select,
		Textarea,
		Gallery,
		Checkbox,
		Fileupload,
		Alert
	} from "flowbite-svelte";
	import WebsiteHeader from "$lib/components/WebsiteHeader.svelte";
	import PrimaryButton from "$lib/components/PrimaryButton.svelte";
	import LoginMenu from "$lib/components/LoginMenu.svelte";

	let textareaprops = {
		id: "content",
		name: "content",
		label: "Property Detail",
		rows: 4,
		placeholder: "Enter Property Highlights..."
	};
	let selectedType;
	let types = [
		{ value: "tv", name: "TV/Monitors" },
		{ value: "pc", name: "PC" },
		{ value: "phone", name: "Phones" }
	];
	export let data: PageData;
	let property: {
		id: number;
		title: string;
		content: string | null;
		address: string;
		city_state: string | null;
		price: number | null;
		beds: number | null;
		baths: number | null;
		area: number | null;
		category: string | null;
		type: string | null;
		created_at: Date;
		updated_at: Date | null;
		featuredImage: string | null;
		media:string[];
};
	
let images = [];
	$: if (data && data.property) {
    property = data.property;
    images = Array.isArray(property.media) ? [...property.media] : [];
	}
	function toggleEdit(e: MouseEvent): void {
		throw new Error("Function not implemented.");
	}
	export let form: ActionData;

	async function deleteGalleryImage(imageId) {
		try {
			const response = await fetch(`/api/deleteGalleryImage/${imageId}`, {
				method: "DELETE"
			});

			if (!response.ok) {
				throw new Error("Failed to delete image");
			}

			const result = await response.json();
			console.log(result.message);

			// Update local images list to reflect the deletion
			images = images.filter((img) => img.id !== imageId);
		} catch (err) {
			console.error("Error:", err.message);
		}
	}
</script>

<WebsiteHeader class="bg-white">
	<PrimaryButton on:click={toggleEdit}>Edit page</PrimaryButton>
	<LoginMenu />
</WebsiteHeader>

<Section name="crudcreateform">
	{#if form?.success}
		<Alert color="green">
			<span class="font-medium">Listing Updated!</span>
		</Alert>
	{:else if form?.error}
		<Alert color="red">
			<span class="font-medium">Error while updatedting</span>
		</Alert>
	{/if}
	<h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white mt-16">Edit Property</h2>
	<form action="?/updateProperty" method="POST">
		<div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
			<!-- Title Field -->
			<div class="sm:col-span-2">
				<Label for="title" class="mb-2">Title</Label>
				<Input
					type="text"
					id="title"
					name="title"
					placeholder="Property title"
					required
					value={property.title} />
			</div>
			<div class="sm:col-span-2">
				<Textarea {...textareaprops} value={property.content} />
			</div>

			<!-- Address Field -->
			<div class="w-full">
				<Label for="address" class="mb-2">Address</Label>
				<Input
					type="text"
					id="address"
					name="address"
					placeholder="Property address"
					required
					value={property.address} />
			</div>

			<!-- City and State Field -->
			<div class="w-full">
				<Label for="city_state" class="mb-2">City and State</Label>
				<Input
					type="text"
					id="city_state"
					name="city_state"
					placeholder="City and State"
					required
					value={property.city_state} />
			</div>

			<!-- Price Field -->
			<div class="w-full">
				<Label for="price" class="mb-2">Price</Label>
				<Input
					type="text"
					id="price"
					name="price"
					placeholder="Price"
					required
					value={property.price} />
			</div>

			<!-- Beds Field -->
			<div class="w-full">
				<Label for="beds" class="mb-2">Beds</Label>
				<Input
					type="number"
					id="beds"
					name="beds"
					placeholder="Number of beds"
					required
					value={property.beds} />
			</div>

			<!-- Baths Field -->
			<div class="w-full">
				<Label for="baths" class="mb-2">Baths</Label>
				<Input
					type="number"
					id="baths"
					name="baths"
					placeholder="Number of baths"
					required
					value={property.baths} />
			</div>

			<!-- Area Field -->
			<div class="w-full">
				<Label for="area" class="mb-2">Area (sqft)</Label>
				<Input
					type="number"
					id="area"
					name="area"
					placeholder="Area in square feet"
					required
					value={property.area} />
			</div>

			<!-- Type Field -->
			<div class="w-full">
				<Label for="type" class="mb-2">Type</Label>
				<Select class="mt-2" items={types} value={property.type} name="type" />
			</div>
			<div class="w-full">
				<Label for="category" class="mb-2">Category</Label>
				<ul class=" bg-white rounded-lg border border-gray-200 flex">
					<li>
						<Checkbox name="category" value={property.category} class="p-3">For Sale</Checkbox>
					</li>
					<li>
						<Checkbox name="category" value={property.category} class="p-3">For Lease</Checkbox>
					</li>
				</ul>
			</div>
			<Label for="featuredImage">Featured Image</Label>

			<Fileupload type="file" id="file" name="featuredImage" />
			<Label for="galleryImages">Gallery Images</Label>
			<Fileupload type="image" id="galleryImages" name="galleryImages" multiple />
			<Button type="submit" class="w-40">Update</Button>
		</div>
	</form>
	{#if images }
	<Gallery class="gap-6 grid grid-cols-4 mt-8" items={images} let:item>
		<div class="w-40 h-40 relative rounded">
		  <img src={item} alt='' class="object-cover w-full h-full" />
		  <button on:click={() => deleteGalleryImage(item)}>Delete Image</button>
		</div>
	  </Gallery>

	{/if}
	

	<!-- <img src={property.featuredImageUrl} alt=""> -->
</Section>

<style>
	img {
		overflow: hidden;
	}
</style>
