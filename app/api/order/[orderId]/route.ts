import { connectToDb } from "@/app/utils/database";
import { NextRequest, NextResponse } from "next/server";
import { Order } from "@/app/(models)/Order";

export async function GET(req: NextRequest) {
  const id = req.nextUrl.pathname.split("/").pop();

  try {
    await connectToDb();
    const order = await Order.findById(id);
    if (!order) {
      return new NextResponse(
        JSON.stringify({ message: `Order with id ${id} not found` }),
        { status: 404 }
      );
    }
    return new NextResponse(JSON.stringify(order));
  } catch (error) {
    const err = error as Error;
    return new NextResponse(
      JSON.stringify({ message: `Failed to fetch order: ${err.message}` }),
      { status: 500 }
    );
  }
}
