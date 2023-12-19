<script>
	import PlainText from "$lib/components/PlainText.svelte";
	import RichText from "$lib/components/RichText.svelte";
	import PlaceHolder from "$lib/img/placeHolder.jpg";
	import { formatDate } from "$lib/util";
import { nanoid } from '$lib/util';

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
	    const fileName = file.name + '-' + nanoid();
	
		if (file) {
			
			isUploading = true;
			uploadProgress = 0;
			isLoadingImage = true; // Indicates that image loading is in progress

			try {
				featuredImage = await uploadAsset(file, fileName, (progress) => {
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
				<span
					class="text-xs font-medium uppercase rounded-full py-1.5 px-2.5 border border-black text-black hover:bg-black hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black tracking-wide whitespace-nowrap"
					>{#if !published_at}
					DRAFT
				{:else}
					{formatDate(published_at)}
				{/if}</span>
			</div>
		
		</div>
		<h2 class="font-bold leading-snug text-3xl sm:text-[2.5rem] mt-2 mb-4">
			<PlainText bind:content={title} />
		</h2>
		
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
