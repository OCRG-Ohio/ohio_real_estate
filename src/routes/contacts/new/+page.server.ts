import type { Actions } from './$types';
import { error } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client/edge';

// Initialize PrismaClient
const prisma = new PrismaClient();

export const actions: Actions = {
  default: async ({ request }) => {


    const formData = await request.formData();
    const selectedTypes = formData.getAll('type');
    const property = {
      title: formData.get('title'),
      address: formData.get('address'),
      city_state: formData.get('city_state'),
      price: Number(formData.get('price')),
      beds: Number(formData.get('beds')),
      baths: Number(formData.get('baths')),
      area: Number(formData.get('area')),
      type: selectedTypes,
    };
    console.log("Property Object:", property);

    try {
        const result = await prisma.property.create({ data: property });
        console.log("Insertion Result:", result);
      // Optionally return some data or redirect
    } catch (error) {
        console.error("Error in addProperty action:", error);
  
      }
  }
};