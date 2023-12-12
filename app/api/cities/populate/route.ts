import { City, Position, StoreHours } from "@/app/(models)/City";
import { connectToDb } from "@/app/utils/database";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    await connectToDb();

    const filePath = path.resolve("./data/cities.json");
    const jsonString = await fs.promises.readFile(filePath, "utf8");
    const cityData = JSON.parse(jsonString);

    await City.deleteMany({});
    await Position.deleteMany({});
    await StoreHours.deleteMany({});

    for (const city of cityData) {
      const position = await Position.create(city.position);
      const storeHours = await StoreHours.create(city.storeHours);
      city.position = position._id;
      city.storeHours = storeHours._id;
      await City.create(city);
    }

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
