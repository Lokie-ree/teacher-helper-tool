"use strict";
import { action } from "./_generated/server";

/**
 * Action to generate a short-lived upload URL for Convex file storage.
 */
export const generateUploadUrl = action({
  // No arguments needed for this action.
  args: {},
  // Define the handler function.
  handler: async (ctx) => {
    // Generate the upload URL using the context's storage object.
    const uploadUrl = await ctx.storage.generateUploadUrl();
    // Return the generated URL.
    return uploadUrl;
  },
}); 