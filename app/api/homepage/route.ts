import { Homepage } from "@/app/(models)/Homepage";
import { connectToDb } from "@/app/utils/database";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await connectToDb();

  try {
    const homepageData = await Homepage.find({});
    return new NextResponse(JSON.stringify(homepageData), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: "Unexpected error occurred" }),
      { status: 500 }
    );
  }
}
