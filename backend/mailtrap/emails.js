// import { mailtrapClient, sender } from "./mailtrap.config.js";

// export const sendWelcomeEmail = async (email, name) => {
//     console.log("Sending welcome email to:", email); // Log the email address
//     console.log("Recipient name:", name); // Log the recipient's name
//     const recipients = [{ email }];

//     try {
//         const response = await mailtrapClient.send({
//             from: sender,
//             to: recipients,
//             template_uuid: "86cb9271-5630-4e18-8405-744782bd55e0", //"86cb9271-5630-4e18-8405-744782bd55e0"
//             template_variables: {
//                 "company_info_name": "CartsureX",
//                 "name": name
//             },
//         });
//         console.log("Welcome email sent successfully", response);
//     } catch (error) {
//         console.error("Error sending welcome email:", error.stack); // Log the full stack trace
//         throw new Error(`Error sending Welcome email: ${error.message}`);
//     }
// };


// emails.js
const { mailtrapClient, sender } = require("./mailtrap.config.js");

const sendWelcomeEmail = async (email, name) => {
    console.log("Sending welcome email to:", email);
    console.log("Recipient name:", name);
    const recipients = [{ email }];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipients,
            template_uuid: "86cb9271-5630-4e18-8405-744782bd55e0",
            template_variables: {
                "company_info_name": "CartsureX",
                "name": name
            },
        });
        console.log("Welcome email sent successfully", response);
        return response;
    } catch (error) {
        console.error("Error sending welcome email:", error.stack);
        throw new Error(`Error sending Welcome email: ${error.message}`);
    }
};

module.exports = {
    sendWelcomeEmail
};