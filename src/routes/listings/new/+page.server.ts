import type { Actions } from './$types';
import { error, redirect } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client/edge';
import { uploadToSupabase } from '$lib/server/uploadToSupabase'; 
import { v4 as uuidv4 } from 'uuid';

// Initialize PrismaClient
const prisma = new PrismaClient();

export const actions: Actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    const selectedTypes = formData.getAll('type').map(type => type.toString());   
  
  
    const propertyData = {
      title: formData.get('title').toString(),
      content: formData.get('content').toString(),
      address: formData.get('address').toString(),
      city_state: formData.get('city_state').toString(),
      price: parseFloat(formData.get('price').toString()),
      beds: parseInt(formData.get('beds').toString()),
      baths: parseInt(formData.get('baths').toString()),
      area: parseInt(formData.get('area').toString()),
      type: selectedTypes,    
    };
 

    try {

     
      
      const newProperty = await prisma.property.create({
     
       data: propertyData 
      
      });

      const featuredImageFile = formData.get('featuredImage');
      const fileType = featuredImageFile.type;
      const fileSize = featuredImageFile.size;
      if (featuredImageFile) {
        const featuredImageUrl = await uploadToSupabase(featuredImageFile);
        await prisma.media.create({
          data: {  
            asset_id:newProperty.id,  
            mime_type: fileType ,
            size:fileSize,     
            propertyId: newProperty.id,          
            url: featuredImageUrl 
          }
        });
      }

      throw redirect(303, `/listings/${newProperty.id}`);
    } catch (err) {
      console.error('Error creating property:', err);
      return error(500, 'Failed to create property');
    }
  }
};
