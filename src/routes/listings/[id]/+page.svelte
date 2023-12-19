<script lang="ts">
	import type { PageData } from '../[id]/$types'
	import { Section } from 'flowbite-svelte-blocks';
    import { Label, Input, Button, Select, Textarea } from 'flowbite-svelte';
	import WebsiteHeader from '$lib/components/WebsiteHeader.svelte';
    
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
	export let data: PageData
	$: ({ property } = data)
</script>

<!-- <form action="?/updateArticle" method="POST">
	<h3>Editing: {property.title}</h3>
	<label for="title"> Title </label>
	<input type="text" id="title" name="title" value={property.title} />
	<label for="title"> Title </label>
	<textarea id="address" name="address" rows={5} value={property.address} />
	<button type="submit">Update Article</button>
</form> -->
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
		<div class="sm:col-span-2">
		  <Label for="type" class="mb-2">Type</Label>
		  <Select class="mt-2" items={types} bind:value={selectedTypes}  name="type"/>
		</div>
  
		<!-- Property Media Field -->
		<!-- <div class="sm:col-span-2">
		  <Label for="media" class="mb-2">Property Media</Label>
		  <Select items={media} name="propertyMedia" multiple required />
		</div> -->
  
		<!-- Submit Button -->
		<Button type="submit" class="w-40">Update</Button>
	  </div>
	</form>

	<img src={property.featuredImageUrl} alt="">
  </Section>