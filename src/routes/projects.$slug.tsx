import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ExternalLink, Github, PlayCircle, X } from "lucide-react";
import { Navbar } from "@/components/portfolio/Navbar";
import { Footer } from "@/components/portfolio/Footer";
import { Reveal } from "@/components/portfolio/motion";
import projects from "@/data/projects.json";

// Absolute origin for canonical/OG URLs (social crawlers reject relative paths)
const SITE_URL = "https://ayushkyada.vercel.app";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = projects.find((p) => p.slug === params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      // Missing project: keep it out of the index instead of serving a thin page
      return {
        meta: [{ title: "Project not found — Ayush Kyada" }, { name: "robots", content: "noindex" }],
      };
    }
    const p = loaderData.project;
    // Unique, keyword-rich title/description per project page
    const title = `${p.title} — ${p.category} Project by Ayush Kyada`;
    const description = `${p.tagline} Built by Ayush Kyada (AI/ML Engineer) using ${p.technologies
      .slice(0, 4)
      .join(", ")}.`;
    const url = `${SITE_URL}/projects/${params.slug}`;
    const image = `${SITE_URL}${p.cover}`;

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { property: "og:image", content: image },
        { property: "og:image:alt", content: `${p.title} project preview` },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: image },
      ],
      // Self-referencing canonical for each project detail page
      links: [{ rel: "canonical", href: url }],
      // JSON-LD: CreativeWork for the project + BreadcrumbList for breadcrumb rich results
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "CreativeWork",
                name: p.title,
                headline: p.title,
                description: p.description,
                url,
                image,
                dateCreated: p.year,
                genre: p.category,
                keywords: p.technologies.join(", "),
                author: {
                  "@type": "Person",
                  name: "Kyada Ayush Bharatbhai",
                  alternateName: "Ayush Kyada",
                  url: `${SITE_URL}/`,
                },
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
                  { "@type": "ListItem", position: 2, name: "Projects", item: `${SITE_URL}/#projects` },
                  { "@type": "ListItem", position: 3, name: p.title, item: url },
                ],
              },
            ],
          }),
        },
      ],
    };
  },
  component: ProjectDetail,
});


function Block({ title, items }: { title: string; items: string[] }) {
  return (
    <article className="glass card-hover rounded-3xl p-6">
      <h2 className="font-display text-base font-semibold">{title}</h2>
      <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="bg-gradient-brand mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" />
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}

function ProjectDetail() {
  const { project } = Route.useLoaderData();
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [video, setVideo] = useState(false);

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 pt-32 pb-20">
        {/* Semantic breadcrumb navigation (matches the BreadcrumbList JSON-LD) */}
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <li>
              <Link to="/" className="inline-flex items-center gap-2 transition-colors hover:text-primary">
                <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <a href="/#projects" className="transition-colors hover:text-primary">
                Projects
              </a>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-foreground">
              {project.title}
            </li>
          </ol>
        </nav>


        <Reveal className="mt-6">
          <p className="text-xs font-semibold tracking-[0.3em] text-primary uppercase">
            {project.category} · {project.year}
          </p>
          <h1 className="text-gradient mt-3 text-3xl font-bold sm:text-4xl">{project.title}</h1>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
            {project.tagline}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {project.github ? (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="glass card-hover inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold"
              >
                <Github className="h-4 w-4" /> Repository
              </a>
            ) : null}
            {project.demo ? (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="bg-gradient-brand inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-primary-foreground"
              >
                <ExternalLink className="h-4 w-4" /> Live demo
              </a>
            ) : null}
            {project.video ? (
              <button
                type="button"
                onClick={() => setVideo(true)}
                className="glass card-hover inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold"
              >
                <PlayCircle className="h-4 w-4 text-primary" /> Demo video
              </button>
            ) : null}
          </div>
        </Reveal>

        <Reveal delay={0.05} className="mt-10">
          {/* LCP image of the detail page: high priority + fixed ratio (no CLS) */}
          <img
            src={project.cover}
            alt={`Screenshot of ${project.title}, an ${project.category} project by Ayush Kyada`}
            width={1280}
            height={800}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="glass aspect-[16/10] w-full rounded-3xl object-cover p-1.5"
          />

        </Reveal>

        {project.gallery.length > 1 ? (
          <Reveal delay={0.05} className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {project.gallery.map((src: string) => (
              <button key={src} type="button" onClick={() => setLightbox(src)}>
                <img
                  src={src}
                  alt={`${project.title} screenshot`}
                  loading="lazy"
                  className="glass card-hover aspect-video w-full rounded-2xl object-cover p-1"
                />
              </button>
            ))}
          </Reveal>
        ) : null}

        <Reveal delay={0.05} className="mt-8">
          <article className="glass rounded-3xl p-7">
            <h2 className="font-display text-lg font-semibold">Overview</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {project.description}
            </p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {project.technologies.map((tech: string) => (
                <li
                  key={tech}
                  className="rounded-full bg-secondary px-3 py-1.5 text-xs text-secondary-foreground"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </article>
        </Reveal>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <Reveal>
            <Block title="Key features" items={project.features} />
          </Reveal>
          <Reveal delay={0.05}>
            <Block title="Architecture" items={project.architecture} />
          </Reveal>
          <Reveal>
            <Block title="Challenges" items={project.challenges} />
          </Reveal>
          <Reveal delay={0.05}>
            <Block title="Solutions" items={project.solutions} />
          </Reveal>
          <Reveal className="md:col-span-2">
            <Block title="Future improvements" items={project.improvements} />
          </Reveal>
        </div>

        {/* Internal linking: crawlable links between sibling project pages */}
        <Reveal className="mt-10">
          <section aria-labelledby="more-projects" className="glass rounded-3xl p-6">
            <h2 id="more-projects" className="font-display text-base font-semibold">
              More projects
            </h2>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {projects
                .filter((p) => p.slug !== project.slug)
                .map((p) => (
                  <li key={p.slug}>
                    <Link
                      to="/projects/$slug"
                      params={{ slug: p.slug }}
                      className="block rounded-2xl px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {p.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </section>
        </Reveal>
      </main>

      <Footer />

      {lightbox ? (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-background/85 p-4 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Screenshot preview"
        >
          <button
            type="button"
            aria-label="Close"
            className="absolute top-6 right-6 text-muted-foreground hover:text-primary"
          >
            <X className="h-5 w-5" />
          </button>
          <img src={lightbox} alt="" className="max-h-[85vh] w-auto rounded-2xl" />
        </div>
      ) : null}

      {video && project.video ? (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-background/85 p-4 backdrop-blur-sm"
          onClick={() => setVideo(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Demo video"
        >
          <video src={project.video} controls autoPlay className="max-h-[85vh] w-full max-w-3xl rounded-2xl" />
        </div>
      ) : null}
    </>
  );
}
