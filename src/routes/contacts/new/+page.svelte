<script lang="ts">
    import { Section } from 'flowbite-svelte-blocks';
    import { Label, Input, Button, Select, Textarea } from 'flowbite-svelte';
    let selectedTypes = [];
    let types = [ { value: 'tv', name: 'TV/Monitors' },
    { value: 'pc', name: 'PC' },
    { value: 'phone', name: 'Phones' }]; // Populate with available types for property
    let media = []; // Populate with available media options
    </script>
    
    <Section name="crudcreateform">
        <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">Add a New Property</h2>
        <form method="POST">
          <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <!-- Title Field -->
            <div class="sm:col-span-2">
              <Label for="title" class="mb-2">Title</Label>
              <Input type="text" id="title" name="title" placeholder="Property title" required />
            </div>
            
            <!-- Address Field -->
            <div class="sm:col-span-2">
              <Label for="address" class="mb-2">Address</Label>
              <Input type="text" id="address" name="address" placeholder="Property address" required />
            </div>
            
            <!-- City and State Field -->
            <div class="sm:col-span-2">
              <Label for="city_state" class="mb-2">City and State</Label>
              <Input type="text" id="city_state" name="city_state" placeholder="City and State" required />
            </div>
            
            <!-- Price Field -->
            <div class="w-full">
              <Label for="price" class="mb-2">Price</Label>
              <Input type="text" id="price" name="price" placeholder="Price" required />
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
            <Button type="submit" class="w-40">Add Property</Button>
          </div>
        </form>
      </Section>
    