import { Schema, model, models } from "mongoose";

const codeSnippetSchema = new Schema({
  code: { type: String, required: true },
  language: { type: String, required: true },
  voters: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

const rumbleSchema = new Schema({
  snippets: [codeSnippetSchema],
  createdAt: { type: Date, default: Date.now },
});

const Rumble = models.Rumble || model("Rumble", rumbleSchema);

export default Rumble;
