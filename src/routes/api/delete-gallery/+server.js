import { json } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';
import { deleteFromSupabase } from '$lib/server/deleteFromSupabase';

const prisma = new PrismaClient();

/** @type {import('./$types').RequestHandler} */
export async function DELETE({ request }) {
    // Extract the asset ID of the media item to be deleted from the request
    const { assetId } = await request.json();

    try {
        // Fetch the media item from your Prisma database to get the file URL
        const mediaItem = await prisma.media.findUnique({
            where: {
                asset_id: assetId,
            },
        });

        if (!mediaItem) {
            return json({ success: false, error: 'Media item not found.' });
        }

        const fileUrl = mediaItem.url;

        // Delete the media item from your Prisma database
        await prisma.media.delete({
            where: {
                asset_id: assetId,
            },
        });

        // Now, delete the media item from Supabase using the file URL
        const supabaseDeletionResult = await deleteFromSupabase(fileUrl);

        if (supabaseDeletionResult) {
            return json({ success: true });
        } else {
            return json({ success: false, error: 'Failed to delete media item from Supabase.' });
        }
    } catch (error) {
        console.error('Error deleting media:', error);
        return json({ success: false, error: 'Failed to delete media item.' });
    }
}
