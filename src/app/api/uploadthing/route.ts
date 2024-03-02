import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "./core";
import * as dotenv from "dotenv";
import { UTApi } from "uploadthing/server";
dotenv.config();

// Export routes for Next App Router
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
  config: {
    uploadthingId: process.env.UPLOADTHING_APP_ID,
    uploadthingSecret: process.env.UPLOADTHING_SECRET,
  },
});

export const utapi = new UTApi();
