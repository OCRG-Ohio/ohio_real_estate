import { getArticles, getPage } from '$lib/api';
export async function load({ locals }) {
  const currentUser = locals.user;

  const page = await getPage('valuation');

  return {
    currentUser,
    page
  };
}