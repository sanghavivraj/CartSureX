// models/warrantyModel.js
const mongoose = require("mongoose");

const warrantySchema = new mongoose.Schema(
  {
    warrantyId: { type: String, unique: true, required: true },
    orderId: { type: String, required: true },
    userId: { type: String, required: true },
    userEmail: { type: String, required: true },
    productId: { type: String, required: true },
    productName: { type: String, required: true },
    productDetails: { type: Object, required: true },
    purchaseDate: { type: Date, required: true },
    warrantyDuration: { type: Number, required: true },
    warrantyStartDate: { type: Date, required: true },
    warrantyEndDate: { type: Date, required: true },
    coverage: { type: Object, required: true },
  },
  { timestamps: true }
);

const Warranty = mongoose.model("Warranty", warrantySchema);
module.exports = Warranty;