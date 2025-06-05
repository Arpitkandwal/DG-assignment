import { Router } from "express";
const router = Router();
import Lead from "../models/Lead.js";

router.post("/create", async (req, res) => {
  try {
    const { userId, email } = req.body;
    const lead = await Lead.create({ userId, email });
    res.status(201).json(lead);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const leads = await Lead.find({ userId: req.params.userId });
    res.status(200).json(leads);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
