<script>
	import { goto } from "$app/navigation";
	import PrimaryButton from "$lib/components/PrimaryButton.svelte";
	import LoginMenu from "$lib/components/LoginMenu.svelte";
	import ArticleTeaser from "$lib/components/ArticleTeaser.svelte";
	import Footer from "$lib/components/Footer.svelte";
	import EditableWebsiteTeaser from "$lib/components/EditableWebsiteTeaser.svelte";
	import { currentUser } from "$lib/stores.js";
	import WebsiteHeader from "$lib/components/WebsiteHeader.svelte";
	import { onMount } from "svelte";
	import { Section, BlogBodyWrapper, BlogHead } from "flowbite-svelte-blocks";
	import { VideoSolid, ArrowRightOutline, NewspaperSolid } from "flowbite-svelte-icons";
	import { writable } from "svelte/store";

	export const blogPosts = writable([]);

	export let data;
	let showUserMenu;

	onMount(async () => {
		// Fetch your blog posts from the server

		// Update the store with the fetched posts
		blogPosts.set(data.articles);
		localStorage.setItem("blogPosts", JSON.stringify(data.articles));
	});
</script>

<svelte:head>
	<title>Blog</title>
	<meta name="description" content="What you always wanted to know about web development." />
</svelte:head>
<WebsiteHeader bind:showUserMenu>
	<div class="w-full flex flex-col space-y-4 p-4 sm:p-6">
		<PrimaryButton type="button" on:click={() => goto("/blog/new")}>New blog post</PrimaryButton>
		<LoginMenu />
	</div>
</WebsiteHeader>

<!-- <Section name="blog" sectionClass="mt-20 md:mt-24 lg:mt-30">
	<BlogHead>
		<svelte:fragment slot="h2">Our Blog</svelte:fragment>
		<svelte:fragment slot="paragraph">
			<p class="font-light text-gray-500 sm:text-xl dark:text-gray-400">
				We use an agile approach to test assumptions and connect with the needs of your audience
				early and often.
			</p>
		</svelte:fragment>
	</BlogHead>
	<BlogBodyWrapper divClass="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
		{#each data.articles as article, i}
			<ArticleTeaser {article} firstEntry={i === 0} />
		{/each}
	</BlogBodyWrapper>
</Section> -->

<div class="max-w-[1480px] mx-auto px-5 sm:px-8 mt-20 md:mt-24 lg:mt-40">
	<h1 class="text-3xl sm:text-6xl sm:leading-tight max-w-screen-xl font-normal">
		<b> This is Micca.</b> A blog that covers productivity, tips, inspiration, and strategies for massive
		profits.
	</h1>
	<h2 class="mb-4 font-medium text-base uppercase tracking-wider mt-20">Featured Posts</h2>
	<div class="flex flex-wrap xl:flex-nowrap gap-10">
		<div class="basis-full xl:basis-[65%] shrink-0">
			<a
				class="block"
				href="blog/the-only-limit-to-our-realization-of-tomorrow-will-be-our-doubts-of-today.html">
				<div class="block relative pt-[75%] bg-black/5 dark:bg-white/5">
					<img
						alt="Post thumbnail"
						src="https://picsum.photos/950/500"
						decoding="async"
						data-nimg="fill"
						loading="lazy"
						style="position:absolute;height:100%;width:100%;left:0;top:0;right:0;bottom:0;object-fit:cover;color:transparent" />
				</div>
			</a>
			<div class="flex flex-wrap gap-3 items-center mt-8">
				<div class="flex flex-wrap gap-3">
					<a
						class="text-xs font-medium uppercase rounded-full py-1.5 px-2.5 border border-black text-black hover:bg-black hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black tracking-wide whitespace-nowrap"
						href="category/inspirational.html">inspirational</a>
				</div>
				<div class="text-sm data-color flex items-center">
					<span class="whitespace-nowrap">Jul 8, 2022</span><span class="px-2.5">⋅</span><span
						class="whitespace-nowrap">5 min read</span>
				</div>
			</div>
			<h2 class="font-bold leading-snug mt-4 text-2xl sm:text-4xl">
				<a
					href="blog/the-only-limit-to-our-realization-of-tomorrow-will-be-our-doubts-of-today.html"
					>The only limit to our realization of tomorrow will be our doubts of today</a>
			</h2>
			<p class="mt-4 sm:text-lg">
				Nostrud proident cupidatat quis commodo aliquip aliqua dolor exercitation mollit aliquip
				aliquip exercitation anim enim laboris reprehenderit excepteur anim. Et ea sunt laboris
				ullamco duis sit sit eu qui ut duis consectetur fugiat ullamco ex incididunt.
			</p>
			<div class="flex gap-2 items-center mt-6">
				<div class="flex">
					<a class="flex -ml-3 first:ml-0 first:z-10 hover:z-20" href="author/main.html">
						<div
							class="rounded-full overflow-hidden border-4 border-gray-200 dark:border-gray-700 inline-block leading-[0] !border-2"
							style="width:30px;height:30px">
							<div class="pt-[100%] relative">
								<img
									sizes="30px"
									alt="Post thumbnail"
									src="https://picsum.photos/950/500"
									decoding="async"
									data-nimg="fill"
									loading="lazy"
									style="position:absolute;height:100%;width:100%;left:0;top:0;right:0;bottom:0;object-fit:cover;color:transparent" />
							</div>
						</div>
					</a>
				</div>
				<div>
					<a class="text-sm font-medium heading-color" href="author/main.html">Keith Brandie</a>
				</div>
			</div>
		</div>
		<div class="flex flex-col md:flex-row xl:flex-col gap-10">
			<div class="flex-1">
				<a class="block" href="blog/chinese-art-in-the-modern-world.html">
					<div class="block relative pt-[75%] bg-black/5 dark:bg-white/5">
						<img
							alt="Post thumbnail"
							sizes="(max-width: 767px) 95vw, (max-width: 1279px) 40vw, 450px"
							src="https://picsum.photos/950/500"
							decoding="async"
							data-nimg="fill"
							loading="lazy"
							style="position:absolute;height:100%;width:100%;left:0;top:0;right:0;bottom:0;object-fit:cover;color:transparent" />
					</div>
				</a>
				<div class="flex flex-wrap gap-3 items-center mt-6">
					<div class="flex flex-wrap gap-3">
						<a
							class="text-xs font-medium uppercase rounded-full py-1.5 px-2.5 border border-black text-black hover:bg-black hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black tracking-wide whitespace-nowrap"
							href="category/life%20lessons.html">life lessons</a>
					</div>
					<div class="text-sm data-color flex items-center">
						<span class="whitespace-nowrap">Apr 29, 2022</span><span class="px-2.5">⋅</span><span
							class="whitespace-nowrap">4 min read</span>
					</div>
				</div>
				<h2 class="font-bold leading-snug mt-3 text-2xl">
					<a href="blog/chinese-art-in-the-modern-world.html">Chinese art in the modern world</a>
				</h2>
				<p class="mt-3">
					Enim eu laborum ex reprehenderit quis sit velit consectetur quis ipsum nisi laboris magna
					irure in.
				</p>
			</div>
			<div class="flex-1">
				<a class="block" href="blog/imagination-governs-the-world.html">
					<div class="block relative pt-[75%] bg-black/5 dark:bg-white/5">
						<img
							alt="Post thumbnail"
							sizes="(max-width: 767px) 95vw, (max-width: 1279px) 40vw, 450px"
							src="https://picsum.photos/950/500"
							decoding="async"
							data-nimg="fill"
							loading="lazy"
							style="position:absolute;height:100%;width:100%;left:0;top:0;right:0;bottom:0;object-fit:cover;color:transparent" />
					</div>
				</a>
				<div class="flex flex-wrap gap-3 items-center mt-6">
					<div class="flex flex-wrap gap-3">
						<a
							class="text-xs font-medium uppercase rounded-full py-1.5 px-2.5 border border-black text-black hover:bg-black hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black tracking-wide whitespace-nowrap"
							href="category/productivity.html">productivity</a>
					</div>
					<div class="text-sm data-color flex items-center">
						<span class="whitespace-nowrap">Apr 21, 2022</span><span class="px-2.5">⋅</span><span
							class="whitespace-nowrap">3 min read</span>
					</div>
				</div>
				<h2 class="font-bold leading-snug mt-3 text-2xl">
					<a href="blog/imagination-governs-the-world.html">Imagination governs the world</a>
				</h2>
				<p class="mt-3">
					Ipsum est deserunt excepteur ad adipisicing anim mollit deserunt veniam aliqua duis Lorem
					irure enim labore et excepteur.
				</p>
			</div>
		</div>
	</div>
	<h2 class="mb-4 font-medium text-base uppercase tracking-wider mt-32">Latest Posts</h2>
	<div class="grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
		{#each data.articles as article, i}
		<ArticleTeaser {article} firstEntry={i === 0} />
	{/each}
	</div>
</div>
