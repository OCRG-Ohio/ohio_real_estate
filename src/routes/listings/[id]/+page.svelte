<script lang="ts">
	import type { PageData } from '../[id]/$types'
	import { Section } from 'flowbite-svelte-blocks';
    import { Label, Input, Button, Select, Textarea ,Gallery,Checkbox ,Fileupload} from 'flowbite-svelte';
	import WebsiteHeader from '$lib/components/WebsiteHeader.svelte';
	import PrimaryButton from '$lib/components/PrimaryButton.svelte';
	import LoginMenu from '$lib/components/LoginMenu.svelte';
    
	let textareaprops = {
    id: 'content',
    name: 'content',
    label: 'Property Detail',
    rows: 4,
    placeholder: 'Enter Property Highlights...'
  };
	let selectedTypes = [];
    let types = [ { value: 'tv', name: 'TV/Monitors' },
    { value: 'pc', name: 'PC' },
    { value: 'phone', name: 'Phones' }];
	export let data: PageData;
    let property: { media: { asset_id: number; mime_type: string; updated_at: Date | null; size: number; url: string; propertyId: number | null; }[]; } & { id: number; title: string; content: string | null; address: string; city_state: string | null; price: number | null; beds: number | null; baths: number | null; area: number | null; category: string | null; type: string[]; created_at: Date; updated_at: Date | null; featuredImage: string | null; };
    let images: {
		alt: string; // Example alt text, you can customize this
		src: string;
	}[] = [];

    $: if (data && data.property) {
        property = data.property;
        // Transform the media array to the format expected by Gallery
        images = property.media.map((img, index) => ({
            alt: `Image ${index + 1}`, // Example alt text, you can customize this
            src: img.url
        }));
    }


	function toggleEdit(e: MouseEvent): void {
		throw new Error('Function not implemented.');
	}
</script>


<WebsiteHeader class="bg-white">
	<PrimaryButton on:click={toggleEdit}>Edit page</PrimaryButton>
	<LoginMenu />
</WebsiteHeader>

<Section name="crudcreateform" >
	<h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white mt-16">Edit Property</h2>
	<form action="?/updateArticle" method="POST">
	  <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
		<!-- Title Field -->
		<div class="sm:col-span-2">
		  <Label for="title" class="mb-2">Title</Label>
		  <Input type="text" id="title" name="title" placeholder="Property title" required  value={property.title}/>
		</div>
		<div class="sm:col-span-2">
			<Textarea {...textareaprops} value={property.content}/>
		</div>
		
		<!-- Address Field -->
		<div class="w-full">
		  <Label for="address" class="mb-2">Address</Label>
		  <Input type="text" id="address" name="address" placeholder="Property address" required value={property.address}/>
		</div>
		
		<!-- City and State Field -->
		<div class="w-full">
		  <Label for="city_state" class="mb-2">City and State</Label>
		  <Input type="text" id="city_state" name="city_state" placeholder="City and State" required value={property.city_state}/>
		</div>
		
		<!-- Price Field -->
		<div class="w-full">
		  <Label for="price" class="mb-2">Price</Label>
		  <Input type="text" id="price" name="price" placeholder="Price" required value={property.price}/>
		</div>
  
		<!-- Beds Field -->
		<div class="w-full">
		  <Label for="beds" class="mb-2">Beds</Label>
		  <Input type="number" id="beds" name="beds" placeholder="Number of beds" required value={property.beds}/>
		</div>
  
		<!-- Baths Field -->
		<div class="w-full">
		  <Label for="baths" class="mb-2">Baths</Label>
		  <Input type="number" id="baths" name="baths" placeholder="Number of baths" required value={property.baths}/>
		</div>
  
		<!-- Area Field -->
		<div class="w-full">
		  <Label for="area" class="mb-2">Area (sqft)</Label>
		  <Input type="number" id="area" name="area" placeholder="Area in square feet" required value={property.area}/>
		</div>
  
		<!-- Type Field -->
		<div class="w-full">
			<Label for="type" class="mb-2">Type</Label>
			<Select class="mt-2" items={types} bind:value={selectedTypes} name="type" />
		</div>
		<div class="w-full">
			<Label for="category" class="mb-2">Category</Label>
<ul class=" bg-white rounded-lg border border-gray-200 flex">

<li><Checkbox name="category" value={property.category} class="p-3">For Sale</Checkbox></li>
<li><Checkbox name="category" value={property.category} class="p-3">For Lease</Checkbox></li>

</ul>
		</div>
		<Label for="featuredImage">Featured Image</Label>

		<Fileupload type="file" id="file" name="featuredImage" required />
		<Label for="galleryImages">Gallery Images</Label>
		<Fileupload type="file" id="galleryImages" name="galleryImages" multiple />
		<Button type="submit" class="w-40">Update</Button>
	  </div>
	</form>
    
	<Gallery class="gap-6 grid grid-cols-4 mt-8" items={images} let:item>
		<div class="overflow-hidden w-40 h-40 relative rounded">
		  <img src={item.src} alt={item.alt} class="object-cover w-full h-full" />
		  <form action={`?/deleteGalleryImage/${item.asset_id}`} method="POST">
            <Button type="submit">Delete Image</Button>
        </form>
		</div>
	  </Gallery>
	<!-- <img src={property.featuredImageUrl} alt=""> -->
  </Section>