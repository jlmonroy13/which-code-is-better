import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email is unique"],
  },
  image: {
    type: String,
  },
  emailVerified: { type: Boolean, default: false },
});

const User = models.User ?? model("User", userSchema);

export default User;
