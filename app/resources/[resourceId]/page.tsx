"use client";

import { useParams } from 'next/navigation';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, FileText, ArrowLeft } from 'lucide-react';
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

export default function ResourceDetailPage() {
  const params = useParams();
  const resourceId = params.resourceId as Id<"resources">; // Cast assumes valid ID format

  const resource = useQuery(api.resources.getResourceById, resourceId ? { resourceId } : 'skip');

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
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-muted-foreground" />
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
              {/* Add Download Button later if needed */}
              {/* <Button>Download</Button> */}
            </CardContent>
          </Card>
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
