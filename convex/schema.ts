import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// The schema is entirely optional.
// You can delete this file (schema.ts) and the
// app will continue to work.
// The schema provides more precise TypeScript types.
export default defineSchema({
  // New table for storing user resources
  resources: defineTable({
    userId: v.string(), // Identifier for the user who owns the resource (from Clerk)
    fileName: v.string(), // Original name of the uploaded file
    fileType: v.string(), // MIME type of the file (e.g., "application/pdf")
    storageId: v.id("_storage"), // ID referencing the file in Convex's file storage
    size: v.number(), // File size in bytes
    tags: v.optional(v.array(v.string())), // Optional array of user-defined tags
    uploadTime: v.number(), // Timestamp when the file was uploaded
  })
    // Indexing userId will be crucial for fetching resources for the logged-in user
    .index("by_userId", ["userId"])
    // Optional: Indexing tags might be useful for searching/filtering later
    .index("by_tags", ["tags"]),

  // We can add tables for classes, assignments etc. later
});
