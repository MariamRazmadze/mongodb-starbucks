import { Question } from "@/app/(models)/Question";
import { connectToDb } from "@/app/utils/database";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await connectToDb();

  try {
    const questions = await Question.find({});
    return new NextResponse(JSON.stringify(questions), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: "Unexpected error occurred" }),
      { status: 500 }
    );
  }
}
