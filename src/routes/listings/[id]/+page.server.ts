import { error, type Actions, redirect } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client/edge';
import type { PageServerLoad } from './$types';
import { uploadToSupabase } from '$lib/server/uploadToSupabase'; 
import { deleteFromSupabase} from '$lib/server/deleteFromSupabase'; 

const prisma = new PrismaClient();

export const load: PageServerLoad = async ({ params }) => {
    try {
        const property = await prisma.property.findUnique({
            where: {
                id: Number(params.id),
            },
            
        });

        if (!property) {
            throw error(404, "Property not found");
        }

       
       
        
        return {
            property
        };
    } catch (err) {
        throw error(500, "An error occurred while fetching the property");
    }
};


export const actions: Actions = {
	updateProperty: async ({ request, params }) => {
	  const formData = await request.formData();
	  const propertyId = Number(params.id);

	  const propertyData = {
		title: formData.get('title'),
		content: formData.get('content'),
		address: formData.get('address'),
		city_state: formData.get('city_state'),
		price: parseFloat(formData.get('price').toString()),
		beds: parseInt(formData.get('beds').toString()),
		baths: parseInt(formData.get('baths').toString()),
		area: parseInt(formData.get('area').toString()),
	  
		category:formData.get('category'),
		type:formData.get('type'),
	  };

	  const featuredImageFile = formData.get('featuredImage');
      let featuredImageUrl = null;
      if (featuredImageFile) {
        featuredImageUrl = await uploadToSupabase(featuredImageFile);
      }
	  const galleryFiles = formData.getAll('galleryImages');
	  let galleryUrls = [];
	  
	  for (const file of galleryFiles) {
		if (file instanceof File && file.size > 0) {
		  const fileUrl = await uploadToSupabase(file);
		  if (fileUrl) {
			galleryUrls.push(fileUrl);
		  } else {
			console.error("Failed to upload file:", file.name);
		  }
		}
	  }
		// Update property
		await prisma.property.update({
		  where: { id: propertyId },
		  data: {...propertyData,
			featuredImage:featuredImageUrl,
		media:galleryUrls
		}
		});
  
		
	throw redirect(303, `/listings/${propertyId}`)

}
  
	// deleteProperty: async ({ params }) => {
	//   const propertyId = params.id;
  
	//   try {
	// 	// Delete all associated media from Supabase
	// 	const media = await prisma.media.findMany({
	// 	  where: { propertyId: propertyId }
	// 	});
	// 	for (const image of media) {
	// 	  await deleteFromSupabase(image.url);
	// 	}
  
	// 	// Delete property and associated media from database
	// 	await prisma.property.delete({
	// 	  where: { id: propertyId }
	// 	});
  
	// 	return redirect(303, '/listings');
	//   } catch (err) {
	// 	console.error('Error deleting property:', err);
	// 	throw error(500, 'Failed to delete property');
	//   }
	// }

}
  

 