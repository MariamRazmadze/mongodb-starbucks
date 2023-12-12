import mongoose, { Schema, models, model } from "mongoose";

const PositionSchema = new Schema({
  lat: Number,
  lng: Number,
  city: { type: mongoose.Schema.Types.ObjectId, ref: "City" },
});

const StoreHoursSchema = new Schema({
  open: String,
  close: String,
  city: { type: mongoose.Schema.Types.ObjectId, ref: "City" },
});

const CitySchema = new Schema({
  cityName: String,
  address: String,
  country: String,
  position: { type: mongoose.Schema.Types.ObjectId, ref: "Position" },
  storeHours: { type: mongoose.Schema.Types.ObjectId, ref: "StoreHours" },
});

export const Position = models.Position || model("Position", PositionSchema);
export const StoreHours =
  models.StoreHours || model("StoreHours", StoreHoursSchema);
export const City = models.City || model("City", CitySchema);
