<script>
	import { AccordionItem } from "flowbite-svelte";
    import PlainText from './PlainText.svelte';
  import RichText from './RichText.svelte'; 
  export let open = false;
  export let drop;
</script>

<AccordionItem {open}>
    <span slot="header">
        <PlainText bind:content={drop.title} />

    </span>
    <p class="mb-2 mt-1 text-dark">
        <PlainText bind:content={drop.detail} />       
    </p>
</AccordionItem>