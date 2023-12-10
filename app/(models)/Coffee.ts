import { Schema, models, model } from "mongoose";

const CoffeePriceSchema = new Schema({
  short: { type: Number },
  tall: { type: Number },
  grande: { type: Number },
  venti: { type: Number },
});

const CoffeeSchema = new Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  photoName: { type: String, required: true },
  detailedPhotoName: { type: String, required: true },
  description: { type: String, required: true },
  stars: { type: String, required: true },
  calories: { type: String, required: true },
  sugar: { type: String, required: true },
  fat: { type: String, required: true },
  type: { type: String, required: true },
  unavailable: { type: Boolean, required: true },
  prices: { type: CoffeePriceSchema, required: true },
});

const CoffeeCategorySchema = new Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  photoName: { type: String, required: true },
  link: { type: String, required: true },
  items: { type: [CoffeeSchema], required: true },
});

export const Coffee = models.Coffee || model("Coffee", CoffeeSchema);
export const CoffeeCategory =
  models.CoffeeCategory || model("CoffeeCategory", CoffeeCategorySchema);
