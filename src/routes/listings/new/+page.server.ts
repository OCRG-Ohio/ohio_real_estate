import type { PageServerLoad, Actions } from './$types';
import { error, redirect } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client/edge';
import { uploadToSupabase } from '$lib/server/uploadToSupabase'; 


// Initialize PrismaClient
const prisma = new PrismaClient();

export const actions: Actions = {
  default: async ({ request }) => {
    const formData = await request.formData(); 

    const propertyData = {
      title: formData.get('title'),
      content: formData.get('content'),
      address: formData.get('address'),
      city_state: formData.get('city_state'),
      price: parseFloat(formData.get('price').toString()),
      beds: parseInt(formData.get('beds').toString()),
      baths: parseInt(formData.get('baths').toString()),
      area: parseInt(formData.get('area').toString()),
      category: formData.get('category'), // Use getAll to get all selected categories
      type: formData.get('type'),
      cooling :formData.get('cooling'),
      heating :formData.get('heating'),
    };
    
    // Check if "Cooling" checkbox is checked and add it to the propertyData
    if (formData.has('cooling') && formData.get('cooling') === 'Yes') {
      propertyData.cooling_detail = formData.get('cooling_detail');
    }
    
    // Check if "Heating" checkbox is checked and add it to the propertyData
    if (formData.has('heating') && formData.get('heating') === 'Yes') {
      propertyData.heating_detail = formData.get('heating_detail');
    }
    
    // Checkboxes for extra details (Garage, Parking, View, Pool)
    const extraDetails = ['garage', 'parking', 'view', 'pool'];
    extraDetails.forEach((detail) => {
      if (formData.has(detail) && formData.get(detail) === 'Yes') {
        propertyData[detail] = 'Yes';
      } else {
        propertyData[detail] = 'No';
      }
    });
 



  
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
 
       throw redirect(303, `/listings/${newProperty.id}`);
       return { success: true };

  
  }
}satisfies Actions;
