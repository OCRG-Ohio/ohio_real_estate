import { getArticles, getPage } from '$lib/api';
import { GOOGLE_EMAIL } from "$env/static/private";
import transporter from "$lib/server/emailSetup.server.js";
export async function load({ locals }) {
  const currentUser = locals.user;

  const page = await getPage('about');

  return {
    currentUser,
    page
  };
}

export const actions = {
  default: async ({ request }) => {
      try {
          const formData = await request.formData();
          const email = formData.get("email");
          const name = formData.get("senderName");
          const body = formData.get("body");
          console.log(body);
          let html = `<h2>Hi!</h2><pre>${body}</pre>`;

          const message = {
              from: GOOGLE_EMAIL,
              to: email,
              bcc: "hello@webjeda.com",
              name: name,
              text: body,
              html: html,
          };

          const sendEmail = async (message: { from: string; to: any; bcc: string; name: any; text: any; html: string; }) => {
              await new Promise((resolve, reject) => {
                  transporter.sendMail(message, (err, info) => {
                      if (err) {
                          console.error(err);
                          reject(err);
                      } else {
                          resolve(info);
                      }
                  });
              });
          };

          await sendEmail(message);

          return {
              success: "Email is sent",
          };
      } catch (error) {
          console.error(error);
      }
  }
};