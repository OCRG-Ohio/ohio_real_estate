<script>
	import PlainText from "./PlainText.svelte";
	import RichText from "./RichText.svelte";

	export let intro;
</script>

<h2><PlainText bind:content={intro.title} /></h2>

<p>
	<RichText bind:content={intro.description} />
</p>
