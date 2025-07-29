const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    productDetails: {
        type: [{
            productId: String,
            name: String,
            price: Number,
            quantity: Number,
            image: String,
            email: String,
            userId: String,
            emailSent: {  // Add this new field
                type: Boolean,
                default: false
            },
            emailSentAt: {  // Optional: track when email was sent
                type: Date,
                default: null
            }
        }],
        default: [],
        required: true
    },
    email: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    paymentDetails: {
        paymentId: {
            type: String,
            default: ""
        },
        payment_method_type: [],
        payment_status: {
            type: String,
            default: ""
        }
    },
    shipping_options: [],
    totalAmount: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ["Processing", "Packed", "Shipped", "Out for Delivery", "Delivered"],
        default: "Processing"
    },
    warrantyDetails: {
        type: Array,
        default: []
    }
}, {
    timestamps: true
});

const orderModel = mongoose.model('order', orderSchema);

module.exports = orderModel;