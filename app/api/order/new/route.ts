import { connectToDb } from "@/app/utils/database";
import { NextRequest, NextResponse } from "next/server";
import { Order } from "@/app/(models)/Order";

export const POST = async (req: NextRequest) => {
  const {
    userId,
    fullName,
    phoneNumber,
    idNumber,
    address,
    items,
    totalPrice,
  } = await req.json();

  try {
    await connectToDb();
    const newOrder = new Order({
      userId: userId,
      fullName: fullName,
      phoneNumber: phoneNumber,
      idNumber: idNumber,
      address: address,
      items: items,
      totalPrice: totalPrice,
    });
    await newOrder.save();
    return new NextResponse(JSON.stringify(newOrder), { status: 201 });
  } catch (error) {
    const err = error as Error;
    return new NextResponse(
      JSON.stringify({ message: `failed to create order: ${err.message}` }),
      { status: 500 }
    );
  }
};
