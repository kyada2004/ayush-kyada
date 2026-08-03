import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Github, Search } from "lucide-react";
import { Reveal, SectionHeading } from "./motion";
import projects from "@/data/projects.json";

const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];

export function Projects() {
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      const matchCat = filter === "All" || p.category === filter;
      const matchQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.technologies.some((t) => t.toLowerCase().includes(q));
      return matchCat && matchQuery;
    });
  }, [filter, query]);

  return (
    <section id="projects" className="relative py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          eyebrow="Projects"
          title="Selected work"
          subtitle="Things I've built — AI tooling, vision systems and full-stack apps."
        />

        <Reveal className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <ul className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <li key={cat}>
                <button
                  type="button"
                  onClick={() => setFilter(cat)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                    filter === cat
                      ? "bg-gradient-brand text-primary-foreground"
                      : "glass text-muted-foreground hover:text-primary"
                  }`}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>

          <label className="glass flex items-center gap-2 rounded-full px-4 py-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects"
              aria-label="Search projects"
              className="w-40 bg-transparent text-sm outline-none placeholder:text-muted-foreground sm:w-52"
            />
          </label>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((project, i) => (
            <Reveal key={project.slug} delay={i * 0.06}>
              <article className="glass card-hover group flex h-full flex-col overflow-hidden rounded-3xl">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={project.cover}
                    alt={`${project.title} cover`}
                    loading="lazy"
                    width={1280}
                    height={800}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="glass absolute top-3 left-3 rounded-full px-3 py-1 text-[11px] font-semibold">
                    {project.category}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-base font-semibold">{project.title}</h3>
                  <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
                    {project.tagline}
                  </p>

                  <ul className="mt-4 flex flex-wrap gap-2">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <li
                        key={tech}
                        className="rounded-full bg-secondary px-2.5 py-1 text-[11px] text-secondary-foreground"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex items-center justify-between pt-2">
                    <Link
                      to="/projects/$slug"
                      params={{ slug: project.slug }}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
                    >
                      View details <ArrowRight className="h-4 w-4" />
                    </Link>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${project.title} on GitHub`}
                      className="text-muted-foreground transition-colors hover:text-primary"
                    >
                      <Github className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {visible.length === 0 ? (
          <p className="mt-10 text-center text-sm text-muted-foreground">
            No projects match that search.
          </p>
        ) : null}
      </div>
    </section>
  );
}
