const orderModel = require("../../models/orderProductModel");
const { sendWarrantyEmail } = require("../../services/emailService");

async function updateWarranty(req, res) {
    try {
        const { warrantyId, userEmail, userName, productName, endDate } = req.body;

        if (!userEmail) {
            return res.status(400).json({
                message: "User email is required",
                success: false,
                error: true
            });
        }

        const [orderId, productId] = warrantyId.split('-');

        const order = await orderModel.findById(orderId);
        if (!order) {
            return res.status(404).json({
                message: "Order not found",
                success: false,
                error: true
            });
        }

        const productIndex = order.productDetails.findIndex(
            p => p.productId === productId
        );

        if (productIndex === -1) {
            return res.status(404).json({
                message: "Product not found in order",
                success: false,
                error: true
            });
        }

        if (order.productDetails[productIndex].emailSent) {
            return res.status(400).json({
                message: "Email already sent for this warranty",
                success: false,
                error: true
            });
        }

        try {
            await sendWarrantyEmail(userEmail, userName, productName, endDate);
            
            order.productDetails[productIndex].emailSent = true;
            order.productDetails[productIndex].emailSentAt = new Date();
            
            await order.save();

            return res.json({
                message: "Warranty email sent successfully",
                success: true,
                error: false
            });

        } catch (emailError) {
            console.error("Email sending failed:", emailError);
            return res.status(500).json({
                message: "Failed to send email: " + emailError.message,
                success: false,
                error: true
            });
        }

    } catch (err) {
        console.error("Error updating warranty:", err);
        res.status(500).json({
            message: err.message || "Internal server error",
            error: true,
            success: false,
        });
    }
}

module.exports = updateWarranty;