import { Schema, models, model } from "mongoose";

const QuestionSchema = new Schema({
  question: { type: String, required: true, maxlength: 500 },
  options: [{ type: String, required: true, maxlength: 1000 }],
  correctOption: { type: Number, required: true },
  points: { type: Number, required: true },
});

export const Question = models.Question || model("Question", QuestionSchema);
