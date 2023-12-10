import FirstPage from "./FirstPage";
import { getCoffees } from "@/lib/getData";

export default async function MainMenu() {
  const coffeeData: Promise<CoffeeData> = getCoffees();
  const coffeedata: CoffeeData = await coffeeData;
  return <FirstPage coffees={coffeedata} />;
}
