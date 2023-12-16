import { getPage } from '$lib/api';

export async function load({ locals }) {
  const page = await getPage('properties');
  return {

page
  };
}