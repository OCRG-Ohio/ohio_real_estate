// import { GOOGLE_EMAIL } from "$env/static/private";
// import transporter from "$lib/server/email.server.js";

// export const actions = {
//     default: async ({ request }) => {
//         try {
//             const formData = await request.formData();
//             const email = formData.get("to");
//             const subject = formData.get("subject");
//             const body = formData.get("body");
//             console.log(body);
//             let html = `<h2>Hi!</h2><pre>${body}</pre>`;

//             const message = {
//                 from: GOOGLE_EMAIL,
//                 to: email,
//                 bcc: "hello@webjeda.com",
//                 subject: subject,
//                 text: body,
//                 html: html,
//             };

//             const sendEmail = async (message) => {
//                 await new Promise((resolve, reject) => {
//                     transporter.sendMail(message, (err, info) => {
//                         if (err) {
//                             console.error(err);
//                             reject(err);
//                         } else {
//                             resolve(info);
//                         }
//                     });
//                 });
//             };

//             await sendEmail(message);

//             return {
//                 success: "Email is sent",
//             };
//         } catch (error) {
//             console.error(error);
//         }
//     }
// };

// src/routes/api/sendEmail.js

import nodemailer from "nodemailer";
import { GOOGLE_EMAIL, GOOGLE_EMAIL_PASSWORD } from "$env/static/private";
import { json } from '@sveltejs/kit';
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: GOOGLE_EMAIL,
    pass: GOOGLE_EMAIL_PASSWORD,
  },
});

transporter.verify(function (error, success) {
  if (error) {
    console.error(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

export async function POST({ request, locals }){
    try {
        const formData = await request.formData();    
        const email = formData.get("email");
        const name = formData.get("name");
        const phone = formData.get("phone");
        const body = formData.get("body");  
    
        const html = `
        <html>
          <body class="font-sans bg-gray-500">
            <div class="max-w-2xl mx-auto p-4 bg-white shadow-md rounded-md mt-4">
              <h2 class="text-2xl font-semibold mb-2">Contact Form Submission</h2>
              <p class="mb-2"><strong class="font-semibold">Name:</strong> ${name || "Not provided"}</p>
              ${phone ? `<p class="mb-2"><strong class="font-semibold">Phone:</strong> ${phone}</p>` : ''}
              <p class="mb-2"><strong class="font-semibold">Email:</strong> ${email}</p>
              <p class="mb-2"><strong class="font-semibold">Message:</strong></p>
              <pre class="bg-gray-200 p-2 rounded-md">${body}</pre>
            </div>
          </body>
        </html>
      `;
      
      
      const message = {
        from: 'info@ohiorealestate.com',
        to: GOOGLE_EMAIL,
        bcc: "hello@webjeda.com",
        subject: "Contact Form Submission",
        text: body,
        html: html,
      };
    
        await new Promise((resolve, reject) => {
          transporter.sendMail(message, (err, info) => {
            if (err) {
              console.error(err);
              reject(err);
            } else {
              console.log("Email sent successfully:", info.response);
              resolve(info);
            }
          });
        });
    
        // Return a valid Response object with a 200 status code and JSON body
    
        return json({ success: "Email is sent" });
      } catch (error) {
        console.error(error);
    
        // Return a valid Response object with a 500 status code and JSON body for errors
        return json({ failed: "Email not sent" });
      }
    }
