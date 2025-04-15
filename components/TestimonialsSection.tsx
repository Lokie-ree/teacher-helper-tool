"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";

// You might want to fetch testimonials dynamically later
const testimonials = [
    { quote: "This platform transformed how I manage my class materials!" },
    { quote: "The search feature is incredibly fast and saves me so much time." },
    { quote: "My students love the interactive resources I can now easily share." },
];

export default function TestimonialsSection() {
    return (
        <section id="testimonials" className="bg-secondary">
          <MaxWidthWrapper>
            <div className="py-16 md:py-24">
              <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                  What Teachers Say
                </h2>
                <p className="mt-4 text-muted-foreground mx-auto max-w-[600px]">
                  Hear from educators who use our platform every day.
                </p>
              </div>
              <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                 {testimonials.map((testimonial, index) => (
                    <div key={index} className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
                    <blockquote className="text-muted-foreground">{testimonial.quote}</blockquote>
                    </div>
                 ))}
              </div>
            </div>
          </MaxWidthWrapper>
        </section>
    );
} 