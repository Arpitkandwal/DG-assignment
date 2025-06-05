import { Schema, model } from "mongoose";

const LeadSchema = new Schema({
  userId: String,
  email: String,
});

export default model("Lead", LeadSchema);
