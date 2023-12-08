<script>
  import { onMount } from 'svelte';
  import { fetchJSON } from '$lib/util';
  import NotEditable from '$lib/components/NotEditable.svelte';
  import logo from '$lib/img/delusso.png';
  import logo2 from '$lib/img/logoGold.png';
  const navigation = [
		{ label: "About", href: "/about" },
		{ label: "Home Valuation", href: "/valuation" },
		{ label: "Concierge Services", href: "/concierge" },
		{ label: "Properties", href: "/properties" },

	
	]; 
</script>

<NotEditable>
  <footer class="p-4 bg-primary-700 md:p-8 lg:p-10  ">
    <div class="mx-auto max-w-screen-xl text-center">
        <a href="/" class="flex justify-center items-center text-2xl lg:text-3xl font-normal text-white pt-10 lg:pt-16">
          Ohio Concierge Realty Group  
        </a>      
        <ul class="flex flex-wrap justify-center items-center my-8 text-white">
          {#each navigation as nav }
          <li>
            <a href={nav.href} class="mr-4 hover:underline md:mr-6 text-white font-thin">{nav.label}</a>
        </li>
          {/each}
            
      
        </ul>
        <span class="text-sm text-gray-300 sm:text-center ">© 2021-2024  <a href="#" class="text-gray-300 hover:underline ">DiLusso™</a>. All Rights Reserved.</span>
    </div>
  </footer>
</NotEditable>
