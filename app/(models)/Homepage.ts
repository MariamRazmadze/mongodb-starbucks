import { Schema, models, model } from "mongoose";

const HomepageSchema = new Schema({
  title: { type: String, required: true },
  promo: { type: String, required: true },
  photoName: { type: String, required: true },
  buttonText: { type: String, required: true },
  backgroundColor: { type: String, required: true },
  buttonColor: { type: String, required: true },
  buttonHoverColor: { type: String, required: true },
});

export const Homepage = models.Homepage || model("Homepage", HomepageSchema);
