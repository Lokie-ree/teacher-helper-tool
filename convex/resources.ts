import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { Id } from "./_generated/dataModel";

/**
 * Mutation to create a new resource record in the database.
 * This should be called after a file has been successfully uploaded to Convex storage.
 */
export const createResource = mutation({
  // Define the arguments this mutation takes.
  args: {
    storageId: v.id("_storage"), // The ID of the uploaded file in Convex storage.
    fileName: v.string(), // The original name of the file.
    fileType: v.string(), // The MIME type of the file.
    size: v.number(), // The size of the file in bytes.
    tags: v.optional(v.array(v.string())), // Optional array of tags for the resource.
  },
  // Define the handler function that executes the mutation logic.
  handler: async (ctx, args) => {
    // Get the identity of the currently logged-in user.
    const identity = await ctx.auth.getUserIdentity();

    // If the user is not authenticated, throw an error.
    if (!identity) {
      throw new Error("User must be authenticated to upload resources.");
    }

    // Extract the user ID from the identity object.
    // The 'subject' field usually corresponds to the Clerk user ID.
    const userId = identity.subject;

    // Insert the new resource document into the 'resources' table.
    const resourceId = await ctx.db.insert("resources", {
      userId: userId, // Associate the resource with the logged-in user.
      storageId: args.storageId,
      fileName: args.fileName,
      fileType: args.fileType,
      size: args.size,
      tags: args.tags,
      uploadTime: Date.now(), // Record the upload time.
    });

    // Return the ID of the newly created resource document.
    return resourceId;
  },
});

/**
 * Mutation to delete a resource.
 * This deletes both the file from storage and the resource document from the database.
 */
export const deleteResource = mutation({
  // Define the arguments this mutation takes.
  args: {
    resourceId: v.id("resources"), // The ID of the resource document to delete.
  },
  // Define the handler function that executes the mutation logic.
  handler: async (ctx, args) => {
    // Get the identity of the currently logged-in user.
    const identity = await ctx.auth.getUserIdentity();

    // If the user is not authenticated, throw an error.
    if (!identity) {
      throw new Error("User must be authenticated to delete resources.");
    }

    // Retrieve the resource document to be deleted.
    const resource = await ctx.db.get(args.resourceId);

    // If the resource doesn't exist, throw an error.
    if (!resource) {
      throw new Error("Resource not found.");
    }

    // Check if the logged-in user is the owner of the resource.
    if (resource.userId !== identity.subject) {
      throw new Error("User is not authorized to delete this resource.");
    }

    // Delete the associated file from Convex storage.
    await ctx.storage.delete(resource.storageId);

    // Delete the resource document from the 'resources' table.
    await ctx.db.delete(args.resourceId);

    // Return null to indicate successful deletion.
    return null;
  },
});

// We can add queries like getResources here later.
// We might also need mutations for updating tags or deleting resources. 