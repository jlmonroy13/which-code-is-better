import { Schema, model, models } from "mongoose";

const commentSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  userName: { type: String },
  userImage: { type: String },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const codeSnippetSchema = new Schema({
  code: { type: String, required: true },
  language: { type: String, required: true },
});

const voteSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  snippetId: { type: Schema.Types.ObjectId, ref: "CodeSnippet", required: true },
  rumbleDay: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const rumbleSchema = new Schema({
  snippets: [codeSnippetSchema],
  rumbleDay: { type: String, required: true, unique: true },
  comments: [commentSchema],
  votes: [voteSchema],
  createdAt: { type: Date, default: Date.now },
});

const Rumble = models?.Rumble || model("Rumble", rumbleSchema);

export default Rumble;
