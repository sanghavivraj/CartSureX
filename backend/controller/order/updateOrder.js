const Order = require("../../models/orderProductModel");

const updateOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;

        if (!["Processing", "Packed", "Shipped", "Out for Delivery", "Delivered", "Cancelled"].includes(status)) {
            return res.status(400).json({ message: "Invalid status value" });
        }

        const order = await Order.findByIdAndUpdate(
            orderId,
            { status },
            { new: true }
        );

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.status(200).json({ 
            message: "Order status updated successfully", 
            order,
            success: true
        });
    } catch (error) {
        res.status(500).json({ 
            message: "Error updating order status", 
            error: error.message,
            success: false
        });
    }
};

module.exports = updateOrder;