import { Coffee, CoffeeCategory } from "@/app/(models)/Coffee";
import { connectToDb } from "@/app/utils/database";
import fs from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  await connectToDb();
  try {
    const filePath = path.resolve("./data/coffee.json");
    const jsonString = await fs.promises.readFile(filePath, "utf8");
    const coffeeData = JSON.parse(jsonString);

    await CoffeeCategory.deleteMany({});
    await Coffee.deleteMany({});

    for (let category of coffeeData) {
      let categoryKey = Object.keys(category)[0];
      let categoryData = category[categoryKey];
      let items = categoryData.items;
      delete categoryData.items;

      let coffeeCategory = new CoffeeCategory(categoryData);
      await coffeeCategory.save();

      for (let item of items) {
        let coffee = new Coffee(item);
        coffee.category = coffeeCategory._id;
        await coffee.save();
        coffeeCategory.items.push(coffee);
      }
      await coffeeCategory.save();
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
