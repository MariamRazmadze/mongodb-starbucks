import { Footer } from "@/app/(models)/Footer";
import { connectToDb } from "@/app/utils/database";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await connectToDb();

  try {
    const footerData = await Footer.find({});
    return new NextResponse(JSON.stringify(footerData), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: "Unexpected error occurred" }),
      { status: 500 }
    );
  }
}
