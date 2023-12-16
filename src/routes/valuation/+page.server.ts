import { getArticles, getPage } from '$lib/api';
export async function load({ locals }) {


  const page = await getPage('valuation');

  return {

    page
  };
}