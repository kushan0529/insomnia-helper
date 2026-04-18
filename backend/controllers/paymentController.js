const Razorpay = require('razorpay');
const crypto = require('crypto');
const User = require('../models/User');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

exports.createOrder = async (req, res) => {
  try {
    const options = {
      amount: 50000, // 500 INR in paise
      currency: "INR",
      receipt: "receipt_" + Math.random().toString(36).substring(7)
    };
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (expectedSign === razorpay_signature) {
      await User.findByIdAndUpdate(req.user._id, { isPremium: true });
      res.json({ message: "Payment verified successfully" });
    } else {
      res.status(400).json({ message: "Invalid signature" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
