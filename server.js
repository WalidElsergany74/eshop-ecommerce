import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Welcome To eshop website");
});
const calculateOrderAmount = (items) => {
    const array = []; // إعادة تعيين المصفوفة
    items.forEach((item) => {
      const { price, cartTotalQuantity } = item;
      
      const cartItemAmount = +price * +cartTotalQuantity;
      array.push(cartItemAmount);
    });
  
    const totalAmount = array.reduce((a, b) => a + b, 0);
    return totalAmount;
  };
  

app.post("/create-payment-intent", async (req, res) => {
    try {
      const { items, shipping } = req.body;
      
     
      
      const amount = calculateOrderAmount(items);
     
  
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: "usd",
        automatic_payment_methods: {
          enabled: true,
        },
        shipping: {
          address: {
            line1: shipping.address1,
            line2: shipping.address2,
            city: shipping.city,
            country: shipping.country,
            postal_code: shipping.postal,
          },
          name: shipping.recipietient,
          phone: shipping.phone,
        },
      });
  
      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (error) {
      console.error("Error creating PaymentIntent:", error);
      res.status(500).send({
        error: "Internal Server Error. Please try again later.",
      });
    }
  });
  
  

const PORT = process.env.PORT || 4242;
app.listen(PORT, () => console.log(`Node server listening on port ${PORT}`));
