import { json } from '@sveltejs/kit';
import { createArticle } from '$lib/api';

export async function POST({ request, locals }) {
  const currentUser = locals.supabase.auth.getUser;
  const { title, content, teaser, featuredImage } = await request.json();
  const { slug } = await createArticle(title, content, teaser, featuredImage, currentUser);
  return json({ slug });
}
