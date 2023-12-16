import type { PageServerLoad, Actions, LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	return {
		session: await event.locals.getSession()	
	};
};








