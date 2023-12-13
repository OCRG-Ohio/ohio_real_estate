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

</div>
