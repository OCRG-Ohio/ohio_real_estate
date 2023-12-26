<script lang="ts">
	import type { PageData, ActionData } from "./$types";
import PlaceHolder from "$lib/img/placeHolder.jpg"
	export let form: ActionData;
	import { Section } from "flowbite-svelte-blocks";
	import {
		Label,
		Input,
		Button,
		Select,
		Textarea,
		Fileupload,
		Checkbox,
		Alert,
		Radio
	} from "flowbite-svelte";
	import { enhance } from "$app/forms";
	import WebsiteHeader from "$lib/components/WebsiteHeader.svelte";
	import PrimaryButton from "$lib/components/PrimaryButton.svelte";
	import LoginMenu from "$lib/components/LoginMenu.svelte";
	let checked =false;
	let textareaprops = {
		id: "content",
		name: "content",
		label: "Property Detail",
		rows: 4,
		placeholder: "Enter Property Highlights..."
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
	]; // Populate with available types for property
	let media = []; // Populate with available media options
	let selectedType = "";

	function toggleEdit(e: MouseEvent): void {
		throw new Error("Function not implemented.");
	}
	let featured = PlaceHolder
	let newImages: any[] = [];
	let imagePreviews: any[] = [];
	function handleFileChange(event: { target: { files: any[] } }) {
		const file = event.target.files[0];
		if (file) {
			featured = URL.createObjectURL(file);
		}
	}

	function handleNewImages(event) {
    const files = Array.from(event.target.files);

    // Filter out invalid or empty files
    const validFiles = files.filter((file) => file && file.size > 0);

    if (validFiles.length === 0) {
        // No valid files were selected, you can show an error message or handle it as needed
        console.log('No valid files selected');
        return;
    }

    // Add valid files to newImages array and create image previews
    newImages = [...newImages, ...validFiles];
    imagePreviews = [...imagePreviews, ...validFiles.map((file) => URL.createObjectURL(file))];
}

async function deleteImage(event, imagePreview) {
    console.log('Delete button clicked');
    event.preventDefault(); // Prevent the default form submission behavior

    try {
 



        // Remove the image preview from the local previews (whether it's existing or not)
        imagePreviews = imagePreviews.filter((preview) => preview !== imagePreview);
        if (!newImages.includes(imagePreview)) {
            newImages = newImages.filter((file) => URL.createObjectURL(file) !== imagePreview);
        }

        console.log('Image preview removed');
    } catch (error) {
        console.error('Error deleting media:', error);
        // Handle network or other errors
    }
}
function getImageSource(preview) {
		return typeof preview === "string" ? preview : preview.url;
	}
</script>

<WebsiteHeader class="bg-white">
	<PrimaryButton on:click={toggleEdit}>Edit page</PrimaryButton>
	<LoginMenu />
</WebsiteHeader>
<div class="crudcreateform py-32 md:px-16">
	<a href="/listings" alt="navigation" class="border-2 mb-3 px-3 py-1 inline-block">View All</a>
	{#if form?.success}
		<Alert color="green" class="text-center mb-4">
			<span class="font-medium">Crete a new listing</span>
		</Alert>
	{/if}
	<h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">Edit Property</h2>
	<form  method="POST" enctype="multipart/form-data">
		<div class="container mx-auto grid grid-cols-12 gap-10">
			<div class="grid gap-4 sm:grid-cols-2 sm:gap-6 md:col-span-8">
				<!-- Title Field -->
				<div class="sm:col-span-2">
					<Label for="title" class="mb-2">Title</Label>
					<Input type="text" id="title" name="title" placeholder="Property title" required />
				</div>
				<div class="sm:col-span-2">
					<Textarea {...textareaprops} name="content" />
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
					<Input type="text" id="price" name="price" placeholder="Price"  />
				</div>

				<!-- Beds Field -->
				<div class="w-full">
					<Label for="beds" class="mb-2">Beds</Label>
					<Input type="number" id="beds" name="beds" placeholder="Number of beds"  />
				</div>

				<!-- Baths Field -->
				<div class="w-full">
					<Label for="baths" class="mb-2">Baths</Label>
					<Input type="number" id="baths" name="baths" placeholder="Number of baths" />
				</div>

				<!-- Area Field -->
				<div class="w-full">
					<Label for="area" class="mb-2">Area (sqft)</Label>
					<Input type="number" id="area" name="area" placeholder="Area in square feet"  />
				</div>
				<div class="w-full">
					<Label for="area" class="mb-2">Lot Size (acres)</Label>
					<Input type="number" id="lot" name="lot" placeholder="Lot Size in acres" />
				</div>

				<!-- Type Field -->
				<div class="w-full">
					<Label for="type" class="mb-2">Zoning</Label>
					<Select class="mt-2" items={types} name="type" />
				</div>
				<div class="w-full">
					<Label for="category" class="mb-2">Category</Label>
					<ul class=" bg-white rounded-lg border border-gray-200 flex">
						<li>
							<Checkbox name="category" value="Yes" class="p-3">For Sale</Checkbox>
						</li>
						<li>
							<Checkbox name="category" value="Yes" class="p-3">For Lease</Checkbox>
						</li>
					</ul>
				</div>
				<!-- <div class="w-full">					
					<Label for="apliances" class="mb-2">Appliances</Label>
					<Input type="text" id="apliances" name="apliances" placeholder="Apliances"  />
				</div> -->
				<div class="w-full">
					<Label for="cooling" class="mb-2">Cooling</Label>

					<Checkbox name="cooling" value="Yes" bind:checked={checked} class="p-3">Yes/No</Checkbox>
					

{#if checked}
  <Input type="text" id="cooling_detail" name="cooling_detail" placeholder="Cooling Detail" />
{/if}
				
				</div>
				<div class="w-full">
					<Label for="heating" class="mb-2">Heating</Label>

					<Checkbox name="heating" value="Yes" bind:checked={checked} class="p-3">Yes/No</Checkbox>
					

{#if checked}
  <Input type="text" id="heating_detail" name="heating_detail" placeholder="Heating Detail" />
{/if}
				
				</div>
				<div class="sm:col-span-2">
					<Label for="extra_detail" class="mb-2">Extra Detail</Label>
					<ul class="items-center w-full rounded-lg border border-gray-200 sm:flex dark:bg-gray-800 dark:border-gray-600 divide-x rtl:divide-x-reverse divide-gray-200 dark:divide-gray-600">
						
						<Checkbox name="garage" value="Yes" class="p-3">Garage</Checkbox>
						<Checkbox name="parking" value="Yes" class="p-3">Parking</Checkbox>
						<Checkbox name="view" value="Yes" class="p-3">View</Checkbox>
						<Checkbox name="pool" value="Yes" class="p-3">Pool</Checkbox>
					
						
					  </ul>
				</div>
			
				
			</div>
			<div class="col-span-4">
				<div class="thumbSec w-full">
					<Label class="space-y-2 mb-2">
						<span>Upload Featured Image</span>
						<div class="relative cursor-pointer">
							<!-- Image Preview -->
							<img src={featured} class="object-cover w-full h-full" />
							<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
							<svg xmlns="http://www.w3.org/2000/svg"  width="56" height="56" viewBox="0 0 24 24"><path fill="currentColor" d="M19 13a1 1 0 0 0-1 1v.38l-1.48-1.48a2.79 2.79 0 0 0-3.93 0l-.7.7l-2.48-2.48a2.85 2.85 0 0 0-3.93 0L4 12.6V7a1 1 0 0 1 1-1h7a1 1 0 0 0 0-2H5a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3v-5a1 1 0 0 0-1-1M5 20a1 1 0 0 1-1-1v-3.57l2.9-2.9a.79.79 0 0 1 1.09 0l3.17 3.17l4.3 4.3Zm13-1a.89.89 0 0 1-.18.53L13.31 15l.7-.7a.77.77 0 0 1 1.1 0L18 17.21Zm4.71-14.71l-3-3a1 1 0 0 0-.33-.21a1 1 0 0 0-.76 0a1 1 0 0 0-.33.21l-3 3a1 1 0 0 0 1.42 1.42L18 4.41V10a1 1 0 0 0 2 0V4.41l1.29 1.3a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42"/></svg>

							</div>
							<!-- Hidden File Input -->
							<input
								type="file"
								name="featuredImage"
								class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
								on:change={handleFileChange} />
						</div>
					</Label>
				</div>
				<div class="grid grid-cols-2 gap-4 mb-4">
					<!-- Image Previews (Existing and New) -->
					{#each imagePreviews as preview, index}
						<div class="relative">
							<!-- svelte-ignore a11y-missing-attribute -->
							<img src={getImageSource(preview)} class="object-cover w-full h-full" />

							<!-- Delete Button -->
							<button
								class="absolute top-0 right-0 bg-red-500 text-white p-1"
								on:click={(event) => deleteImage(event, preview)}>
								X
							</button>
						</div>
					{/each}
					<!-- File Input for Adding New Images -->
					<Label class="relative cursor-pointer border-2 border-dashed p-4">
						<input
							type="file"
							multiple
							name="galleryImages"
							class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
							on:change={handleNewImages} />
						<div class="flex justify-center items-center h-full">
							<span>Add Images</span>
						</div>
					</Label>

					
				</div>
			</div>
		</div>
		<Button type="submit" class="w-40 h-auto ml-3 mt-8">Create</Button>
	</form>
</div>
