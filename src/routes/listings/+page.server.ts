import { error } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client/edge';
import type { PageServerLoad } from '../$types';

// Initialize PrismaClient
const prisma = new PrismaClient();

export const load: PageServerLoad = async (event) => {
	let properties = await prisma.property.findMany({
		
	  });
	  cacheStrategy: { ttl: 60 }
	return {
		properties
	};
};

// export const actions: Actions = {
// 	createContact: async (event) => {
// 		const session = await event.locals.getSession();
// 		if (!session) {
// 			throw error(401, "Unauthorized");
// 		}

// 		const [tier, count, createContactForm] = await Promise.all([
// 			getSubscriptionTier(session.user.id),
// 			getContactsCount(session.user.id),
// 			superValidate(event, createContactSchema, {
// 				id: "create"
// 			})
// 		]);

// 		if (hasReachedMaxContacts(tier, count)) {
// 			throw error(
// 				403,
// 				"You have reached the max number of contacts for your tier. Please upgrade."
// 			);
// 		}

// 		if (!createContactForm.valid) {
// 			return fail(400, {
// 				createContactForm
// 			});
// 		}

// 		const { error: createContactError } = await supabaseAdmin.from("contacts").insert({
// 			...createContactForm.data,
// 			user_id: session.user.id
// 		});

// 		if (createContactError) {
// 			console.log(createContactError);
// 			return setError(createContactForm, null, "Error creating contact.");
// 		}

// 		return {
// 			createContactForm
// 		};
// 	},
// 	deleteContact: async (event) => {
// 		const session = await event.locals.getSession();
// 		if (!session) {
// 			throw error(401, "Unauthorized");
// 		}

// 		const deleteContactForm = await superValidate(event.url, deleteContactSchema, {
// 			id: "delete"
// 		});

// 		if (!deleteContactForm.valid) {
// 			return fail(400, {
// 				deleteContactForm
// 			});
// 		}

// 		const { error: deleteContactError } = await event.locals.supabase
// 			.from("contacts")
// 			.delete()
// 			.eq("id", deleteContactForm.data.id);

// 		if (deleteContactError) {
// 			return setError(deleteContactForm, null, "Error deleting contact");
// 		}

// 		return {
// 			deleteContactForm
// 		};
// 	}
// };
