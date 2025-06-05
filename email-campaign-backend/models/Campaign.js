import mongoose from "mongoose";

const campaignSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  campaignName: { type: String, required: true },
  scheduledTime: { type: Date, required: true },
  emailList: [{ type: String, required: true }],
  sent: { type: Boolean, default: false },
});

const Campaign = mongoose.model("Campaign", campaignSchema);
export default Campaign;
