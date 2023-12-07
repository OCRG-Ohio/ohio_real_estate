<script>
  export let article;
  export let firstEntry;
  import { Section, ArticleAuthor, ArticleBody, ArticleHead, ArticleWrapper, BlogHead, BlogBodyWrapper } from 'flowbite-svelte-blocks';
  import { VideoSolid, ArrowRightOutline, NewspaperSolid } from 'flowbite-svelte-icons';
</script>



<ArticleWrapper>
  <ArticleHead>
    <span class="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
      <VideoSolid size="xs" class="mr-1" />
      Tutorial
    </span>
    <span class="text-sm">14 days ago</span>
  </ArticleHead>
  <ArticleBody>
    <svelte:fragment slot="h2"><a href={`/blog/${article.slug}`}>{article.title}</a></svelte:fragment>
    <svelte:fragment slot="paragraph">
      <p class="mb-5 font-light text-gray-500 dark:text-gray-400">{article.teaser}</p>
    </svelte:fragment>
  </ArticleBody>
  <ArticleAuthor>
    <svelte:fragment slot="author">
      <img class="w-7 h-7 rounded-full" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png" alt="Jese Leos avatar" />
      <span class="font-medium dark:text-white"> Jese Leos </span>
    </svelte:fragment>
    <a href={`/blog/${article.slug}`} class="inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline">
      Read more
      <ArrowRightOutline size="sm" class="ml-2" />
    </a>
  </ArticleAuthor>
</ArticleWrapper>
