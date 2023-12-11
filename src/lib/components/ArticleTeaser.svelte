<script>
  export let article;
  export let firstEntry;
  
</script>




<div>
  <a class="block" href={`/blog/${article.slug}`}>
    <div class="block relative pt-[75%] bg-black/5 dark:bg-white/5">
      <img
        alt="Post thumbnail"
        sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, (max-width: 1480px) 33.3vw, 450px"
        src={article.featuredImage}
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
        href="category/mind.html">mind</a>
    </div>
    <div class="text-sm data-color flex items-center">
      <span class="whitespace-nowrap">Oct 28, 2022</span><span class="px-2.5">⋅</span><span
        class="whitespace-nowrap">3 min read</span>
    </div>
  </div>
  <h2 class="text-2xl font-bold mt-4 leading-snug">
    <a href="blog/the-chief-enemy-of-creativity-is-good-sense.html"
      >{article.title}</a>
  </h2>
  <p class="mt-4">
    {article.teaser}
  </p>
  <div class="flex gap-2 items-center mt-6">
    <div class="flex">
      <a class="flex -ml-3 first:ml-0 first:z-10 hover:z-20" href="author/catherine.html">
        <div
          class="rounded-full overflow-hidden border-4 border-gray-200 dark:border-gray-700 inline-block leading-[0] !border-2"
          style="width:30px;height:30px">
          <div class="pt-[100%] relative">
            <img
              alt="author avatar"
              sizes="30px"
              src="https://picsum.photos/950/500"
              decoding="async"
              data-nimg="fill"
              loading="lazy"
              style="position:absolute;height:100%;width:100%;left:0;top:0;right:0;bottom:0;object-fit:cover;color:transparent" />
          </div>
        </div>
      </a><a class="flex -ml-3 first:ml-0 first:z-10 hover:z-20" href="author/dina.html">
        <div
          class="rounded-full overflow-hidden border-4 border-gray-200 dark:border-gray-700 inline-block leading-[0] "
          style="width:30px;height:30px">
          <div class="pt-[100%] relative">
            <img
              alt="author avatar"
              sizes="30px"
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
      <a class="text-sm font-medium heading-color" href="author/catherine.html"
        >Catherine Ryan<!-- -->,
      </a><a class="text-sm font-medium heading-color" href="author/dina.html">Dina Jerrie</a>
    </div>
  </div>
</div>
