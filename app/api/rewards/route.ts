import { Rewards } from "@/app/(models)/Rewards";
import { connectToDb } from "@/app/utils/database";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await connectToDb();

  try {
    const rewardsData = await Rewards.find({});
    return new NextResponse(JSON.stringify(rewardsData), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: "Unexpected error occurred" }),
      { status: 500 }
    );
  }
}
