import { supabase } from '$lib/server/supabase'; // Your configured Supabase client

/**
 * Deletes a file from Supabase storage.
 * @param fileUrl The full URL of the file to be deleted.
 * @returns true if deletion was successful, false otherwise.
 */
export async function deleteFromSupabase(fileUrl) {
    // Extract the path from the file URL
    const supabaseStorageURL = "https://zuotacmwldtsgmgzthxo.supabase.co/storage/v1/object/public/kelli/";
    const filePath = fileUrl.replace(supabaseStorageURL, '');

    // Delete the file from Supabase storage
    const { error } = await supabase.storage.from('kelli').remove([filePath]);

    if (error) {
        console.error('Error deleting from Supabase:', error);
        return false;
    }

    return true;
}
