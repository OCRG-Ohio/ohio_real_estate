<script>
  import { onMount } from 'svelte';
  import { fetchJSON } from '$lib/util';
  import NotEditable from '$lib/components/NotEditable.svelte';
  import logo from '$lib/img/delusso.png';
  import logo1 from '$lib/img/RelatedLogo.svg';
  import logo2 from '$lib/img/Equal.svg';
  const navigation = [
		{ label: "About", href: "/about" },
		{ label: "Home Valuation", href: "/valuation" },
		{ label: "Concierge Services", href: "/concierge" },
		{ label: "Properties", href: "/properties" },

	
	]; 
</script>

<NotEditable>
  <footer class="p-4 bg-primary-700 py-8 md:pt-16 lg:pt-20  ">
    <div class="mx-auto max-w-screen-xl text-center">
        <!-- <a href="/" class="flex justify-center items-center text-xl lg:text-3xl font-normal text-white pt-10 lg:pt-16">
          Ohio Concierge Realty Group  
        </a>   -->
        <div class="footerLogos flex justify-evenly items-end ">
          <a href=""><img class="h-8" src={logo1} alt=""></a>
          <a href=""><img class="h-10" src={logo2} alt=""></a>
        </div>
<div class="contact my-8">
  <a class="text-white text-base"  href="#">Contact Us +1 123 456 7890 </a>
  <p class="text-white text-base mt-0" >123 Main Street Columbus, OH 43215 USA</p> 
  <a class="text-white text-base"  href="#">loremipsum@mail.com</a>  
</div>
         
        <ul class="flex flex-wrap justify-center items-center py-2 mb-8 text-white ">
          {#each navigation as nav }
          <li>
            <a href={nav.href} class="mr-4 hover:underline md:mr-6 text-white text-base  lg:text-lg font-light">{nav.label}</a>
        </li>
          {/each}           
      
        </ul>
        <span class="text-sm text-gray-300 sm:text-center ">© 2021-2024  <a href="#" class="text-gray-300 hover:underline ">DiLusso™</a>. All Rights Reserved.</span>
    </div>
  </footer>
</NotEditable>
