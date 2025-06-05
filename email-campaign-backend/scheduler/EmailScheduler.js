import cron from "node-cron";
import Campaign from "../models/Campaign.js";

function runScheduler() {
  cron.schedule("* * * * *", async () => {
    console.log("⏰ Scheduler triggered", new Date().toISOString());

    const now = new Date();
    const pendingCampaigns = await Campaign.find({
      // scheduledTime: { $lte: now },
      sent: false,
    });

    console.log(`📩 Found ${pendingCampaigns.length} campaigns`);

    for (const campaign of pendingCampaigns) {
      campaign.emailList.forEach((email) => {
        console.log(`Sending to ${email} for campaign ${campaign.campaignName}`);
      });
      campaign.sent = true;
      await campaign.save();
    }
  });
}

export default runScheduler;
