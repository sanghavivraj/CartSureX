const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productName: String,
    brandName: String,
    category: String,
    productImage: [],
    description: String,
    price: Number,
    sellingPrice: Number,
    estimatedDelivery: Number,
    duration: Number, // Warranty duration in years
    coverage: {
      manufacturingDefects: String,
      breakdownOrMalfunction: String,
      specificParts: String,
      extendedWarranty: String,
      accidentalDamage: String,
      normalWearAndTear: String,
      misuseOrAbuse: String,
      unauthorizedRepairs: String,
      externalFactors: String,
      specificConditions: String,
    },
  },
  { timestamps: true }
);

const productModel = mongoose.model("product", productSchema);
module.exports = productModel;