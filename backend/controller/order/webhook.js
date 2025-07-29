const express = require('express');
const stripe = require('../../config/stripe');
const orderModel = require('../../models/orderProductModel');  // Adjusted path
const addToCartModel = require('../../models/cartProduct');  // Adjusted path

const router = express.Router();
const endpointSecret = process.env.STRIPE_ENDPOINT_WEBHOOK_SECRET_KEY;

router.post("/", async (request, response) => {
    const sig = request.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(
            request.rawBody || request.body.toString('utf8'),
            sig,
            endpointSecret
        );
    } catch (err) {
        console.error('⚠️ Webhook Error:', err.message);
        return response.status(400).json({ error: `Webhook Error: ${err.message}` });
    }

    try {
        if (event.type === 'checkout.session.completed') {
            const session = event.data.object;
            console.log('💰 Processing checkout session:', session.id);

            // Validate required fields
            if (!session.metadata?.userId) {
                throw new Error('User ID is required in metadata');
            }

            // Fetch line items
            const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
            if (!lineItems?.data?.length) {
                throw new Error('No line items found');
            }

            // Process products (FIXED IMAGE HANDLING)
            const productDetails = await Promise.all(
                lineItems.data.map(async (item) => {
                  const product = await stripe.products.retrieve(item.price.product);
                  return {
                    productId: product.metadata.productId || item.price.product,
                    name: product.name,
                    price: item.price.unit_amount / 100,
                    quantity: item.quantity,
                    image: product.metadata.imageUrl || product.images?.[0] || null,
                    emailDone: false // ✅ This makes your warranty system work permanently
                  };
                })
              );

            // Create order
            const order = new orderModel({
                productDetails,
                email: session.customer_email,
                userId: session.metadata.userId,
                paymentDetails: {
                    paymentId: session.payment_intent,
                    payment_method_type: session.payment_method_types,
                    payment_status: session.payment_status,
                },
                shipping_options: session.shipping_options?.map(s => ({
                    shipping_rate: s.shipping_rate,
                    shipping_amount: s.shipping_amount / 100
                })) || [],
                totalAmount: session.amount_total / 100
            });

            // Save order and clear cart
            await order.save();
            await addToCartModel.deleteMany({ userId: session.metadata.userId });

            return response.status(200).json({ success: true });
        }

        return response.status(200).json({ received: true });

    } catch (error) {
        console.error('❌ Webhook Processing Error:', error.message);
        return response.status(500).json({ 
            error: 'Internal Server Error',
            details: error.message 
        });
    }
});

module.exports = router;
