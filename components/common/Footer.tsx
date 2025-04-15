"use client";

import Link from "next/link";
import MaxWidthWrapper from "@/components/common/MaxWidthWrapper";

export default function Footer() {
    return (
        <footer className="border-t bg-muted">
        <MaxWidthWrapper>
          <div className="py-6 md:py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground text-center md:text-left">
                © {new Date().getFullYear()} Virtual Teacher Assistant. All rights reserved.
              </p>
              <nav className="flex gap-6">
                <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Terms
                </Link>
                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Privacy
                </Link>
              </nav>
            </div>
          </div>
        </MaxWidthWrapper>
      </footer>
    );
} 