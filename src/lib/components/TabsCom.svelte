<script lang="ts">
	import { Tabs, TabItem } from 'flowbite-svelte';
  import PlainText from './PlainText.svelte';
  import RichText from './RichText.svelte'; 
  export let open = false;
  export let tab;
</script>    
<TabItem open={open}>
  <span slot="title">
    <PlainText bind:content={tab.title} />
  </span>
  <div class="conceirageServicesTab">
    <RichText multiLine bind:content={tab.detail} />
  </div>
</TabItem>

   

     
   

