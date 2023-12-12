import { Schema, models, model } from "mongoose";

const OrderItemSchema = new Schema({
  coffeeId: Number,
  orderId: Number,
  name: String,
  quantity: Number,
  size: String,
  unitPrice: Number,
  totalPrice: Number,
});

const OrderSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  fullName: String,
  phoneNumber: String,
  address: String,
  idNumber: String,
  totalPrice: Number,
  items: [OrderItemSchema],
});

export const Order = models.Order || model("Order", OrderSchema);
