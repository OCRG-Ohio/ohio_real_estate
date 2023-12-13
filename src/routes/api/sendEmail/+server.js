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

export async function POST({ request, locals }) {
    try {
        const formData = await request.formData();    
        const address = formData.get("address");
        const name = formData.get("name");
        const email = formData.get("email");
        const phoneNumber = formData.get("phoneNumber");
        const timeFrame = formData.get("timeFrame");
        const body = formData.get("body");

        const emailContent = `
            Address: ${address}\n
            Name: ${name}\n
            Email: ${email}\n
            Phone Number: ${phoneNumber}\n
            Time Frame: ${timeFrame}\n
            Message: ${body}
        `;

        const html = `
        <html>
            <body class="font-sans bg-gray-500">
                <div class="max-w-2xl mx-auto p-4 bg-white shadow-md rounded-md mt-4">
                    <h2 class="text-2xl font-semibold mb-2">Contact Form Submission</h2>
                    <pre class="bg-gray-200 p-2 rounded-md">${emailContent}</pre>
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

        return json({ success: "Email is sent" });
    } catch (error) {
        console.error(error);
        return json({ failed: "Email not sent" });
    }
}
