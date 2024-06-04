import { Schema, model, models } from "mongoose";

const rumbleSchema = new Schema(
  {
    date: String,
  },
  {
    timestamps: true,
  }
);

const Rumble = models.Rumble || model("Rumble", rumbleSchema);

export default Rumble;
