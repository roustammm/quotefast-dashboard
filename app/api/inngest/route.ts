import { serve } from "inngest/next";
import { inngest } from "@/lib/inngest/client";
import { functions } from "@/lib/inngest/functions";

// Create an API that serves your functions
export const { GET, POST } = serve({
  client: inngest,
  functions: functions,
});
