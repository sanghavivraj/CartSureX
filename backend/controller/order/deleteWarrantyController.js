// const orderModel = require('../../models/orderProductModel');

// async function deleteWarrantyController(req, res) {
//     try {
//         const { warrantyId } = req.params;

//         // Split warrantyId into orderId and productId
//         const [orderId, productId] = warrantyId.split('-');

//         // Find the order
//         const order = await orderModel.findById(orderId);
//         if (!order) {
//             return res.status(404).json({ 
//                 success: false, 
//                 message: 'Order not found' 
//             });
//         }

//         // Find the product in order details
//         const productIndex = order.productDetails.findIndex(
//             p => p.productId === productId
//         );

//         if (productIndex === -1) {
//             return res.status(404).json({ 
//                 success: false, 
//                 message: 'Warranty not found' 
//             });
//         }

//         // Remove the warranty information
//         order.productDetails[productIndex].warrantyId = undefined;
//         order.productDetails[productIndex].startDate = undefined;
//         order.productDetails[productIndex].endDate = undefined;
//         order.productDetails[productIndex].duration = undefined;

//         await order.save();

//         res.json({ 
//             success: true, 
//             message: 'Warranty removed successfully' 
//         });
//     } catch (err) {
//         res.status(500).json({ 
//             success: false, 
//             message: err.message 
//         });
//     }
// }

// module.exports = deleteWarrantyController;
const orderModel = require('../../models/orderProductModel');

async function deleteWarrantyController(req, res) {
    try {
        const { warrantyId } = req.params;
        const [orderId, productId] = warrantyId.split('-');

        // Find and update the order to completely remove warranty
        const result = await orderModel.updateOne(
            { _id: orderId, "productDetails.productId": productId },
            {
                $unset: {
                    "productDetails.$.warrantyId": 1,
                    "productDetails.$.startDate": 1,
                    "productDetails.$.endDate": 1,
                    "productDetails.$.duration": 1,
                    "productDetails.$.emailSent": 1
                }
            }
        );

        if (result.modifiedCount === 0) {
            return res.status(404).json({
                success: false,
                message: 'Warranty not found'
            });
        }

        res.json({
            success: true,
            message: 'Warranty permanently deleted'
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

module.exports = deleteWarrantyController;