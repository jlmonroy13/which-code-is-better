import { Schema, model, models } from "mongoose";

const commentSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  userImage: { type: String },
  userName: { type: String },
  userEmail: { type: String },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  likes: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
});

const codeSnippetSchema = new Schema({
  code: { type: String, required: true },
  language: { type: String, required: true },
});

const voteSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  snippetId: { type: Schema.Types.ObjectId, ref: "CodeSnippet", required: true },
  createdAt: { type: Date, default: Date.now },
});

const rumbleSchema = new Schema({
  snippets: [codeSnippetSchema],
  rumbleWeek: { type: String, required: true, unique: true },
  comments: [commentSchema],
  votes: [voteSchema],
  createdAt: { type: Date, default: Date.now },
  title: { type: String, required: true, unique: true },
});

const Rumble = models?.Rumble || model("Rumble", rumbleSchema);

export default Rumble;
