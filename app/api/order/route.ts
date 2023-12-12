import { connectToDb } from "@/app/utils/database";
import { NextRequest, NextResponse } from "next/server";
import { Order } from "@/app/(models)/Order";

export async function GET(req: NextRequest) {
  try {
    await connectToDb();
    const orders = await Order.find({});
    return new NextResponse(JSON.stringify(orders), { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({ message: "Unexpected error occurred" }),
      { status: 500 }
    );
  }
}
