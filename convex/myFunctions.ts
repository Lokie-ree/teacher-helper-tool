import { v } from "convex/values";
import { query, mutation, action } from "./_generated/server";
import { api } from "./_generated/api";
import { Id } from "./_generated/dataModel"; // Import Id if not already

// Query to get resources for the logged-in user, with optional search and tag filter
export const getResources = query({
  args: {
    searchQuery: v.optional(v.string()), // Optional search query string
    selectedTag: v.optional(v.string()), // Optional selected tag
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return [];
    }
    const userId = identity.subject;

    // Case 1: Search query provided
    if (args.searchQuery) {
      let queryBuilder = ctx.db
        .query("resources")
        .withSearchIndex("search_fileName", (q) =>
          q.search("fileName", args.searchQuery!)
        )
        // Filter by user ID first (as search index doesn't include it directly)
        .filter((q) => q.eq(q.field("userId"), userId));

      // Collect results based on search + user
      let results = await queryBuilder.collect();

      // If tag is also selected, manually filter the search results
      if (args.selectedTag) {
        results = results.filter(resource =>
          resource.tags?.includes(args.selectedTag!)
        );
      }
      return results;

    // Case 2: Only tag provided (no search query)
    } else if (args.selectedTag) {
      // Cannot directly filter by tag AND userId using multiple indexes efficiently yet.
      // Fetch all user's resources and filter manually.
      // Alternative: Could use index on tags and filter by userId manually.
      // Let's fetch by user and filter by tag manually for simplicity here.
       const results = await ctx.db
        .query("resources")
        .withIndex("by_userId", (q) => q.eq("userId", userId))
        .collect();

        // Filter results by the selected tag
        return results.filter(resource =>
          resource.tags?.includes(args.selectedTag!)
        );

    // Case 3: Neither search nor tag provided
    } else {
      const resources = await ctx.db
        .query("resources")
        .withIndex("by_userId", (q) => q.eq("userId", userId))
        .order("desc") // Order by creation time
        .collect();
      return resources;
    }
  },
});

/**
 * Query to get all unique tags used by the current user.
 */
export const getUniqueTags = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return []; // No user, no tags
    }
    const userId = identity.subject;

    // Fetch all resources for the user
    const resources = await ctx.db
      .query("resources")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .collect();

    // Extract all tags and create a unique set
    const allTags = new Set<string>();
    resources.forEach(resource => {
      if (resource.tags) {
        resource.tags.forEach(tag => allTags.add(tag));
      }
    });

    // Convert the set back to an array and sort it
    return Array.from(allTags).sort();
  },
});

/**
 * Query to get the download URL for a resource's file.
 */
export const getResourceUrl = query({
  args: {
    storageId: v.id("_storage"), // Storage ID from the resource document
  },
  handler: async (ctx, args) => {
    // Check authentication if necessary (e.g., only owners can get URL)
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      // Or handle authorization based on resource ownership if needed
      return null; // Return null if not allowed
    }

    // Get the URL for the file in storage
    const url = await ctx.storage.getUrl(args.storageId);
    return url;
  },
});

// This file will contain Convex functions related to resources (upload, list, delete, tag, etc.)

// Example query (replace or remove):
// export const getResources = query({ ... });

// Example mutation (replace or remove):
// export const createResource = mutation({ ... });

// Example action (replace or remove):
// export const processResource = action({ ... });
