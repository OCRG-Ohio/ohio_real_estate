import { error, type Actions } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client/edge';
import type { PageServerLoad } from './$types';
import { uploadToSupabase } from '$lib/server/uploadToSupabase'; 
import { deleteFromSupabase} from '$lib/server/deleteFromSupabase '; 

const prisma = new PrismaClient();

export const load: PageServerLoad = async ({ params }) => {
    try {
        const property = await prisma.property.findUnique({
            where: {
                id: Number(params.id),
            },
            include: {
                media: true // Include related assets
            }
        });

        if (!property) {
            throw error(404, "Property not found");
        }

        // Assuming the first asset is the featured image
       
        
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
		  type: selectedTypes,  
		  category:formData.get('category'),
	  };
  
	  try {
		// Update property
		await prisma.property.update({
		  where: { id: propertyId },
		  data: propertyData,
		});
  
		// Handle new featured image
		const newFeaturedImage = formData.get('newFeaturedImage');
		if (newFeaturedImage) {
		  const featuredImageUrl = await uploadToSupabase(newFeaturedImage);
		  // Update featured image URL in database
		}
  
		// Handle new gallery images
		const newGalleryImages = formData.getAll('newGalleryImages');
		for (const file of newGalleryImages) {
		  const imageUrl = await uploadToSupabase(file);
		  // Insert new gallery images into database
		}
  
		return redirect(303, `/listings/${propertyId}`);
	  } catch (err) {
		console.error('Error updating property:', err);
		throw error(500, 'Failed to update property');
	  }
	},
  
	deleteProperty: async ({ params }) => {
	  const propertyId = params.id;
  
	  try {
		// Delete all associated media from Supabase
		const media = await prisma.media.findMany({
		  where: { propertyId: propertyId }
		});
		for (const image of media) {
		  await deleteFromSupabase(image.url);
		}
  
		// Delete property and associated media from database
		await prisma.property.delete({
		  where: { id: propertyId }
		});
  
		return redirect(303, '/listings');
	  } catch (err) {
		console.error('Error deleting property:', err);
		throw error(500, 'Failed to delete property');
	  }
	},
  
	deleteGalleryImage: async ({ params }) => {
	  const imageId = params.media.asset_id;
  
	  try {
		const image = await prisma.media.findUnique({
		  where: { asset_id: imageId }
		});
		await deleteFromSupabase(image.url);
  
		await prisma.media.delete({
		  where: { asset_id: imageId }
		});
  
		return { status: 200 };
	  } catch (err) {
		console.error('Error deleting gallery image:', err);
		throw error(500, 'Failed to delete gallery image');
	  }
	}
  };