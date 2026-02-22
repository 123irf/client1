import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: NextRequest) {
  try {
    const { amount, items } = await req.json();

    if (!amount || amount < 1) {
      return NextResponse.json({ success: false, message: "Invalid amount" });
    }

    const options = {
      amount: amount * 100, // Convert to paisa
      currency: "INR",
      receipt: `order_${Date.now()}`,
      notes: {
        items: JSON.stringify(items?.map((i: any) => i.title).join(", ") || "KidZoFi Order"),
      },
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json({
      success: true,
      order,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (err) {
    console.error("Create order error:", err);
    return NextResponse.json({ success: false, message: "Server error. Please try again." });
  }
}
