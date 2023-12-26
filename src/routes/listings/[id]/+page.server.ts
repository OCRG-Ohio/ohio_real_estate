import { error, type Actions, redirect } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client/edge';
import type { PageServerLoad } from './$types';
import { uploadToSupabase } from '$lib/server/uploadToSupabase';
import { setError } from 'sveltekit-superforms/server';

const prisma = new PrismaClient();

export const load: PageServerLoad = async ({ params }) => {
  try {
    const property = await prisma.property.findUnique({
      where: {
        id: Number(params.id),
      },
      include: {
        media: true, // Include related assets
      },
    });

    if (!property) {
      throw error(404, 'Property not found');
    }

    // Assuming the first asset is the featured image
    return {
      property,
    };
  } catch (err) {
    throw error(500, 'An error occurred while fetching the property');
  }
};

export const actions: Actions = {
  updateProperty: async ({ request, params }) => {
    const propertyId = Number(params.id)
    try {
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
      // Get the newly selected featured image file
      const featuredImageFile = formData.get('featuredImage');
      let featuredImageUrl = null;

      // Determine the featured image URL based on whether a new image is selected
      if (featuredImageFile && featuredImageFile.size > 0) {
        featuredImageUrl = await uploadToSupabase(featuredImageFile);
        propertyData.featuredImage = featuredImageUrl;
      }

      const galleryFiles = formData.getAll('galleryImages');

      // Create an array to store the media items to be created
      const newMediaItems = [];

      for (const file of galleryFiles) {
        // Check if the file is not empty before attempting to upload it
        if (file.size > 0) {
          const fileSize = file.size;
          const fileType = file.type;
          const imageUrl = await uploadToSupabase(file);

          // Create a new media item data if a new file is selected
          newMediaItems.push({
            mime_type: fileType,
            size: fileSize,
            propertyId: propertyId,
            url: imageUrl,
          });
        }
      }

      // Create new media items only if new files are selected
      if (newMediaItems.length > 0) {
        await prisma.media.createMany({
          data: newMediaItems,
        });
      }

      await prisma.property.update({
        where: { id: propertyId },
        data: propertyData,
      });

      return {
        success: true,
      };
    } catch (error) {
      console.error('Error updating property:', error);
      return setError(error, 'Error updating property, please try again later.');
    }
  },

  deleteProperty: async ({ params }) => {
    const propertyId = Number(params.id);

    // Delete property and associated media from database
    await prisma.property.delete({
      where: { id: propertyId },
    });

    return redirect(303, '/listings');
  },
};
