"use client";

import {
  Authenticated,
  Unauthenticated,
  useMutation,
  useQuery,
} from "convex/react";
import { api } from "../convex/_generated/api";
import Link from "next/link";
import { SignUpButton } from "@clerk/nextjs";
import { SignInButton } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";

// Import ShadCN components
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// Import a loading indicator (optional, but good practice)
import { Loader2 } from "lucide-react";

export default function DashboardPage() {
  return (
    <>
      <header className="sticky top-0 z-10 bg-background p-4 border-b-2 border-slate-200 dark:border-slate-800 flex flex-row justify-between items-center">
        Convex + Next.js + Clerk
        <UserButton />
      </header>
      <main className="p-8 flex flex-col gap-8">
        <h1 className="text-4xl font-bold text-center">
          Convex + Next.js + Clerk
        </h1>
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
  // Fetch user resources using the new query
  const resources = useQuery(api.myFunctions.getResources);

  return (
    <div className="container mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">My Resources</h2>
        <Button>
          {/* TODO: Implement Upload Functionality */}Upload Resource
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Resource List</CardTitle>
          <CardDescription>
            Manage your uploaded teaching materials.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Handle loading state */}
          {resources === undefined && (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          )}

          {/* Handle empty state */}
          {resources && resources.length === 0 && (
            <p className="text-center text-muted-foreground py-8">
              You haven't uploaded any resources yet. Click "Upload Resource" to get started!
            </p>
          )}

          {/* Display resource list */}
          {resources && resources.length > 0 && (
            <ul className="space-y-2">
              {resources.map((resource) => (
                <li key={resource._id} className="border p-3 rounded-md flex justify-between items-center">
                  <span>{resource.fileName}</span>
                  {/* Add action buttons later (e.g., delete, details) */}
                  <span className="text-sm text-muted-foreground">
                    {/* Optional: Format date/size nicely */}
                    Uploaded: {new Date(resource.uploadTime).toLocaleDateString()}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
        {/* Optional: Footer content like pagination */}
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
