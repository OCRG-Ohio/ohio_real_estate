import { error, type Actions } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client/edge';
import type { PageServerLoad } from './$types';

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
        const featuredImageUrl = property.media.length > 0 ? property.media[0].url : null;

        return {
            property: {
                ...property,
                featuredImageUrl: featuredImageUrl
            },
        };
    } catch (err) {
        throw error(500, "An error occurred while fetching the property");
    }
};

export const actions: Actions = {
	updateArticle: async ({ request, params }) => {
		
		const formData = await request.formData();
		const selectedTypes = formData.getAll('type');
		const property = {
		  title: formData.get('title'),
		  content: formData.get('content'),
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
			const result = await prisma.property.update({ 
				where: {
					id: Number(params.id),
				},
				data:property
			 });
			console.log("Insertion Result:", result);
		  // Optionally return some data or redirect
		} catch (error) {
			console.error("Error in addProperty action:", error);
	  
		  }
	},
}