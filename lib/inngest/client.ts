import { Inngest } from "inngest";

// Create a client to send and receive events
export const inngest = new Inngest({
  id: "quotefast-dashboard",
  signingKey: process.env.INNGEST_SIGNING_KEY,
  eventKey: process.env.INNGEST_EVENT_KEY,
});
