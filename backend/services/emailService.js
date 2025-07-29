const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS.replace(/\s+/g, ''),
    },
});

const sendWelcomeEmail = async (email, name) => {
    const htmlContent = `
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <style>
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background-color: #f3f4f6;
                margin: 0;
                padding: 0;
                color: #1f2937;
            }
            .container {
                max-width: 620px;
                margin: 40px auto;
                background-color: #ffffff;
                border-radius: 12px;
                overflow: hidden;
                box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
            }
            .header {
                background: linear-gradient(135deg, #6366f1, #818cf8);
                padding: 30px 20px;
                text-align: center;
            }
            .header h1 {
                color: #ffffff;
                font-size: 28px;
                margin: 0;
                letter-spacing: 1px;
            }
            .content {
                padding: 30px;
                background-color: #f9fafb;
            }
            .content h2 {
                font-size: 22px;
                color: #111827;
                margin-bottom: 15px;
            }
            .content p {
                font-size: 16px;
                margin-bottom: 15px;
            }
            ul {
                padding-left: 20px;
                margin-bottom: 20px;
            }
            li {
                margin-bottom: 10px;
            }
            .highlight {
                background-color: #eef2ff;
                padding: 15px 20px;
                border-left: 4px solid #6366f1;
                border-radius: 6px;
                margin-bottom: 25px;
                font-size: 15px;
            }
            .button {
                display: inline-block;
                padding: 12px 24px;
                background-color: #4f46e5;
                color: #ffffff;
                font-weight: bold;
                text-decoration: none;
                border-radius: 6px;
                font-size: 16px;
                transition: background-color 0.3s ease;
                margin: 20px 0;
            }
            .button:hover {
                background-color: #4338ca;
            }
            .footer {
                padding: 25px 20px;
                text-align: center;
                font-size: 14px;
                color: #6b7280;
                background-color: #ffffff;
                border-top: 1px solid #e5e7eb;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Welcome to CartsureX!</h1>
            </div>
            <div class="content">
                <h2>Hey ${name},</h2>
                <p>We're absolutely thrilled to welcome you to <strong>CartsureX</strong> — your new go-to platform for all things shopping and selling!</p>

                <div class="highlight">
                    💡 <strong>Did you know?</strong> With our unique <strong>Digital Warranty Card Storage</strong>, you can securely store, access, and get notified about your product warranties — all in one place!
                </div>

                <p>By joining CartsureX, you unlock access to a smarter way to shop. Here's what you can look forward to:</p>

                <ul>
                    <li>🛍️ Browse and discover high-quality, curated products</li>
                    <li>🎁 Get exclusive member-only deals and limited-time offers</li>
                    <li>🔐 Enjoy seamless, secure checkout with total peace of mind</li>
                    <li>🧾 Manage warranties digitally and never miss an expiry again</li>
                    <li>🤝 Be part of a growing, trusted community of buyers and sellers</li>
                </ul>

                <p>We're building CartsureX with <strong>you</strong> in mind — focusing on transparency, convenience, and innovation every step of the way.</p>

                <a href="https://www.youtube.com/" class="button">Start Your Journey</a>

                <p style="margin-top: 30px;">
                    Need help getting started? Want to explore our features more deeply?<br>
                    Our team is just a message away — we're always here for you. 💬
                </p>

                <p style="margin-top: 10px; font-size: 15px;">
                    Thanks for choosing CartsureX. We're so glad you're here.
                </p>

                <div class="footer">
                    <p>© CartsureX. All rights reserved.</p>
                    <p>Built with 💜 for smart and secure shopping experiences.</p>
                </div>
            </div>
        </div>
    </body>
    </html>
    `;

    try {
        await transporter.sendMail({
            from: `"CartsureX" <${process.env.SMTP_USER}>`,
            to: email,
            subject: "Welcome to CartsureX!",
            html: htmlContent,
        });
        console.log("Welcome email sent to:", email);
        return true;
    } catch (error) {
        console.error("Email sending error:", error.message);
        throw error;
    }
};

const sendWarrantyEmail = async (email, name, productName, endDate) => {
    try {
        if (!email) {
            throw new Error("Recipient email is required");
        }

        await transporter.sendMail({
            from: `"CartsureX Support" <${process.env.SMTP_USER}>`,
            to: email,
            subject: `Warranty Information for ${productName}`,
            html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <style>
                    body {
                        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                        background-color: #f3f4f6;
                        margin: 0;
                        padding: 0;
                        color: #1f2937;
                    }
                    .container {
                        max-width: 620px;
                        margin: 40px auto;
                        background-color: #ffffff;
                        border-radius: 12px;
                        overflow: hidden;
                        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
                    }
                    .header {
                        background: linear-gradient(135deg, #facc15, #f59e0b);
                        padding: 30px 20px;
                        text-align: center;
                    }
                    .header h1 {
                        color: #ffffff;
                        font-size: 26px;
                        margin: 0;
                        letter-spacing: 1px;
                    }
                    .content {
                        padding: 30px;
                        background-color: #f9fafb;
                    }
                    .content h2 {
                        font-size: 22px;
                        color: #b91c1c;
                        margin-bottom: 15px;
                    }
                    .content p {
                        font-size: 16px;
                        margin-bottom: 15px;
                    }
                    .highlight {
                        background-color: #fef9c3;
                        padding: 15px 20px;
                        border-left: 4px solid #f59e0b;
                        border-radius: 6px;
                        margin-bottom: 25px;
                        font-size: 15px;
                    }
                    .button {
                        display: inline-block;
                        padding: 12px 24px;
                        background-color: #f59e0b;
                        color: #ffffff;
                        font-weight: bold;
                        text-decoration: none;
                        border-radius: 6px;
                        font-size: 16px;
                        transition: background-color 0.3s ease;
                        margin: 20px 0;
                    }
                    .button:hover {
                        background-color: #d97706;
                    }
                    .footer {
                        padding: 25px 20px;
                        text-align: center;
                        font-size: 14px;
                        color: #6b7280;
                        background-color: #ffffff;
                        border-top: 1px solid #e5e7eb;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>Warranty Expiration Notice</h1>
                    </div>
                    <div class="content">
                        <h2>Hello ${name},</h2>
                        <p>This is a gentle reminder from <strong>CartsureX</strong> — your warranty for the product <strong>${productName}</strong> is about to expire on <strong>${new Date(endDate).toLocaleDateString()}</strong>.</p>
                        
                        <div class="highlight">
                            🛡️ <strong>Take Action Now:</strong> Don't let your protection lapse. Check if you're eligible for warranty extension or take note of service requirements.
                        </div>

                        <p>Here's what you can do:</p>
                        <ul>
                            <li>📅 Set a calendar reminder for the expiry date</li>
                            <li>📝 Check for warranty extension options</li>
                            <li>🔧 Visit the manufacturer site for repairs or claims</li>
                            <li>💾 Download your digital warranty certificate anytime</li>
                        </ul>

                        <p>If you've already taken care of this — feel free to ignore this message. Otherwise, we're here to make things easier for you.</p>

                        <a href="https://www.youtube.com/" class="button">Manage My Warranty</a>

                        <p style="margin-top: 30px;">
                            Got questions? Need help with your product or warranty status?<br>
                            Our support team is happy to assist anytime.
                        </p>

                        <p style="margin-top: 10px; font-size: 15px;">
                            Stay safe and protected,<br>
                        <strong> — The CartsureX Team </strong>
                        </p>

                        <div class="footer">
                            <p>© CartsureX. All rights reserved.</p>
                            <p>Built with 💜 for smart and secure shopping experiences.</p>
                        </div>
                    </div>
                </div>
            </body>
            </html>
            `,
        });
        console.log("Warranty email sent to:", email);
        return true;
    } catch (error) {
        console.error("Warranty email error:", error.message);
        throw error;
    }
};

module.exports = { sendWelcomeEmail, sendWarrantyEmail };