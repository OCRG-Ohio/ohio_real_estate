function upload(file, path, progressCallback) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('path', path);

  return new Promise(function (resolve, reject) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(xhr);
        } else {
          reject(xhr);
        }
      }
    };

    if (progressCallback) {
      xhr.upload.onprogress = e => {
        if (e.lengthComputable) {
          const percentComplete = (e.loaded / file.size) * 100;
          progressCallback(parseInt(percentComplete, 10));
        }
      };
    }
    xhr.open('PUT', '/api/upload-asset');
    xhr.send(formData);
  });
}
const supabaseStorageURL = "https://zuotacmwldtsgmgzthxo.supabase.co/storage/v1/object/public/kelli";

export default async function uploadAsset(file, path, onProgress) {
  const response = await upload(file, path, onProgress);

  if (response.status !== 200) {
    throw new Error('Failed to upload image');
  }

  // Adjust the folder path as needed
  return `${supabaseStorageURL}/${path}`;
}