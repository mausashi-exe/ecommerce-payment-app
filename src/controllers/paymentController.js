const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.processPayment = async (req, res) => {
  try {
    const { items, userEmail } = req.body;

    // Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: items.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: { name: item.name },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/failed`,
      customer_email: userEmail,
    });

    res.json({ id: session.id, url: session.url });
  } catch (error) {
    res
      .status(500)
      .json({ error: "PAYMENT_GATEWAY_ERROR", details: error.message });
  }
};
