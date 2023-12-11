import { json } from '@sveltejs/kit';
import { storeAsset } from '$lib/api';

export async function PUT({ request }) {
  try {
    const data = await request.formData();
    const asset_id = data.get('path');
    const file = data.get('file');

    // Validate file and asset_id here (if necessary)

    console.log(
      file?.name, // filename
      file?.type, // mime type
      file?.size, // file size in bytes
      file?.lastModified, // last modified date
    );

    await storeAsset(asset_id, file);
    return json({ path: asset_id, success: true });
  } catch (error) {
    console.error('Error storing asset:', error);
    return json({ error: 'Error storing asset' }, { status: 500 });
  }
}
