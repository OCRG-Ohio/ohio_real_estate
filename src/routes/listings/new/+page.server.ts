import type { PageServerLoad, Actions } from './$types';
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
 



  
      const featuredImageFile = formData.get('featuredImage');
      let featuredImageUrl = null;
      if (featuredImageFile) {
        featuredImageUrl = await uploadToSupabase(featuredImageFile);
      }
      const newProperty = await prisma.property.create({
     
       data:{ ...propertyData,
        featuredImage:featuredImageUrl
      
      } 
      
      });

      const galleryFiles = formData.getAll('galleryImages');
      for (const file of galleryFiles) {
        const fileSize = file.size;
        const fileType = file.type;
        const imageUrl = await uploadToSupabase(file);
        await prisma.media.create({
          data: {           
            mime_type: fileType ,
            size:fileSize,     
            propertyId: newProperty.id,
            url: imageUrl
          }
        });   
      }
 
       throw redirect(303, `listings/${newProperty.id}`);
       return { success: true };

  
  }
}satisfies Actions;
