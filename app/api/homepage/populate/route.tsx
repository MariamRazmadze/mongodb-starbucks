import { Homepage } from "@/app/(models)/Homepage";
import { connectToDb } from "@/app/utils/database";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    await connectToDb();

    const filePath = path.resolve("./data/homepage.json");
    const jsonString = await fs.promises.readFile(filePath, "utf8");
    const homepageData = JSON.parse(jsonString);

    await Homepage.deleteMany({});

    await Homepage.insertMany(homepageData.homepageData);

    return new NextResponse(
      JSON.stringify({ message: "Database populated successfully" }),
      { status: 200 }
    );
  } catch (error) {
    const err = error as Error;
    console.log(
      `An error occurred while populating the database: ${err.message}`
    );
    return new NextResponse(
      JSON.stringify({ message: `Unexpected error occurred: ${err.message}` }),
      { status: 500 }
    );
  }
}
