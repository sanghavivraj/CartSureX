// controller/order/getAllWarranties.js
const orderModel = require("../../models/orderProductModel");
const productModel = require("../../models/productModel");

async function getAllWarranties(req, res) {
  try {
    // Get all orders with populated user details
    const orders = await orderModel.find().populate('userId', 'name email');

    // Process orders to extract warranty information
    const warranties = [];
    
    for (const order of orders) {
      // Skip if no product details
      if (!order.productDetails || order.productDetails.length === 0) continue;

      for (const product of order.productDetails) {
        try {
          // Get product details from product model
          const productDetails = await productModel.findById(product.productId);
          
          // Determine warranty duration - prioritize product.duration from order
          const warrantyDuration = product.duration || productDetails?.duration || 0;
          
          // Skip products without warranty
          if (warrantyDuration <= 0) continue;

          // Calculate dates
          const startDate = new Date(order.createdAt);
          const endDate = new Date(
            startDate.setFullYear(startDate.getFullYear() + warrantyDuration)
          );

          warranties.push({
            warrantyId: `${order._id}-${product.productId}`,
            orderId: order._id,
            userId: order.userId?._id || order.userId,
            userName: order.userId?.name || 'Unknown',
            userEmail: order.userId?.email || order.email || 'No email',
            productId: product.productId,
            productName: product.name || productDetails?.productName || 'Unknown Product',
            duration: warrantyDuration,
            startDate: order.createdAt,
            endDate: endDate,
            emailDone: product.emailDone || false,
            coverage: productDetails?.coverage || {}
          });
        } catch (productError) {
          console.error(`Error processing product ${product.productId}:`, productError);
          continue;
        }
      }
    }

    // Debug log to check what's being returned
    // console.log('Found warranties:', warranties.length, warranties);

    res.json({
      message: warranties.length ? "All Warranties" : "No warranties found",
      data: warranties,
      success: true,
      error: false,
    });
  } catch (err) {
    console.error('Error in getAllWarranties:', err);
    res.status(400).json({
      message: err.message || "Error fetching warranties",
      error: true,
      success: false,
    });
  }
}

module.exports = getAllWarranties;