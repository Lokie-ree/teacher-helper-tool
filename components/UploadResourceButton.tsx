"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation, useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { Loader2, Upload } from "lucide-react";

// --- Configuration Constants ---
const MAX_FILE_SIZE_MB = 10;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
const ALLOWED_MIME_TYPES = [
  "application/pdf",
  "application/msword", // .doc
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
  "application/vnd.ms-powerpoint", // .ppt
  "application/vnd.openxmlformats-officedocument.presentationml.presentation", // .pptx
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
];
// -----------------------------

export function UploadResourceButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [tags, setTags] = useState("");

  const generateUploadUrl = useAction(api.files.generateUploadUrl);
  const createResource = useMutation(api.resources.createResource);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      setSelectedFile(null);
      return;
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE_BYTES) {
      toast.error("File Too Large", {
        description: `Please select a file smaller than ${MAX_FILE_SIZE_MB}MB.`,
      });
      event.target.value = ""; // Clear the input
      setSelectedFile(null);
      return;
    }

    // Validate file type
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      toast.error("Invalid File Type", {
        description: "Allowed types: PDF, DOC(X), PPT(X), JPG, PNG, GIF, WEBP.",
        // Consider listing allowed types more dynamically if needed
      });
      event.target.value = ""; // Clear the input
      setSelectedFile(null);
      return;
    }

    // If valid, set the file
    setSelectedFile(file);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedFile) {
      toast.error("No File Selected", {
        description: "Please select a file to upload.",
      });
      return;
    }

    setIsSubmitting(true);

    const tagArray = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag !== "");

    try {
      const uploadUrl = await generateUploadUrl();

      const result = await fetch(uploadUrl, {
        method: "POST",
        body: selectedFile,
      });

      if (!result.ok) {
        throw new Error(`Upload failed: ${await result.text()}`);
      }

      const { storageId } = await result.json();

      await createResource({
        storageId: storageId,
        fileName: selectedFile.name,
        fileType: selectedFile.type,
        size: selectedFile.size,
        tags: tagArray,
      });

      toast.success("Upload Successful", {
        description: `"${selectedFile.name}" has been uploaded.`,
      });

      setSelectedFile(null);
      setTags("");
      setIsOpen(false);

    } catch (error) {
      console.error("Error uploading resource:", error);
      toast.error("Upload Failed", {
        description: "An error occurred while uploading the file. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Upload className="mr-2 h-4 w-4" /> Upload Resource
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload New Resource</DialogTitle>
          <DialogDescription>
            Select a file and optionally add comma-separated tags.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="file-upload" className="text-right">
              File
            </Label>
            <Input
              id="file-upload"
              type="file"
              required
              onChange={handleFileChange}
              className="col-span-3"
              disabled={isSubmitting}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="tags-input" className="text-right">
              Tags
            </Label>
            <Input
              id="tags-input"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="e.g., science, grade-9, worksheet"
              className="col-span-3"
              disabled={isSubmitting}
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary" disabled={isSubmitting}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={!selectedFile || isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isSubmitting ? "Uploading..." : "Upload"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
} 