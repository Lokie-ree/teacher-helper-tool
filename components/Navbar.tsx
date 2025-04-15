"use client";

import Link from "next/link";
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { GraduationCap, Menu } from 'lucide-react';

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between">
          {/* Logo and Desktop Nav */}
          <div className="flex items-center md:flex-1">
            <Link href="/" className="flex items-center space-x-2">
              <GraduationCap className="h-6 w-6" />
              <span className="font-bold">
                VTA
              </span>
            </Link>
            <nav className="hidden md:flex items-center space-x-6 ml-6">
              <Link href="#features" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Features</Link>
              <Link href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">How it Works</Link>
              <Link href="#testimonials" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Testimonials</Link>
            </nav>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-2">
            <SignedOut>
              <SignInButton mode="modal">
                <Button variant="ghost" size="sm">Sign In</Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button size="sm">Sign Up</Button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <Link href="/dashboard">
                <Button variant="outline" size="sm">Dashboard</Button>
              </Link>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>

          {/* Mobile Menu Trigger and User Button */}
          <div className="flex items-center md:hidden space-x-2"> {/* Container for mobile items */}
            <SignedIn> {/* Show UserButton on mobile when signed in */}
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="p-6">
                <SheetHeader>
                  <SheetTitle>
                    <Link href="/" className="flex items-center space-x-2 mb-2">
                      <GraduationCap className="h-6 w-6" />
                      <span className="font-bold">VTA</span>
                    </Link>
                  </SheetTitle>
                   <SheetDescription>
                    Navigate the application or sign in.
                  </SheetDescription>
                </SheetHeader>
                <nav className="flex flex-col space-y-3 mt-6 gap-4">
                  <Link href="#features" className="text-sm font-medium hover:text-primary">Features</Link>
                  <Link href="#how-it-works" className="text-sm font-medium hover:text-primary">How it Works</Link>
                  <Link href="#testimonials" className="text-sm font-medium hover:text-primary">Testimonials</Link>
                  <hr />
                  <SignedOut>
                    <div className="flex flex-col space-y-2">
                      <SignInButton mode="modal">
                        <Button variant="outline" className="w-full">Sign In</Button>
                      </SignInButton>
                      <SignUpButton mode="modal">
                        <Button className="w-full">Sign Up</Button>
                      </SignUpButton>
                    </div>
                  </SignedOut>
                  <SignedIn>
                    <Link href="/dashboard">
                      <Button variant="outline" className="w-full">Dashboard</Button>
                    </Link>
                  </SignedIn>
                </nav>
              </SheetContent>
            </Sheet>
          </div>

        </div>
      </MaxWidthWrapper>
    </header>
  );
};

export default Navbar; 