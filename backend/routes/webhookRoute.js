const express = require('express');
const router = express.Router();
const stripe = require('../config/stripe');
const orderModel = require('../models/orderProductModel');
const addToCartModel = require('../models/cartProduct');

const endpointSecret = process.env.STRIPE_ENDPOINT_WEBHOOK_SECRET_KEY;

// Stripe requires the raw body to verify signature
router.post(
  '/',
  express.raw({ type: 'application/json' }),
  async (req, res) => {
    const sig = req.headers['stripe-signature'];

    let event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
      console.error('⚠️ Webhook signature verification failed:', err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle checkout session completed
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      console.log('✅ Checkout session completed:', session.id);

      try {
        const userId = session.metadata?.userId;
        if (!userId) throw new Error('User ID not found in metadata');

        const lineItems = await stripe.checkout.sessions.listLineItems(session.id);

        const productDetails = await Promise.all(
          lineItems.data.map(async (item) => {
            const product = await stripe.products.retrieve(item.price.product);
            return {
              productId: product.metadata.productId,
              name: product.name,
              price: item.price.unit_amount / 100,
              quantity: item.quantity,
              image: product.images?.[0] || null
            };
          })
        );

        const order = new orderModel({
          productDetails,
          email: session.customer_email,
          userId,
          paymentDetails: {
            paymentId: session.payment_intent,
            payment_method_type: session.payment_method_types,
            payment_status: session.payment_status
          },
          totalAmount: session.amount_total / 100
        });

        await order.save();
        await addToCartModel.deleteMany({ userId });
        console.log('📝 Order saved & cart cleared for user:', userId);
      } catch (error) {
        console.error('❌ Error processing order:', error.message);
      }
    }

    res.status(200).json({ received: true });
  }
);

module.exports = router;
