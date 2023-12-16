import { getArticles,getPage } from '$lib/api';

export async function load({ locals }) {

  const articles = await getArticles();
  const page = await getPage('blog');
  return {

    articles,
    page
  };
}