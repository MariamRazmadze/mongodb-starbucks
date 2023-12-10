import { Schema, models, model } from "mongoose";

const RewardsSchema = new Schema({
  title: { type: String, required: true },
  promo: { type: String, required: true },
  photoName: { type: String, required: true },
  number: { type: Number, required: true },
});

export const Rewards = models.Rewards || model("Rewards", RewardsSchema);
