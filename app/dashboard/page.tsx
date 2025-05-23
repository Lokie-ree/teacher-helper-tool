"use client";

import {
  Authenticated,
  Unauthenticated,
  useMutation,
  useQuery,
} from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { SignUpButton } from "@clerk/nextjs";
import { SignInButton } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import Link from 'next/link';
import { useState, useEffect } from "react";
import FileIcon from "@/components/common/FileIcon";
// Import ShadCN components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
// Import a loading indicator (optional, but good practice)
import { Loader2, Trash2 } from "lucide-react";
import UploadResourceButton from "@/components/common/UploadResourceButton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Custom hook for debouncing
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup function that clears the timeout
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Only re-call effect if value or delay changes

  return debouncedValue;
}

export default function DashboardPage() {
  return (
    <>
      <header className="sticky top-0 z-10 bg-background p-4 border-b-2 border-slate-200 dark:border-slate-800">
        <div className="container flex flex-row justify-between items-center">
          {/* TODO: Replace with App Name/Logo? */}
          <span className="font-semibold">Teacher Dashboard</span> 
          <UserButton afterSignOutUrl="/" />
        </div>
      </header>
      <main className="container mx-auto p-8 flex flex-col gap-8">
        {/* Optional: Add a dashboard-specific title if needed, or remove */}
        {/* <h1 className="text-4xl font-bold text-center">
          My Dashboard
        </h1> */}
        <Authenticated>
          <DashboardContent />
        </Authenticated>
        <Unauthenticated>
          <SignInPrompt />
        </Unauthenticated>
      </main>
    </>
  );
}

function DashboardContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string>("all");
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const uniqueTags = useQuery(api.myFunctions.getUniqueTags);

  const resources = useQuery(
    api.myFunctions.getResources,
    {
      searchQuery: debouncedSearchQuery || undefined,
      selectedTag: selectedTag === "all" ? undefined : selectedTag,
    }
  );
  const deleteResource = useMutation(api.resources.deleteResource);

  const handleDelete = async (resourceId: Id<"resources">, resourceName: string): Promise<void> => {
    try {
      await deleteResource({ resourceId });
      toast.success(`Resource "${resourceName}" deleted successfully.`);
    } catch (error) {
      console.error("Error deleting resource:", error);
      toast.error("Failed to delete resource", {
        description: "An error occurred. Please try again.",
      });
    }
  };

  return (
    <div className="container mx-auto space-y-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">My Resources</h2>
        <UploadResourceButton />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <Input
          placeholder="Search by filename..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
        <Select value={selectedTag} onValueChange={setSelectedTag}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by tag..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Tags</SelectItem>
            {uniqueTags?.map((tag) => (
              <SelectItem key={tag} value={tag}>
                {tag}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Resource List</CardTitle>
          <CardDescription>
            Manage your uploaded teaching materials.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {resources === undefined && (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          )}

          {resources && resources.length === 0 && (
            <p className="text-center text-muted-foreground py-8">
              You haven't uploaded any resources yet. Click "Upload Resource" to get started!
            </p>
          )}

          {resources && resources.length > 0 && (
            <ul className="space-y-4">
              {resources.map((resource) => (
                <li
                  key={resource._id}
                  className="border p-3 rounded-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <FileIcon fileType={resource.fileType} className="h-6 w-6 text-muted-foreground flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <Link href={`/resources/${resource._id}`} className="hover:underline">
                        <span className="font-medium block truncate" title={resource.fileName}>
                          {resource.fileName}
                        </span>
                      </Link>
                      {resource.tags && resource.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {resource.tags.map((tag) => (
                            <Badge key={tag} variant="secondary">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0 w-full sm:w-auto justify-end">
                    <span className="text-sm text-muted-foreground whitespace-nowrap">
                      {new Date(resource.uploadTime).toLocaleDateString()}
                    </span>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="icon">
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete Resource</span>
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the
                            resource "<span className="font-semibold">{resource.fileName}</span>" and remove its data from our servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(resource._id, resource.fileName)}
                          >
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function SignInPrompt() {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Welcome!</CardTitle>
          <CardDescription>
            Sign in to manage your teaching resources.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <SignInButton mode="modal">
            <Button className="w-full">Sign In</Button>
          </SignInButton>
          <SignUpButton mode="modal">
            <Button variant="outline" className="w-full">
              Sign Up
            </Button>
          </SignUpButton>
        </CardContent>
      </Card>
    </div>
  );
}

function ResourceCard({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <div className="flex flex-col gap-2 bg-slate-200 dark:bg-slate-800 p-4 rounded-md h-28 overflow-auto">
      <a href={href} className="text-sm underline hover:no-underline">
        {title}
      </a>
      <p className="text-xs">{description}</p>
    </div>
  );
}
