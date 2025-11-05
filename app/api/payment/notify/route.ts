import { NextRequest, NextResponse } from "next/server";

// PayHere will POST payment notifications to this endpoint
export async function POST(request: NextRequest) {
  try {
    const body = await request.formData();
    
    // Extract PayHere payment data
    const merchantId = body.get("merchant_id");
    const orderId = body.get("order_id");
    const paymentId = body.get("payment_id");
    const payhereAmount = body.get("payhere_amount");
    const payhereCurrency = body.get("payhere_currency");
    const statusCode = body.get("status_code");
    const md5sig = body.get("md5sig");

    // Log the notification for debugging
    console.log("PayHere Notification Received:", {
      merchantId,
      orderId,
      paymentId,
      payhereAmount,
      payhereCurrency,
      statusCode,
      md5sig,
    });

    // Status code 2 means payment was successful
    if (statusCode === "2") {
      console.log(`Payment successful for order: ${orderId}`);
      
      // TODO: Verify the MD5 signature for security
      // const merchantSecret = process.env.PAYHERE_MERCHANT_SECRET;
      // const localMd5sig = md5(merchantId + orderId + payhereAmount + payhereCurrency + statusCode + merchantSecret);
      // if (localMd5sig !== md5sig) {
      //   return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
      // }

      // The enrollment is handled in the success page
      // This endpoint just logs the notification
      
      return NextResponse.json({ success: true, message: "Payment notification received" });
    } else {
      console.log(`Payment failed/cancelled for order: ${orderId}, status: ${statusCode}`);
      return NextResponse.json({ success: false, message: "Payment not successful" });
    }
  } catch (error) {
    console.error("Error processing PayHere notification:", error);
    return NextResponse.json(
      { error: "Failed to process notification" },
      { status: 500 }
    );
  }
}

// Handle GET requests (for testing)
export async function GET() {
  return NextResponse.json({
    message: "PayHere payment notification endpoint",
    status: "active",
  });
}
