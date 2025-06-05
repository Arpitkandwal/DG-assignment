import express from "express";
import Campaign from "../models/Campaign.js";

const router = express.Router();

// Create campaign API
router.post("/", async (req, res) => {
  try {
    const campaign = new Campaign(req.body);
    await campaign.save();
    res.status(201).json({ message: "Campaign created", campaign });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all campaigns for user (optional)
router.get("/:userId", async (req, res) => {
  try {
    const campaigns = await Campaign.find({ userId: req.params.userId });
    res.json(campaigns);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
