"use client";

import {
  File,
  FileImage,
  FileText,
  Presentation,
} from "lucide-react";
import React from "react";

type FileIconProps = {
  fileType: string | undefined | null;
  className?: string;
};

/**
 * Renders an icon based on the file's MIME type.
 */
export function FileIcon({ fileType, className }: FileIconProps): React.ReactElement {
  if (!fileType) {
    return <File className={className} />; // Default icon
  }

  const type = fileType.toLowerCase();

  if (type.startsWith("image/")) {
    return <FileImage className={className} />;
  }
  if (type.includes("pdf")) {
    return <FileText className={className} />; // Using FileText for PDF
  }
  if (type.includes("msword") || type.includes("wordprocessingml")) {
    return <FileText className={className} />; // Using FileText for Word
  }
  if (type.includes("powerpoint") || type.includes("presentationml")) {
    return <Presentation className={className} />; // Using Presentation for PowerPoint
  }
  // Add more specific types if needed

  return <File className={className} />; // Default fallback icon
}

 