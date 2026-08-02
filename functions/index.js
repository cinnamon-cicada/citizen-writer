const { onMessagePublished } = require("firebase-functions/v2/pubsub");
const { logger } = require("firebase-functions");
const { google } = require("googleapis");

const PROJECT_ID = "citizenwriter";
const HARD_LIMIT_USD = 10;

/**
 * Triggered by Cloud Billing budget notifications (published to the
 * "billing-budget-alerts" Pub/Sub topic — see console setup instructions).
 * Cloud Billing publishes on every threshold crossing, not just once, so
 * this compares the reported spend directly against the hard limit rather
 * than trusting which threshold fired.
 */
exports.enforceBudgetHardCap = onMessagePublished(
  { topic: "billing-budget-alerts", region: "us-central1" },
  async (event) => {
    const data = event.data.message.json;
    if (!data || typeof data.costAmount !== "number") {
      logger.warn("Budget notification missing costAmount, ignoring.", { data });
      return;
    }

    logger.info(`Budget notification: costAmount=${data.costAmount}, budgetAmount=${data.budgetAmount}`);

    if (data.costAmount < HARD_LIMIT_USD) {
      logger.info(`Spend ${data.costAmount} is under the $${HARD_LIMIT_USD} hard limit, no action taken.`);
      return;
    }

    logger.warn(`Spend ${data.costAmount} has reached the $${HARD_LIMIT_USD} hard limit — disabling billing for ${PROJECT_ID}.`);

    const auth = new google.auth.GoogleAuth({
      scopes: ["https://www.googleapis.com/auth/cloud-billing"],
    });
    const billing = google.cloudbilling({ version: "v1", auth });

    await billing.projects.updateBillingInfo({
      name: `projects/${PROJECT_ID}`,
      requestBody: { billingAccountName: "" },
    });

    logger.warn(`Billing disabled for ${PROJECT_ID}. Paid services (Firestore writes, etc.) will stop working until billing is manually re-linked.`);
  }
);
