import { error, type Actions } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client/edge';
import type { PageServerLoad } from '../$types';
const prisma = new PrismaClient();
export const load: PageServerLoad = async ({ params }) => {
	const getArticle = async () => {
		const property = await prisma.property.findUnique({
			where: {
				id: Number(params.id),
			},
		})
		if (!property) {
			throw error(404, "Article not found")
		}
		return property
	}

	return {
		property: getArticle(),
	}
}
export const actions: Actions = {
	updateArticle: async ({ request, params }) => {
		const { title, address } = Object.fromEntries(await request.formData()) as {
			title: string
			address: string
		}

		try {
			await prisma.property.update({
				where: {
					id: Number(params.id),
				},
				data: {
					title,
					address,
				},
			})
		} catch (err) {
			console.error(err)
			return fail(500, { message: "Could not update property" })
		}

		return {
			status: 200,
		}
	},
}