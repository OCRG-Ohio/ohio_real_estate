<script>
  import { classNames } from '$lib/util';
  import Modal from './Modal.svelte';
  import NotEditable from './NotEditable.svelte';
  import Search from './Search.svelte';
  import { isEditing, currentUser } from '$lib/stores.js';
  import { page } from '$app/stores';
  $: activeUrl = $page.url.pathname;
  $: whiteNav = (activeUrl === '/valuation' || activeUrl === '/' )
  ? 'whiteNav' 
  : '';
  let activeClass = ' font-normal';
  let nonActiveClass = 'text-gray-800 hover:text-primar-700 font-normal';
import siteLogo from "$lib/img/delusso.png"
import { ArrowRightOutline } from 'flowbite-svelte-icons';
import gsap from 'gsap';
	import ScrollTrigger from 'gsap/dist/ScrollTrigger';

  const navigation = [
		{ label: "About", href: "/about" },
		{ label: "Property Valuation", href: "/valuation" },
		{ label: "Concierge Services", href: "/concierge" },
		{ label: "Properties", href: "/properties" },
    {label: "Blog", href: "/blog" },	
    {label: "Contact", href: "/contact" },	
	]; 
	import { onMount } from "svelte";
	import { invalidate } from "$app/navigation";
	import { Toaster } from "svelte-french-toast";
  import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
  import { Button, Dropdown, DropdownItem } from 'flowbite-svelte';
  import { ChevronDownSolid } from 'flowbite-svelte-icons';


  // TODO: Replace with a globally managed context menu implementation (only one active)
  export let showUserMenu = undefined;
  export let showSearch = undefined; 

  function onKeyDown(e) {
    // Close modals
    if (e.key === 'Escape') {
      showSearch = false;
      showUserMenu = false;
    }
    // Trigger the search panel
    if (e.key === 'k' && e.metaKey) {
      showSearch = true;
    }
    // Turn on editing
    if (e.key === 'e' && e.metaKey) {
      $isEditing = true;
      console.log('Editing enabled');
    }
  }

  async function handleLogout() {
    try {
      const response = await fetch('/api/logout', {
        method: 'POST', // or 'GET' depending on your server setup
        headers: {
          'Content-Type': 'application/json',
          // You might need to include additional headers, like authorization token
        },
      });

      if (response.ok) {
        // The logout was successful, handle accordingly
        console.log('Logout successful');
      } else {
        // Handle errors
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('An error occurred during logout', error);
    }
  }

  onMount(() => {
gsap.registerPlugin(ScrollTrigger);


  ScrollTrigger.create({
  start: 'top -96',
  end: 99999,
  toggleClass: {className: 'navsmaller', targets: '.mainNav'},
  
});
  });
</script>

    <NotEditable>

      <Navbar  class="fixed z-20  mainNav bg-transparent shadow {whiteNav}" >
        <NavBrand href="/">
          <!-- <img src={siteLogo} class="mr-3 h-6 sm:h-9" alt="Flowbite Logo" /> -->
          <span class="logo self-center whitespace-nowrap text-xl font-medium">DI LUSSO</span>
        </NavBrand>
        <div class="flex md:order-2 flex-nowrap">
          {#if $currentUser}
        <Button class="bg-transparent dashBtn text-primary-700 p-0 hover:bg-transparent outline-0 focus-within:ring-0">Admin<ChevronDownSolid class="w-3 h-3 ml-2 text-primary-700 dark:text-white" /></Button>
        <Dropdown class="p-4">
          <DropdownItem href="/account">Settings</DropdownItem>
          <DropdownItem href="/listings">Dashboard</DropdownItem>
          <DropdownItem>
            <button on:click={() => (showUserMenu = !showUserMenu)}>
              Edit Website
            </button>
          </DropdownItem>
          <form action="/logout" method="POST">
            <DropdownItem type="submit" slot="footer">Sign out</DropdownItem>
          </form>
        </Dropdown>
      {:else}
        <a href="/contact" class="myBtn  ">
          Contact 
        </a>
      {/if}
          <NavHamburger />
        </div>
      
        <NavUl {activeUrl} {activeClass} {nonActiveClass} class="order-1 navigation">
          {#each navigation as nav,i}
          <NavLi href={nav.href} class={activeUrl === nav.href ? 'activeClass' : 'nonActiveClass'}>{nav.label}</NavLi>
          {/each}
          
         
        </NavUl>
      
        

      </Navbar>           
  
    </NotEditable>

<svelte:window on:keydown={onKeyDown} />


