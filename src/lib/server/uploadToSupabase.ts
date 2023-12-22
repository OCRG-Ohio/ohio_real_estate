import { supabase } from '$lib/server/supabase'; // Your configured Supabase client
import { v4 as uuidv4 } from 'uuid';
export async function uploadToSupabase(file) {
    if (!file) {
        console.log('nothing found')
        return null;}
        console.log(file.name)
    
        // const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9_.-]/g, '').toLowerCase();
        // Rest of your code that uses sanitizedFileName
  
    // Append a UUID to ensure uniqueness
    const uniqueId = uuidv4();
    const filePath = `properties/${uniqueId}`;
    const { error, data } = await supabase.storage.from('kelli').upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

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
