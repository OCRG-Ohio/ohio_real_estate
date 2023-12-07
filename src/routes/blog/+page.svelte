<script>
  import { goto } from '$app/navigation';
  import PrimaryButton from '$lib/components/PrimaryButton.svelte';
  import LoginMenu from '$lib/components/LoginMenu.svelte';
  import ArticleTeaser from '$lib/components/ArticleTeaser.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import EditableWebsiteTeaser from '$lib/components/EditableWebsiteTeaser.svelte';
  import { currentUser } from '$lib/stores.js';
  import WebsiteHeader from '$lib/components/WebsiteHeader.svelte';
	import { onMount } from "svelte";
  import { Section, BlogBodyWrapper,BlogHead } from 'flowbite-svelte-blocks';
  import { VideoSolid, ArrowRightOutline, NewspaperSolid } from 'flowbite-svelte-icons';
  import { writable } from 'svelte/store';

export const blogPosts = writable([]);

  export let data;
  let showUserMenu;

  onMount(async () => {   // Fetch your blog posts from the server
   
    
    // Update the store with the fetched posts
   blogPosts.set(data.articles);
   localStorage.setItem('blogPosts', JSON.stringify(data.articles));
  });

</script>

<svelte:head>
  <title>Blog</title>
  <meta name="description" content="What you always wanted to know about web development." />
</svelte:head>
<WebsiteHeader bind:showUserMenu>
  <div class="w-full flex flex-col space-y-4 p-4 sm:p-6">
    <PrimaryButton type="button" on:click={() => goto('/blog/new')}>New blog post</PrimaryButton>
    <LoginMenu />
  </div>
</WebsiteHeader>

<Section name="blog" sectionClass="mt-20 md:mt-24 lg:mt-30">
  <BlogHead>
    <svelte:fragment slot="h2">Our Blog</svelte:fragment>
    <svelte:fragment slot="paragraph">
      <p class="font-light text-gray-500 sm:text-xl dark:text-gray-400">We use an agile approach to test assumptions and connect with the needs of your audience early and often.</p>
    </svelte:fragment>
  </BlogHead>
  <BlogBodyWrapper divClass="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {#each data.articles as article, i}
    <ArticleTeaser {article} firstEntry={i === 0} />
    {/each}
 
  </BlogBodyWrapper>
</Section>





