<script lang="ts">
	import type { ActionData, PageData } from '../[id]/$types'
	import { Section } from 'flowbite-svelte-blocks';
    import { Label, Input, Button, Select, Textarea ,Gallery,Checkbox ,Fileupload,Alert} from 'flowbite-svelte';
	import WebsiteHeader from '$lib/components/WebsiteHeader.svelte';
	import PrimaryButton from '$lib/components/PrimaryButton.svelte';
	import LoginMenu from '$lib/components/LoginMenu.svelte';
	import placeHolder from "$lib/img/placeHolder.jpg";
    
	let textareaprops = {
    id: 'content',
    name: 'content',
    label: 'Property Detail',
    rows: 4,
    placeholder: 'Enter Property Highlights...'
  };
  export let form: ActionData;
	let selectedType="";
    let types = [ { value: 'tv', name: 'TV/Monitors' },
    { value: 'pc', name: 'PC' },
    { value: 'phone', name: 'Phones' }];
	export let data: PageData;
    let property: { media: { asset_id: number; mime_type: string; updated_at: Date | null; size: number; url: string; propertyId: number | null; }[]; } & { id: number; title: string; content: string | null; address: string; city_state: string | null; price: number | null; beds: number | null; baths: number | null; area: number | null; category: string | null; type: string[]; created_at: Date; updated_at: Date | null; featuredImage: string | null; };
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
		throw new Error('Function not implemented.');
	}
	function handleFileChange(event: { target: { files: any[] } }) {
		const file = event.target.files[0];
		if (file) {
			featured = URL.createObjectURL(file);
		}
	}
  // Handle new image selection
  function handleNewImages(event: { target: { files: Iterable<unknown> | ArrayLike<unknown>; }; }) {
        const files = Array.from(event.target.files);
        newImages = [...newImages, ...files];
        imagePreviews = [...imagePreviews, ...files.map(file => URL.createObjectURL(file))];
    }

    // Delete image preview and update lists
    function deleteImage(imagePreview: string) {
		event.preventDefault();
        imagePreviews = imagePreviews.filter(preview => preview !== imagePreview);
        if (existingImages.includes(imagePreview)) {
            existingImages = existingImages.filter(img => img !== imagePreview);
            // Optionally, make an API call to delete the image from the server
        } else {
            newImages = newImages.filter(file => URL.createObjectURL(file) !== imagePreview);
        }
    }
	function getImageSource(preview) {
    return typeof preview === 'string' ? preview : preview.url;
  }


</script>


<WebsiteHeader class="bg-white">
	<PrimaryButton on:click={toggleEdit}>Edit page</PrimaryButton>
	<LoginMenu />
</WebsiteHeader>

<div class="crudcreateform py-16 md:px-16">
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
	<form action="?/updateProperty" method="POST" enctype="multipart/form-data">
		<div class="container mx-auto grid grid-cols-12 gap-10 ">
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
			</div>
			<div class="col-span-4">
				<div class="thumbSec w-full">
					<Label class="space-y-2 mb-2">
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
							<button class="absolute top-0 right-0 bg-red-500 text-white p-1" on:click={() => deleteImage(preview)}>
								X
							</button>
						</div>
					{/each}
				
					<!-- File Input for Adding New Images -->
					<Label class="relative cursor-pointer border-2 border-dashed p-4">
						<input type="file" multiple name="galleryImages" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer" on:change={handleNewImages} />
						<div class="flex justify-center items-center h-full">
							<span>Add Images</span>
						</div>
					</Label>
				</div>
			</div>
		</div>
		<Button type="submit" class="w-40 h-auto ml-3 mt-8">Update</Button>
	</form>
	</div>