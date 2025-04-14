import { v } from "convex/values";
import { query, mutation, action } from "./_generated/server";
import { api } from "./_generated/api";

// Query to get resources for the logged-in user
export const getResources = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      // Should not happen if called from an Authenticated component
      throw new Error("User is not authenticated.");
    }

    // Fetch resources belonging to the current user
    const resources = await ctx.db
      .query("resources")
      .withIndex("by_userId", (q) => q.eq("userId", identity.subject))
      .order("desc") // Show newest first
      .collect();

    return resources;
  },
});

// This file will contain Convex functions related to resources (upload, list, delete, tag, etc.)

// Example query (replace or remove):
// export const getResources = query({ ... });

// Example mutation (replace or remove):
// export const createResource = mutation({ ... });

// Example action (replace or remove):
// export const processResource = action({ ... });
