<script lang="ts">
	import "../app.css";
	import "../media.css";
	import Footer from '$lib/components/Footer.svelte';
import { injectSpeedInsights } from "@vercel/speed-insights/sveltekit"
	import { page } from "$app/stores";
	
	import type { LayoutData } from "./$types";
	import { onMount } from "svelte";
	import { invalidate } from "$app/navigation";
	import { Toaster } from "svelte-french-toast";
	import { currentUser, isEditing } from '$lib/stores.js';
	const navigation = [
		{ label: "Home", href: "/" },
		{ label: "Pricing", href: "/pricing" },
		{ label: "Contacts", href: "/contacts" }
	];
	
	export let data: LayoutData;

	$: ({ session, supabase } = data);



   

	onMount(async () => {
    const authChangePromise = new Promise<void>((resolve) => {
      const { data: { subscription } } = supabase.auth.onAuthStateChange((event, _session) => {
        if (_session?.expires_at !== session?.expires_at) {
          invalidate("supabase:auth");
        }
        currentUser.set(session?.user);
        resolve(); // Resolve the promise when the authentication state changes
      });
      return () => subscription.unsubscribe();
    });

    await authChangePromise; // Wait for the promise to resolve before continuing
	});
</script>

<svelte:head>
	<title>Ohio Concierge Realty Group</title>
</svelte:head>
<Toaster></Toaster>
<div class="overflow-x-hidden ">	
			<slot></slot>	
<Footer></Footer>
</div>
