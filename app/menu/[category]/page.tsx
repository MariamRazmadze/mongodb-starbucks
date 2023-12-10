import { getCoffees } from "@/lib/getData";
import CategoryPage from "../CategoryPage";
import SideMenu from "../SideMenu";
import { Suspense } from "react";
import Loader from "@/components/loader";

type Params = {
  params: {
    category: string;
  };
};

export default async function Category({ params: { category } }: Params) {
  const coffeeData: Promise<CoffeeData> = getCoffees();
  const coffeedata: CoffeeData = await coffeeData;

  let categoryItems = coffeedata.find(
    (coffee: CoffeeType) =>
      coffee.name &&
      coffee.name.toLowerCase().replace(/ /g, "-") === category.toLowerCase()
  );

  return (
    <Suspense fallback={<Loader />}>
      <div className="menu-body">
        <SideMenu coffees={coffeedata} />
        <CategoryPage category={categoryItems} />
      </div>
    </Suspense>
  );
}

export async function generateStaticParams() {
  const coffeeData: Promise<CoffeeData> = getCoffees();
  const coffeedata: CoffeeData = await coffeeData;

  const paths = coffeedata.map((coffee: CoffeeType) => ({
    params: { category: coffee.name.toLowerCase().replace(/ /g, "-") },
  }));

  return paths;
}
