"use client";

import { useParams } from 'next/navigation';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, ArrowLeft, Download } from 'lucide-react';
import FileIcon from "@/components/common/FileIcon";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Authenticated, Unauthenticated } from 'convex/react';

// Helper function to format bytes
function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

// Component to render the file preview based on type
function FilePreview({ fileType, fileUrl, fileName }: {
  fileType: string | undefined | null;
  fileUrl: string | null;
  fileName: string;
}) {
  if (!fileUrl) {
    return <div className="flex justify-center items-center p-8"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  const type = fileType?.toLowerCase() || "";

  if (type.startsWith("image/")) {
    return <img src={fileUrl} alt={`Preview of ${fileName}`} className="max-w-full max-h-[70vh] mx-auto object-contain" />;
  }

  if (type.includes("pdf")) {
    return (
      <iframe
        src={fileUrl}
        width="100%"
        height="700px"
        title={`Preview of ${fileName}`}
        className="border rounded-md"
      />
    );
  }

  // Fallback for other types
  return (
    <div className="text-center p-8 bg-muted/50 rounded-md">
      <p className="text-muted-foreground">
        Preview is not available for this file type (.{fileName.split('.').pop()}).
      </p>
    </div>
  );
}

export default function ResourceDetailPage() {
  const params = useParams();
  const resourceId = params.resourceId as Id<"resources">; // Cast assumes valid ID format

  const resource = useQuery(api.resources.getResourceById, resourceId ? { resourceId } : 'skip');

  // Fetch the file URL if resource exists
  const fileUrl = useQuery(
    api.myFunctions.getResourceUrl,
    resource ? { storageId: resource.storageId } : "skip"
  );

  return (
    <main className="container mx-auto p-8">
      <Button asChild variant="outline" size="sm" className="mb-4">
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Resources
        </Link>
      </Button>

      <Authenticated>
        {resource === undefined && (
          <div className="flex justify-center items-center py-16">
            <Loader2 className="h-12 w-12 animate-spin text-muted-foreground" />
          </div>
        )}

        {resource === null && (
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Resource Not Found</CardTitle>
              <CardDescription>
                The resource you are looking for does not exist or you do not have permission to view it.
              </CardDescription>
            </CardHeader>
          </Card>
        )}

        {resource && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Details Column */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <FileIcon fileType={resource.fileType} className="h-6 w-6 text-muted-foreground" />
                    <CardTitle className="break-all">{resource.fileName}</CardTitle>
                  </div>
                  <CardDescription>
                    Uploaded on {new Date(resource.uploadTime).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Tags</h3>
                    {resource.tags && resource.tags.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {resource.tags.map((tag) => (
                          <Badge key={tag} variant="secondary">{tag}</Badge>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">No tags</p>
                    )}
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">File Type</h3>
                    <p className="text-sm">{resource.fileType || 'N/A'}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Size</h3>
                    <p className="text-sm">{formatBytes(resource.size)}</p>
                  </div>

                  {/* Download Button */}
                  {fileUrl && (
                    <Button asChild className="w-full"> {/* Make button full width */}
                      <a href={fileUrl} target="_blank" rel="noopener noreferrer" download={resource.fileName}>
                        <Download className="mr-2 h-4 w-4" /> Download File
                      </a>
                    </Button>
                  )}
                  {!fileUrl && resource && (
                    <Button disabled className="w-full"> <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading Download...</Button>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Preview Column */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <FilePreview
                    fileType={resource.fileType}
                    fileUrl={fileUrl === undefined ? null : fileUrl}
                    fileName={resource.fileName}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </Authenticated>
      <Unauthenticated>
        <p className="text-center text-muted-foreground mt-8">
          Please sign in to view resource details.
        </p>
      </Unauthenticated>
    </main>
  );
}
