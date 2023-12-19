import { supabase } from '$lib/server/supabase'; // Your configured Supabase client

export async function uploadToSupabase(file) {
    if (!file) return null;

    const fileName = file.name;
    const uniqueTimeStamp = Date.now();
    const filePath = `properties/${uniqueTimeStamp}-${fileName}`;

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
