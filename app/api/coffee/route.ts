import { CoffeeCategory } from "@/app/(models)/Coffee";
import { connectToDb } from "@/app/utils/database";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await connectToDb();

  try {
    const coffeeData = await CoffeeCategory.find({});
    return new NextResponse(JSON.stringify(coffeeData), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: "Unexpected error occurred" }),
      { status: 500 }
    );
  }
}
