import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Campaign from "./models/Campaign.js";
import runScheduler from "./scheduler/EmailScheduler.js";
import cors from "cors";


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    // Insert dummy campaigns if none exists
    Campaign.countDocuments().then(async (count) => {
      if (count === 0) {
        console.log("Adding dummy campaigns...");

        await Campaign.create([
          {
            userId: "user1",
            campaignName: "Launch Campaign",
            scheduledTime: new Date(Date.now() + 60 * 1000), 
            emailList: ["test1@mail.com", "test2@mail.com"],
            sent: false,
          },
          {
            userId: "user2",
            campaignName: "Promo Campaign",
            scheduledTime: new Date(Date.now() + 2 * 60 * 1000), // 2 minutes from now
            emailList: ["promo@mail.com"],
            sent: false,
          },
        ]);
        console.log("Dummy campaigns added.");
      } 

      // Start scheduler after DB and data ready
      runScheduler();

      // Start Express server
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });


app.get("/api/campaigns", async (req, res) => {
  const campaigns = await Campaign.find();
  res.json(campaigns);
});
