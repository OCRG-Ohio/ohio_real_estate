// src/routes/api/deleteGalleryImage/+server.js
import {prisma} from '$lib/server/prisma';
import { deleteFromSupabase } from '$lib/server/deleteFromSupabase'; // Adjust the import path as needed

export async function DELETE({ params }) {
  const imageId = Number(params.id);

  try {
    const image = await prisma.media.findUnique({
      where: { asset_id: imageId }
    });
    await deleteFromSupabase(image.url);
    await prisma.media.delete({
      where: { asset_id: imageId }
    });

    return new Response(JSON.stringify({ message: 'Image successfully deleted' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (err) {
    console.error('Error deleting gallery image:', err);
    return new Response(JSON.stringify({ error: 'Failed to delete gallery image' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
