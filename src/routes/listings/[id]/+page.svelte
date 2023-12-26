<script lang="ts">
import PlaceHolder from "$lib/img/placeHolder.jpg"

	import { writable } from 'svelte/store';
	import type { ActionData, PageData } from "../[id]/$types";
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
	import placeHolder from "$lib/img/placeHolder.jpg";

	let textareaprops = {
		id: "content",
		name: "content",
		label: "Property Detail",
		rows: 4,
		placeholder: "Enter Property Highlights..."
	};
	export let form: ActionData;
	let selectedType = "";
	let types = [
		{ value: "tv", name: "TV/Monitors" },
		{ value: "pc", name: "PC" },
		{ value: "phone", name: "Phones" }
	];
	export let data: PageData;
	let property: {
		media: {
			asset_id: number;
			mime_type: string;
			updated_at: Date | null;
			size: number;
			url: string;
			propertyId: number | null;
		}[];
	} & {
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
		type: string[];
		created_at: Date;
		updated_at: Date | null;
		featuredImage: string | null;
	};
	let existingImages: any[] = [];
	// New images selected for upload
	let newImages: any[] = [];
	let imagePreviews: any[] = [];
	let featured = [];
	

	$: if (data && data.property) {
		property = data.property;
		featured = property.featuredImage || placeHolder;
		// Transform the media array to the format expected by Gallery
		existingImages = Array.isArray(property.media) ? [...property.media] : [];
		imagePreviews = [...existingImages];
	}

	function toggleEdit(e: MouseEvent): void {
		throw new Error("Function not implemented.");
	}
	function handleFileChange(event: { target: { files: any[] } }) {
		const file = event.target.files[0];
		if (file) {
			featured = URL.createObjectURL(file);
		}
	}
	// Handle new image selection
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

	// Delete image preview and update lists
	let deletedMediaIds = [];

async function deleteImage(event, imagePreview) {
    console.log('Delete button clicked');
    event.preventDefault(); // Prevent the default form submission behavior

    try {
        console.log('imagePreview:', imagePreview);
        console.log('Existing Media URLs:', existingImages.map((media) => media.url));

        // Check if the image to delete is an existing image
        const existingMediaToDelete = existingImages.find((media) => media.url === imagePreview.url);

        if (existingMediaToDelete) {
            // Now make the API call to delete the existing image from the server
            const assetId = existingMediaToDelete.asset_id;
            const response = await fetch('/api/delete-gallery', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ assetId }),
            });

            if (response.ok) {
                const result = await response.json();
                if (result.success) {
                    console.log('Existing media deleted successfully');
                    
                    // Remove the image preview from the existingMedia array after API deletion
                    const deletedMediaIndex = existingImages.indexOf(existingMediaToDelete);
                    if (deletedMediaIndex !== -1) {
                        existingImages.splice(deletedMediaIndex, 1);
                    }
                } else {
                    console.error('Error deleting existing media:', result.error);
                    // Handle deletion failure, show an error message, etc.
                }
            } else {
                console.error('Error deleting existing media:', response.statusText);
                // Handle error, show an error message to the user, or implement retry logic
            }
        }

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
	<a href="/listings" alt="navigation" class="border-2 mb-3 px-3 py-1 inline-flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M20 11H7.83l5.59-5.59L12 4l-8 8l8 8l1.41-1.41L7.83 13H20z"/></svg>View All</a>
	{#if form?.success}
		<Alert color="green" class="text-center mb-4">
			<span class="font-medium ">Listing Updated!</span>
		</Alert>	
	{/if}
	<h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white ">Edit Property</h2>
	<form action="?/updateProperty" method="POST" enctype="multipart/form-data">
		<div class="container mx-auto grid grid-cols-12 gap-10">
			<div class="grid gap-4 sm:grid-cols-2 sm:gap-6 md:col-span-8">
				<!-- Title Field -->
				<div class="sm:col-span-2">
				  <Label for="title" class="mb-2">Title</Label>
				  <Input
					type="text"
					id="title"
					name="title"
					placeholder="Property title"
					required
					value={property.title}
				  />
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
					value={property.address}
				  />
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
					value={property.city_state}
				  />
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
					value={property.price}
				  />
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
					value={property.beds}
				  />
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
					value={property.baths}
				  />
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
					value={property.area}
				  />
				</div>
			  
				<!-- Type Field -->
				<div class="w-full">
				  <Label for="type" class="mb-2">Type</Label>
				  <Select class="mt-2" items={types} value={property.type} name="type" />
				</div>
				<div class="w-full">
				  <Label for="category" class="mb-2">Category</Label>
				  <ul class="bg-white rounded-lg border border-gray-200 flex">
					<li>
					  <Checkbox name="category" value={property.category} class="p-3">For Sale</Checkbox>
					</li>
					<li>
					  <Checkbox name="category" value={property.category} class="p-3">For Lease</Checkbox>
					</li>
				  </ul>
				</div>
			  
				<!-- Cooling Field -->
				<div class="w-full">
				  <Label for="cooling" class="mb-2">Cooling</Label>
				  {#if property.cooling === 'Yes'}
				  <Checkbox name="cooling" value="Yes" checked={true} class="p-3">Yes/No</Checkbox>
				{:else}
				  <Checkbox name="cooling" value="No" checked={false} class="p-3">Yes/No</Checkbox>
				{/if}
				</div>
				{#if property.cooling === 'Yes'}
				  <div class="w-full">
					<Label for="cooling_detail" class="mb-2">Cooling Detail</Label>
					<Input type="text" id="cooling_detail" name="cooling_detail" placeholder="Cooling Detail" value={property.cooling_detail} />
				  </div>
				{/if}
			  
				<!-- Heating Field -->
			<div class="w-full">
				  <Label for="heating" class="mb-2">Heating</Label>
				  <Checkbox name="heating" value="Yes" checked={property.heating === 'Yes'} class="p-3">Yes/No</Checkbox>
				</div>
				{#if property.heating === 'Yes'}
				  <div class="w-full">
					<Label for="heating_detail" class="mb-2">Heating Detail</Label>
					<Input type="text" id="heating_detail" name="heating_detail" placeholder="Heating Detail" value={property.heating_detail} />
				  </div>
				{/if}

				<!-- Extra Details -->
<div class="sm:col-span-2">
	<Label for="extra_detail" class="mb-2">Extra Detail</Label>
	<ul class="items-center w-full rounded-lg border border-gray-200 sm:flex dark:bg-gray-800 dark:border-gray-600 divide-x rtl:divide-x-reverse divide-gray-200 dark:divide-gray-600">
	  <li>
		<Checkbox name="Garage" value="Yes" checked={property.garage === 'Yes'} class="p-3">Garage</Checkbox>
	  </li>
	  <li>
		<Checkbox name="parking" value="Yes" checked={property.parking === 'Yes'} class="p-3">Parking</Checkbox>
	  </li>
	  <li>
		<Checkbox name="view" value="Yes" checked={property.view === 'Yes'} class="p-3">View</Checkbox>
	  </li>
	  <li>
		<Checkbox name="pool" value="Yes" checked={property.pool === 'Yes'} class="p-3">Pool</Checkbox>
	  </li>
	</ul>
  </div>
			  </div>
			  
			<div class="col-span-4">
				<div class="thumbSec w-full">
					<Label class="space-y-2 mb-4">
						<span>Upload Featured Image</span>
						<div class="relative cursor-pointer">
							<!-- Image Preview -->
							<img src={featured} class="object-cover w-full h-full" />

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
					
			
					<input type="hidden" multiple name="deletedMediaIds" value={JSON.stringify(deletedMediaIds)} />


		
				</div>
			</div>
		</div>
		<Button type="submit" class="w-40 h-auto ml-3 mt-8">Update</Button>
	</form>
</div>
