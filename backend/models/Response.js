import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
  questionId: String,
  selectedOption: String,
});

const responseSchema = new mongoose.Schema(
  {
    pollId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Poll",
      required: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    answers: [answerSchema],

    submittedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

export default mongoose.model("Response", responseSchema);
