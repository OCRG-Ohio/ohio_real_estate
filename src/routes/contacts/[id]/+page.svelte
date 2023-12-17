<script lang="ts">
	import type { PageData } from '../[contactId]/$types'

	export let data: PageData
	$: ({ property } = data)
</script>

<form action="?/updateArticle" method="POST">
	<h3>Editing: {property.title}</h3>
	<label for="title"> Title </label>
	<input type="text" id="title" name="title" value={property.title} />
	<label for="title"> Title </label>
	<textarea id="address" name="address" rows={5} value={property.address} />
	<button type="submit">Update Article</button>
</form>