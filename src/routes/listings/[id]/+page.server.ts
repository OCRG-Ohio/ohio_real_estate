import { error, type Actions,redirect,fail } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client/edge';
import type { PageServerLoad } from './$types';
import { uploadToSupabase } from '$lib/server/uploadToSupabase'; 
import { deleteFromSupabase} from '$lib/server/deleteFromSupabase '; 
import { setError, superValidate } from "sveltekit-superforms/server";

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
	  
		category:formData.get('category'),
		type:formData.get('type'),
	  }; 
	  
      const galleryFiles = formData.getAll('galleryImages');
      for (const file of galleryFiles) {
        const fileSize = file.size;
        const fileType = file.type;
        const imageUrl = await uploadToSupabase(file);
        await prisma.media.update({
          data: {           
            mime_type: fileType ,
            size:fileSize,     
            propertyId: propertyId,
            url: imageUrl
          }
        });   
      }
  

	  const featuredImageFile = formData.get('featuredImage');
      let featuredImageUrl = null;
      if (featuredImageFile) {
        featuredImageUrl = await uploadToSupabase(featuredImageFile);
      }  

		// Update property
		const { error: updatePropertyError } = await prisma.property.update({
		  where: { id: propertyId },
		  data: {...propertyData,
		featuredImage:featuredImageUrl},

		});		
  
		if (updatePropertyError) {
			return setError(updatePropertyError, null, "Error updating property, please try again later.");
		}

		return {
			updateProperty
		}

		 
	},
  
	deleteProperty: async ({ params }) => {
	  const propertyId = Number(params.id);
  
	
		// Delete property and associated media from database
		await prisma.property.delete({
		  where: { id: propertyId }
		});
  
		return redirect(303, '/listings');
	
	},
}

  
	
 