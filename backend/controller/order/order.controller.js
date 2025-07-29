const orderModel = require("../../models/orderProductModel");
const Warranty = require("../../models/warrantyModel");

const orderController = async (request, response) => {
    try {
        const currentUserId = request.userId;
        
        if (!currentUserId) {
            return response.status(401).json({
                success: false,
                message: "Unauthorized - Please login first"
            });
        }

        const orderList = await orderModel.find({ userId: currentUserId })
            .sort({ createdAt: -1 })
            .lean();

        const ordersWithDetails = await Promise.all(orderList.map(async (order) => {
            // Get warranties for this order
            const warranties = await Warranty.find({ orderId: order._id }).lean();
            
            // Map products with their warranties
            const productsWithWarranty = order.productDetails.map(product => {
                const productWarranty = warranties.find(w => w.productId === product.productId) || {};
                return {
                    ...product,
                    warranty: {
                        duration: productWarranty.warrantyDuration || product.duration || 0,
                        endDate: productWarranty.warrantyEndDate,
                        status: productWarranty.status || 'active'
                    }
                };
            });

            return {
                ...order,
                productDetails: productsWithWarranty,
                warranties: warranties
            };
        }));

        response.status(200).json({
            success: true,
            data: ordersWithDetails,
            message: "Order list retrieved successfully"
        });

    } catch (error) {
        console.error("Order controller error:", error);
        response.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

module.exports = orderController;