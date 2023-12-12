import { connectToDb } from "@/app/utils/database";
import { NextRequest, NextResponse } from "next/server";
import { City } from "@/app/(models)/City";

export async function GET(req: NextRequest) {
  await connectToDb();

  try {
    const cities = await City.find({})
      .populate("position")
      .populate("storeHours");
    return new NextResponse(JSON.stringify(cities), { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({ message: "Unexpected error occurred" }),
      { status: 500 }
    );
  }
}
