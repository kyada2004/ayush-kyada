import {
  BrainCircuit,
  Building2,
  CalendarDays,
  Layout,
  MapPin,
  Server,
  type LucideIcon,
} from "lucide-react";
import { Reveal, SectionHeading } from "./motion";
import experience from "@/data/experience.json";

const icons: Record<string, LucideIcon> = { BrainCircuit, Layout, Server };

export function Experience() {
  return (
    <section id="experience" className="relative py-24">
      <div className="mx-auto max-w-4xl px-4">
        <SectionHeading
          eyebrow="Experience"
          title="Where I've worked"
          subtitle="Internships and engagements shaping my craft."
        />

        <div className="relative border-l border-border pl-6 sm:pl-10">
          {experience.map((job, i) => {
            const Icon = icons[job.logo] ?? Building2;
            return (
              <Reveal key={job.company} delay={i * 0.08} className="relative pb-8 last:pb-0">
                <span className="bg-gradient-brand absolute top-6 -left-[34px] flex h-8 w-8 items-center justify-center rounded-full text-primary-foreground sm:-left-[54px]">
                  <Icon className="h-4 w-4" />
                </span>
                <article className="glass card-hover rounded-3xl p-6">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3 className="font-display text-lg font-semibold">{job.position}</h3>
                      <p className="text-sm text-primary">{job.company}</p>
                    </div>
                    <div className="text-right text-xs text-muted-foreground">
                      <p className="inline-flex items-center gap-1.5">
                        <CalendarDays className="h-3.5 w-3.5" /> {job.duration}
                      </p>
                      <p className="mt-1 inline-flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5" /> {job.location}
                      </p>
                    </div>
                  </div>

                  <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                    {job.responsibilities.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="bg-gradient-brand mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <ul className="mt-4 flex flex-wrap gap-2">
                    {job.technologies.map((tech) => (
                      <li
                        key={tech}
                        className="rounded-full bg-secondary px-2.5 py-1 text-xs text-secondary-foreground"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
