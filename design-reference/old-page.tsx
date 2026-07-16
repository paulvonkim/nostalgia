"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUp } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { AnimatedBackground } from "@/components/animated-background";
import { getCaseStudyById, caseStudies } from "@/data/case-studies";
import Image from "next/image";
import { SectionRenderer } from "@/components/section-renderer";

function ProjectNavigation({ currentProjectId }: { currentProjectId: string }) {
  const visibleStudies = caseStudies.filter((p) => !p.hidden);
  if (visibleStudies.length < 2) return null;

  const currentIndex = visibleStudies.findIndex((p) => p.id === currentProjectId);
  const prevProject =
    currentIndex > 0
      ? visibleStudies[currentIndex - 1]
      : visibleStudies[visibleStudies.length - 1];
  const nextProject =
    currentIndex < visibleStudies.length - 1
      ? visibleStudies[currentIndex + 1]
      : visibleStudies[0];

  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:justify-between lg:items-start lg:gap-12">
      <Link
        href={`/case-study/${prevProject.id}`}
        className="group text-left hover:text-primary transition-colors flex-1 min-w-0"
      >
        <div className="flex items-start gap-3">
          <ArrowLeft className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:-translate-x-1 transition-all flex-shrink-0 mt-1" />
          <div className="min-w-0">
            <p className="text-sm text-muted-foreground mb-1">Previous</p>
            <p className="font-medium text-base lg:text-lg group-hover:underline underline-offset-4 decoration-2 break-words">
              {prevProject.title}
            </p>
          </div>
        </div>
      </Link>

      <div className="hidden lg:block h-16 w-px bg-border flex-shrink-0"></div>

      <Link
        href={`/case-study/${nextProject.id}`}
        className="group text-left lg:text-right hover:text-primary transition-colors flex-1 min-w-0"
      >
        <div className="flex items-start gap-3 justify-start lg:justify-end">
          <div className="min-w-0 lg:order-2">
            <p className="text-sm text-muted-foreground mb-1">Next</p>
            <p className="font-medium text-base lg:text-lg group-hover:underline underline-offset-4 decoration-2 break-words">
              {nextProject.title}
            </p>
          </div>
          <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0 mt-1 lg:order-3" />
        </div>
      </Link>
    </div>
  );
}

export default function CaseStudyPage() {
  const params = useParams();
  const id = params?.id as string;
  const caseStudy = getCaseStudyById(id);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [heroImageError, setHeroImageError] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!caseStudy) {
    return <div>This case study is not available yet</div>;
  }

  return (
    <main className="min-h-dvh">
      <AnimatedBackground />

      <div className="mx-auto max-w-4xl px-4 pb-16 pt-24 md:pt-40 sm:px-6">
        <article>
          {/* Hero section */}
          <section className="mt-8 mb-7 md:mt-12 md:mb-8">
            <h1 className="mb-4 text-2xl font-semibold leading-tight sm:text-3xl md:mb-6 md:text-4xl lg:text-5xl">
              {caseStudy.title}
            </h1>
            <p className="mb-3 text-lg leading-relaxed text-muted-foreground sm:text-xl md:text-2xl lg:max-w-4xl">
              {caseStudy.description}
            </p>

            {/* Metadata byline */}
            <div className="mt-8 mb-10 md:mt-10 md:mb-14 grid grid-cols-[80px_1fr] gap-x-8 gap-y-2">
              {caseStudy.role && (
                <>
                  <span
                    style={{ fontSize: "12px" }}
                    className="text-muted-foreground pt-0.5 font-medium"
                  >
                    Role
                  </span>
                  <span
                    style={{ fontSize: "12px" }}
                    className="text-foreground"
                  >
                    {caseStudy.role}
                  </span>
                </>
              )}
              {caseStudy.collaboration?.length > 0 && (
                <>
                  <span
                    style={{ fontSize: "12px" }}
                    className="text-muted-foreground pt-0.5 font-medium"
                  >
                    Team
                  </span>
                  <span
                    style={{ fontSize: "12px" }}
                    className="text-foreground"
                  >
                    {caseStudy.collaboration.join(", ")}
                  </span>
                </>
              )}
              {caseStudy.methods?.length > 0 && (
                <>
                  <span
                    style={{ fontSize: "12px" }}
                    className="text-muted-foreground pt-0.5 font-medium"
                  >
                    Methods
                  </span>
                  <span
                    style={{ fontSize: "12px" }}
                    className="text-foreground"
                  >
                    {caseStudy.methods.join(", ")}
                  </span>
                </>
              )}
              {caseStudy.tools?.length > 0 && (
                <>
                  <span
                    style={{ fontSize: "12px" }}
                    className="text-muted-foreground pt-0.5 font-medium"
                  >
                    Tools
                  </span>
                  <span
                    style={{ fontSize: "12px" }}
                    className="text-foreground"
                  >
                    {caseStudy.tools.join(", ")}
                  </span>
                </>
              )}
            </div>

            <motion.div
              className="mt-2"
              initial={{
                opacity: prefersReducedMotion ? 1 : 0,
                scale: prefersReducedMotion ? 1 : 1.02,
              }}
              animate={{ opacity: 1, scale: 1 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: 0.6, ease: "easeOut", delay: 0.2 }
              }
            >
              {!heroImageError && (
                <Image
                  src={caseStudy.imageUrl}
                  alt={caseStudy.title}
                  width={0}
                  height={0}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                  style={{ width: "100%", height: "auto", display: "block" }}
                  priority
                  onError={() => setHeroImageError(true)}
                />
              )}
            </motion.div>
          </section>

          {/* Content sections */}
          <div className="case-study-body">
            {caseStudy.sections?.map((section, index) => (
              <SectionRenderer
                key={index}
                section={section}
                accentColor={caseStudy.accentColor}
              />
            ))}
          </div>

          {/* Project Navigation */}
          {caseStudies.filter((p) => !p.hidden).length >= 2 && (
            <section className="mb-8 lg:mb-12">
              <div className="border-t border-border pt-8 lg:pt-12">
                <h3 className="text-xl font-semibold mb-6 lg:text-2xl lg:mb-8">
                  Explore Other Projects
                </h3>
                <ProjectNavigation currentProjectId={caseStudy.id} />
              </div>
            </section>
          )}
        </article>
      </div>

      {/* Footer */}
      <div className="w-full mt-8 mb-24 pointer-events-none">
        <div className="container mx-auto max-w-5xl px-4 sm:px-8 md:px-16 lg:px-24">
          <div className="flex flex-col items-center gap-4">
            {showScrollTop && (
              <button
                onClick={scrollToTop}
                className="group pointer-events-auto flex items-center gap-2 text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors duration-300"
              >
                <ArrowUp className="h-3 w-3 group-hover:-translate-y-0.5 transition-transform" />
                <span>Back to top</span>
              </button>
            )}

            <div className="text-xs text-muted-foreground/60 text-center pointer-events-auto">
              <p className="select-none group">
                <span className="inline-flex items-center gap-1 hover:text-muted-foreground transition-colors duration-300">
                  Crafted with Next.js by Paul Kim.
                </span>
                <span className="hidden sm:inline mx-3">•</span>
                <Link
                  href="/impressum"
                  className="block sm:inline mt-2 sm:mt-0 hover:text-muted-foreground transition-colors duration-300"
                >
                  Impressum
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <Navbar />
    </main>
  );
}
