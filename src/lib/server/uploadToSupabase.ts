import { supabase } from '$lib/server/supabase'; // Your configured Supabase client
import { v4 as uuidv4 } from 'uuid';
export async function uploadToSupabase(file) {
    if (!file) return null;

    const sanitizedFileName = file.name
        .replace(/[^a-zA-Z0-9_.-]/g, '') // Remove invalid characters
        .toLowerCase(); // Convert to lower case

    // Append a UUID to ensure uniqueness
    const uniqueId = uuidv4();
    const filePath = `properties/${uniqueId}-${sanitizedFileName}`;
    const { error, data } = await supabase.storage.from('kelli').upload(filePath, file);

    if (error) {
        console.error('Error uploading to Supabase:', error);
        return null;
    }

    // Construct the URL for the uploaded file
    const supabaseStorageURL = "https://zuotacmwldtsgmgzthxo.supabase.co/storage/v1/object/public/kelli";
    const fileURL = `${supabaseStorageURL}/${data.path}`;
   
    console.error('My Url', fileURL);
    return fileURL;

}
