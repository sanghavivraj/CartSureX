const orderModel = require("../../models/orderProductModel");
const userModel = require("../../models/userModel");

const allOrderController = async (request, response) => {
  const userId = request.userId;

  const user = await userModel.findById(userId);

  if (user.role !== "ADMIN") {
    return response.status(403).json({
      message: "not access",
    });
  }

  let AllOrder = await orderModel.find().sort({ createdAt: -1 });

  // ✅ Add name to each order based on userId
  AllOrder = await Promise.all(
    AllOrder.map(async (order) => {
      const userData = await userModel.findById(order.userId).select("name");
      return {
        ...order.toObject(),
        userName: userData?.name || "Unknown",
      };
    })
  );

  return response.status(200).json({
    data: AllOrder,
    success: true,
  });
};

module.exports = allOrderController;
