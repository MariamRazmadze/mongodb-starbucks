import { Schema, models, model } from "mongoose";

const FooterSchema = new Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true, maxlength: 100 },
  content: [
    {
      id: { type: Number, required: true },
      text: { type: String, required: true, maxlength: 100 },
      link: { type: String, required: true, maxlength: 500 },
    },
  ],
});

export const Footer = models.Footer || model("Footer", FooterSchema);
