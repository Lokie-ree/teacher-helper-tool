"use client";

import { motion } from "framer-motion";
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import { FileTextIcon, MagnifyingGlassIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import MaxWidthWrapper from "@/components/common/MaxWidthWrapper";

// Feature data moved here from page.tsx
const features = [
  {
    Icon: FileTextIcon,
    name: "Resource Hub",
    description: "Upload, tag, and manage all your digital teaching materials.",
    href: "#",
    cta: "Explore Hub",
    background: <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full transform-gpu [mask-image:linear-gradient(to_bottom,transparent,white)]"></div>,
    className: "col-span-3 lg:col-span-1",
  },
  {
    Icon: MagnifyingGlassIcon,
    name: "Smart Search",
    description: "Quickly find the exact resource you need with powerful filters.",
    href: "#",
    cta: "Try Search",
    background: <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full transform-gpu [mask-image:linear-gradient(to_bottom,transparent,white)]"></div>,
    className: "col-span-3 lg:col-span-1",
  },
  {
    Icon: EyeOpenIcon,
    name: "Easy Previews",
    description: "Preview documents, images, and presentations directly in the app.",
    href: "#",
    cta: "See Previews",
    background: <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full transform-gpu [mask-image:linear-gradient(to_bottom,transparent,white)]"></div>,
    className: "col-span-3 lg:col-span-1",
  },
];

export default function FeaturesSection() {
    return (
        <section id="features" className="bg-secondary">
          <MaxWidthWrapper>
            <div className="py-16 md:py-24">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                  Streamline Your Workflow
                </h2>
                <p className="mt-4 text-muted-foreground mx-auto max-w-[600px]">
                  Everything you need, right where you need it.
                </p>
              </motion.div>

              <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.4, duration: 0.5 }}
                 viewport={{ once: true }}
                 className="mt-12"
              >
                <BentoGrid className="auto-rows-[20rem]">
                  {features.map((feature) => (
                    <BentoCard key={feature.name} {...feature} />
                  ))}
                </BentoGrid>
              </motion.div>
            </div>
          </MaxWidthWrapper>
        </section>
    );
} 