<script>
	import PlainText from "$lib/components/PlainText.svelte";
	import RichText from "$lib/components/RichText.svelte";
	import PlaceHolder from "$lib/img/placeHolder.jpg";
	import { formatDate } from "$lib/util";
	export let title;
	export let content;
	export let published_at = undefined;
	export let featuredImage;
	import { Progressbar } from "flowbite-svelte";
	import Image from "$lib/components/Image.svelte";
	import uploadAsset from "$lib/uploadAsset";
	import { currentUser, isEditing } from "$lib/stores";
	import { ImagePlaceholder,Label, Fileupload } from 'flowbite-svelte';
	let isLoadingImage = false;
    let isUploading = false;
    let uploadProgress = 0;

	async function handleImageUpload(event) {
		const file = event.target.files[0];
		if (file) {
			isUploading = true;
			uploadProgress = 0;
			isLoadingImage = true; // Indicates that image loading is in progress

			try {
				featuredImage = await uploadAsset(file, file.name, (progress) => {
					uploadProgress = progress; // Update progress here
				});

				// Create a new Image object to load the image
				const image = new Image({ src: featuredImage });
				// image.src = featuredImage;

				// Wait for the image to load
				await new Promise((resolve, reject) => {
					image.onload = resolve;
					image.onerror = reject;
				});
			} catch (error) {
				console.error("Upload failed:", error);
				// Handle upload error...
			} finally {
				isUploading = false;
				isLoadingImage = false; // Loading is complete
			}
		}
	}
</script>

<div class="max-w-[1480px] mx-auto px-5 sm:px-8 mt-10 lg:mt-32">
	<div class="max-w-screen-md mx-auto">
		<div class="flex flex-wrap gap-3 items-center text-[15px]">
			<div class="flex flex-wrap gap-3">
				<a
					class="text-xs font-medium uppercase rounded-full py-1.5 px-2.5 border border-black text-black hover:bg-black hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black tracking-wide whitespace-nowrap"
					href="../category/life%20lessons.html">life lessons</a>
			</div>
			<div class="text-sm data-color flex items-center">
				<span class="whitespace-nowrap">
					{#if !published_at}
						DRAFT
					{:else}
						{formatDate(published_at)}
					{/if}</span
				><span class="px-2.5">⋅</span><span class="whitespace-nowrap">4 min read</span>
			</div>
		</div>
		<h2 class="font-bold leading-snug text-3xl sm:text-[2.5rem] mt-6">
			<PlainText bind:content={title} />
		</h2>
		<div class="flex gap-2 items-center mt-4">
			<div class="flex">
				<a class="flex -ml-3 first:ml-0 first:z-10 hover:z-20" href="../author/brook.html">
					<div
						class="rounded-full overflow-hidden border-gray-200 dark:border-gray-700 inline-block leading-[0] !border-2"
						style="width:30px;height:30px">
						<div class="pt-[100%] relative">
							<img
								alt="author avatar"
								sizes="30px"
								src={featuredImage}
								decoding="async"
								data-nimg="fill"
								loading="lazy"
								style="position:absolute;height:100%;width:100%;left:0;top:0;right:0;bottom:0;object-fit:cover;color:transparent" />
						</div>
					</div>
				</a>
			</div>
			<div>
				<a class="text-sm font-medium heading-color" href="../author/brook.html">Brook Jerald</a>
			</div>
		</div>
		<div class="relative">
			{#if isUploading || isLoadingImage}
				<ImagePlaceholder class="my-8 h-[192px] w-full" />
			{:else if featuredImage}
				<div class="absolute inset-0 w-full h-full" style="background: url({featuredImage}) no-repeat center center; background-size: cover;"></div>
				<Image alt="Post thumbnail" src={PlaceHolder} />
			{:else}
				<Image alt="Post thumbnail" src={PlaceHolder} />
			{/if}
		</div>
		{#if $isEditing}
			<Fileupload on:change={handleImageUpload} />
		{/if}
		
		<div
			class="prose sm:prose-lg max-w-none dark:prose-invert prose-figcaption:text-sm prose-figcaption:text-center prose-figcaption:mt-2 mt-16"
			id="article_content">
			<RichText multiLine bind:content />
		</div>
		<div class="flex flex-wrap gap-3 mt-16">
			<a
				class="text-xs font-semibold data-color rounded-full capitalize bg-gray-100 py-2 px-3 dark:bg-zinc-900 whitespace-nowrap"
				href="../tag/life%20lessons.html">life lessons</a
			><a
				class="text-xs font-semibold data-color rounded-full capitalize bg-gray-100 py-2 px-3 dark:bg-zinc-900 whitespace-nowrap"
				href="../tag/mental%20health.html">mental health</a
			><a
				class="text-xs font-semibold data-color rounded-full capitalize bg-gray-100 py-2 px-3 dark:bg-zinc-900 whitespace-nowrap"
				href="../tag/art.html">art</a
			><a
				class="text-xs font-semibold data-color rounded-full capitalize bg-gray-100 py-2 px-3 dark:bg-zinc-900 whitespace-nowrap"
				href="../tag/featured.html">featured</a>
		</div>
		<div class="flex items-center mt-16">
			<span class="font-semibold mr-4 text-sm uppercase data-color">Share:</span>
			<div class="flex gap-4">
				<a
					class="text-md border-2 p-2.5 rounded-full text-black border-black hover:bg-black hover:text-white dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-black"
					href="https://twitter.com/intent/tweet?url=https://micca-blog-template.vercel.app/blog/chinese-art-in-the-modern-world&amp;text=Chinese%20art%20in%20the%20modern%20world"
					target="_blank"
					rel="noreferrer"
					aria-label="Twitter share button"
					><svg
						stroke="currentColor"
						fill="currentColor"
						stroke-width="0"
						viewBox="0 0 512 512"
						height="1em"
						width="1em"
						xmlns="http://www.w3.org/2000/svg">
						<path
							d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z">
						</path>
					</svg></a
				><a
					class="text-md border-2 p-2.5 rounded-full text-black border-black hover:bg-black hover:text-white dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-black"
					href="https://www.facebook.com/sharer.php?u=https://micca-blog-template.vercel.app/blog/chinese-art-in-the-modern-world"
					target="_blank"
					rel="noreferrer"
					aria-label="Facebook share button"
					><svg
						stroke="currentColor"
						fill="currentColor"
						stroke-width="0"
						viewBox="0 0 320 512"
						height="1em"
						width="1em"
						xmlns="http://www.w3.org/2000/svg">
						<path
							d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z">
						</path>
					</svg></a
				><a
					class="text-md border-2 p-2.5 rounded-full text-black border-black hover:bg-black hover:text-white dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-black"
					href="https://www.linkedin.com/sharing/share-offsite/?url=https://micca-blog-template.vercel.app/blog/chinese-art-in-the-modern-world"
					target="_blank"
					rel="noreferrer"
					aria-label="LinkedIn share button"
					><svg
						stroke="currentColor"
						fill="currentColor"
						stroke-width="0"
						viewBox="0 0 448 512"
						height="1em"
						width="1em"
						xmlns="http://www.w3.org/2000/svg">
						<path
							d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z">
						</path>
					</svg></a>
			</div>
		</div>
	</div>
	<!-- <div class=" mt-20">
      <h2 class="mb-4 font-medium text-base uppercase tracking-wider ">You might also like</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div><a class="block " href="the-only-way-to-do-great-work-is-to-love-what-you-do.html">
                  <div class="block relative pt-[75%] bg-black/5 dark:bg-white/5 "><img alt="Post thumbnail"
                          sizes="(max-width: 639px) 95vw, (max-width: 1023px) 40vw, (max-width: 1480px) 20vw, 330px"
                          srcSet="/_next/image?url=https%3A%2F%2Fik.imagekit.io%2Fnextjs23%2Fmicca%2Fabazie-uchenna-DaXPKSl4iqA-unsplash.jpg&amp;w=96&amp;q=75 96w, /_next/image?url=https%3A%2F%2Fik.imagekit.io%2Fnextjs23%2Fmicca%2Fabazie-uchenna-DaXPKSl4iqA-unsplash.jpg&amp;w=128&amp;q=75 128w, /_next/image?url=https%3A%2F%2Fik.imagekit.io%2Fnextjs23%2Fmicca%2Fabazie-uchenna-DaXPKSl4iqA-unsplash.jpg&amp;w=256&amp;q=75 256w, /_next/image?url=https%3A%2F%2Fik.imagekit.io%2Fnextjs23%2Fmicca%2Fabazie-uchenna-DaXPKSl4iqA-unsplash.jpg&amp;w=384&amp;q=75 384w, /_next/image?url=https%3A%2F%2Fik.imagekit.io%2Fnextjs23%2Fmicca%2Fabazie-uchenna-DaXPKSl4iqA-unsplash.jpg&amp;w=450&amp;q=75 450w, /_next/image?url=https%3A%2F%2Fik.imagekit.io%2Fnextjs23%2Fmicca%2Fabazie-uchenna-DaXPKSl4iqA-unsplash.jpg&amp;w=600&amp;q=75 600w, /_next/image?url=https%3A%2F%2Fik.imagekit.io%2Fnextjs23%2Fmicca%2Fabazie-uchenna-DaXPKSl4iqA-unsplash.jpg&amp;w=750&amp;q=75 750w, /_next/image?url=https%3A%2F%2Fik.imagekit.io%2Fnextjs23%2Fmicca%2Fabazie-uchenna-DaXPKSl4iqA-unsplash.jpg&amp;w=828&amp;q=75 828w, /_next/image?url=https%3A%2F%2Fik.imagekit.io%2Fnextjs23%2Fmicca%2Fabazie-uchenna-DaXPKSl4iqA-unsplash.jpg&amp;w=1080&amp;q=75 1080w, /_next/image?url=https%3A%2F%2Fik.imagekit.io%2Fnextjs23%2Fmicca%2Fabazie-uchenna-DaXPKSl4iqA-unsplash.jpg&amp;w=1200&amp;q=75 1200w"
                          src="../_next/abazie-uchenna-DaXPKSl4iqA-unsplash91b2.jpg?url=https%3A%2F%2Fik.imagekit.io%2Fnextjs23%2Fmicca%2Fabazie-uchenna-DaXPKSl4iqA-unsplash.jpg&amp;w=1200&amp;q=75"
                          decoding="async" data-nimg="fill" loading="lazy"
                          style="position:absolute;height:100%;width:100%;left:0;top:0;right:0;bottom:0;object-fit:cover;color:transparent" />
                  </div>
              </a>
              <h2 class="text-xl mt-4 font-bold leading-snug"><a
                      href="the-only-way-to-do-great-work-is-to-love-what-you-do.html">The only way to do
                      great work is to love what you do</a></h2>
          </div>
          <div><a class="block "
                  href="the-only-limit-to-our-realization-of-tomorrow-will-be-our-doubts-of-today.html">
                  <div class="block relative pt-[75%] bg-black/5 dark:bg-white/5 "><img alt="Post thumbnail"
                          sizes="(max-width: 639px) 95vw, (max-width: 1023px) 40vw, (max-width: 1480px) 20vw, 330px"
                          srcSet="/_next/image?url=https%3A%2F%2Fik.imagekit.io%2Fnextjs23%2Fmicca%2Felise-wilcox-b7GNy1-pgCM-unsplash.jpg&amp;w=96&amp;q=75 96w, /_next/image?url=https%3A%2F%2Fik.imagekit.io%2Fnextjs23%2Fmicca%2Felise-wilcox-b7GNy1-pgCM-unsplash.jpg&amp;w=128&amp;q=75 128w, /_next/image?url=https%3A%2F%2Fik.imagekit.io%2Fnextjs23%2Fmicca%2Felise-wilcox-b7GNy1-pgCM-unsplash.jpg&amp;w=256&amp;q=75 256w, /_next/image?url=https%3A%2F%2Fik.imagekit.io%2Fnextjs23%2Fmicca%2Felise-wilcox-b7GNy1-pgCM-unsplash.jpg&amp;w=384&amp;q=75 384w, /_next/image?url=https%3A%2F%2Fik.imagekit.io%2Fnextjs23%2Fmicca%2Felise-wilcox-b7GNy1-pgCM-unsplash.jpg&amp;w=450&amp;q=75 450w, /_next/image?url=https%3A%2F%2Fik.imagekit.io%2Fnextjs23%2Fmicca%2Felise-wilcox-b7GNy1-pgCM-unsplash.jpg&amp;w=600&amp;q=75 600w, /_next/image?url=https%3A%2F%2Fik.imagekit.io%2Fnextjs23%2Fmicca%2Felise-wilcox-b7GNy1-pgCM-unsplash.jpg&amp;w=750&amp;q=75 750w, /_next/image?url=https%3A%2F%2Fik.imagekit.io%2Fnextjs23%2Fmicca%2Felise-wilcox-b7GNy1-pgCM-unsplash.jpg&amp;w=828&amp;q=75 828w, /_next/image?url=https%3A%2F%2Fik.imagekit.io%2Fnextjs23%2Fmicca%2Felise-wilcox-b7GNy1-pgCM-unsplash.jpg&amp;w=1080&amp;q=75 1080w, /_next/image?url=https%3A%2F%2Fik.imagekit.io%2Fnextjs23%2Fmicca%2Felise-wilcox-b7GNy1-pgCM-unsplash.jpg&amp;w=1200&amp;q=75 1200w"
                          src="../_next/elise-wilcox-b7GNy1-pgCM-unsplash7e53.jpg?url=https%3A%2F%2Fik.imagekit.io%2Fnextjs23%2Fmicca%2Felise-wilcox-b7GNy1-pgCM-unsplash.jpg&amp;w=1200&amp;q=75"
                          decoding="async" data-nimg="fill" loading="lazy"
                          style="position:absolute;height:100%;width:100%;left:0;top:0;right:0;bottom:0;object-fit:cover;color:transparent" />
                  </div>
              </a>
              <h2 class="text-xl mt-4 font-bold leading-snug"><a
                      href="the-only-limit-to-our-realization-of-tomorrow-will-be-our-doubts-of-today.html">The
                      only limit to our realization of tomorrow will be our doubts of today</a></h2>
          </div>
          <div><a class="block " href="the-chief-enemy-of-creativity-is-good-sense.html">
                  <div class="block relative pt-[75%] bg-black/5 dark:bg-white/5 "><img alt="Post thumbnail"
                          sizes="(max-width: 639px) 95vw, (max-width: 1023px) 40vw, (max-width: 1480px) 20vw, 330px"
                          srcSet="/_next/image?url=https%3A%2F%2Fik.imagekit.io%2Fnextjs23%2Fmicca%2Fali-karimiboroujeni-4SjDZfWP3ns-unsplash.jpg&amp;w=96&amp;q=75 96w, /_next/image?url=https%3A%2F%2Fik.imagekit.io%2Fnextjs23%2Fmicca%2Fali-karimiboroujeni-4SjDZfWP3ns-unsplash.jpg&amp;w=128&amp;q=75 128w, /_next/image?url=https%3A%2F%2Fik.imagekit.io%2Fnextjs23%2Fmicca%2Fali-karimiboroujeni-4SjDZfWP3ns-unsplash.jpg&amp;w=256&amp;q=75 256w, /_next/image?url=https%3A%2F%2Fik.imagekit.io%2Fnextjs23%2Fmicca%2Fali-karimiboroujeni-4SjDZfWP3ns-unsplash.jpg&amp;w=384&amp;q=75 384w, /_next/image?url=https%3A%2F%2Fik.imagekit.io%2Fnextjs23%2Fmicca%2Fali-karimiboroujeni-4SjDZfWP3ns-unsplash.jpg&amp;w=450&amp;q=75 450w, /_next/image?url=https%3A%2F%2Fik.imagekit.io%2Fnextjs23%2Fmicca%2Fali-karimiboroujeni-4SjDZfWP3ns-unsplash.jpg&amp;w=600&amp;q=75 600w, /_next/image?url=https%3A%2F%2Fik.imagekit.io%2Fnextjs23%2Fmicca%2Fali-karimiboroujeni-4SjDZfWP3ns-unsplash.jpg&amp;w=750&amp;q=75 750w, /_next/image?url=https%3A%2F%2Fik.imagekit.io%2Fnextjs23%2Fmicca%2Fali-karimiboroujeni-4SjDZfWP3ns-unsplash.jpg&amp;w=828&amp;q=75 828w, /_next/image?url=https%3A%2F%2Fik.imagekit.io%2Fnextjs23%2Fmicca%2Fali-karimiboroujeni-4SjDZfWP3ns-unsplash.jpg&amp;w=1080&amp;q=75 1080w, /_next/image?url=https%3A%2F%2Fik.imagekit.io%2Fnextjs23%2Fmicca%2Fali-karimiboroujeni-4SjDZfWP3ns-unsplash.jpg&amp;w=1200&amp;q=75 1200w"
                          src="../_next/ali-karimiboroujeni-4SjDZfWP3ns-unsplashcd15.jpg?url=https%3A%2F%2Fik.imagekit.io%2Fnextjs23%2Fmicca%2Fali-karimiboroujeni-4SjDZfWP3ns-unsplash.jpg&amp;w=1200&amp;q=75"
                          decoding="async" data-nimg="fill" loading="lazy"
                          style="position:absolute;height:100%;width:100%;left:0;top:0;right:0;bottom:0;object-fit:cover;color:transparent" />
                  </div>
              </a>
              <h2 class="text-xl mt-4 font-bold leading-snug"><a
                      href="the-chief-enemy-of-creativity-is-good-sense.html">The chief enemy of creativity is
                      good sense</a></h2>
          </div>
          <div><a class="block " href="if-it-doesnt-challenge-you-it-wont-change-you.html">
                  <div class="block relative pt-[75%] bg-black/5 dark:bg-white/5 "><img alt="Post thumbnail"
                          sizes="(max-width: 639px) 95vw, (max-width: 1023px) 40vw, (max-width: 1480px) 20vw, 330px"
                          srcSet="/_next/image?url=https%3A%2F%2Fik.imagekit.io%2Fnextjs23%2Fmicca%2Ferke-rysdauletov-o3XxIAZ1Zc4-unsplash.jpg&amp;w=96&amp;q=75 96w, /_next/image?url=https%3A%2F%2Fik.imagekit.io%2Fnextjs23%2Fmicca%2Ferke-rysdauletov-o3XxIAZ1Zc4-unsplash.jpg&amp;w=128&amp;q=75 128w, /_next/image?url=https%3A%2F%2Fik.imagekit.io%2Fnextjs23%2Fmicca%2Ferke-rysdauletov-o3XxIAZ1Zc4-unsplash.jpg&amp;w=256&amp;q=75 256w, /_next/image?url=https%3A%2F%2Fik.imagekit.io%2Fnextjs23%2Fmicca%2Ferke-rysdauletov-o3XxIAZ1Zc4-unsplash.jpg&amp;w=384&amp;q=75 384w, /_next/image?url=https%3A%2F%2Fik.imagekit.io%2Fnextjs23%2Fmicca%2Ferke-rysdauletov-o3XxIAZ1Zc4-unsplash.jpg&amp;w=450&amp;q=75 450w, /_next/image?url=https%3A%2F%2Fik.imagekit.io%2Fnextjs23%2Fmicca%2Ferke-rysdauletov-o3XxIAZ1Zc4-unsplash.jpg&amp;w=600&amp;q=75 600w, /_next/image?url=https%3A%2F%2Fik.imagekit.io%2Fnextjs23%2Fmicca%2Ferke-rysdauletov-o3XxIAZ1Zc4-unsplash.jpg&amp;w=750&amp;q=75 750w, /_next/image?url=https%3A%2F%2Fik.imagekit.io%2Fnextjs23%2Fmicca%2Ferke-rysdauletov-o3XxIAZ1Zc4-unsplash.jpg&amp;w=828&amp;q=75 828w, /_next/image?url=https%3A%2F%2Fik.imagekit.io%2Fnextjs23%2Fmicca%2Ferke-rysdauletov-o3XxIAZ1Zc4-unsplash.jpg&amp;w=1080&amp;q=75 1080w, /_next/image?url=https%3A%2F%2Fik.imagekit.io%2Fnextjs23%2Fmicca%2Ferke-rysdauletov-o3XxIAZ1Zc4-unsplash.jpg&amp;w=1200&amp;q=75 1200w"
                          src="../_next/erke-rysdauletov-o3XxIAZ1Zc4-unsplashe81e.jpg?url=https%3A%2F%2Fik.imagekit.io%2Fnextjs23%2Fmicca%2Ferke-rysdauletov-o3XxIAZ1Zc4-unsplash.jpg&amp;w=1200&amp;q=75"
                          decoding="async" data-nimg="fill" loading="lazy"
                          style="position:absolute;height:100%;width:100%;left:0;top:0;right:0;bottom:0;object-fit:cover;color:transparent" />
                  </div>
              </a>
              <h2 class="text-xl mt-4 font-bold leading-snug"><a
                      href="if-it-doesnt-challenge-you-it-wont-change-you.html">If it doesn’t challenge you,
                      it won’t change you</a></h2>
          </div>
      </div>
  </div> -->
</div>
