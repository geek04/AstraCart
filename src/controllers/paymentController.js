// In paymentController.js
/* export const createPaymentIntent = async (req, res) => {
  const { amount } = req.body;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(amount * 100), // Convert to cents
    currency: 'usd',
    metadata: { userId: req.user.id }
  });

  res.json({ clientSecret: paymentIntent.client_secret });
};
*/