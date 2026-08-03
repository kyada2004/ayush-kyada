import { motion } from "framer-motion";
import {
  BrainCircuit,
  Code2,
  Database,
  Layout,
  ScanEye,
  Server,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { Reveal, SectionHeading } from "./motion";
import skills from "@/data/skills.json";

const icons: Record<string, LucideIcon> = {
  Code2,
  Layout,
  Server,
  BrainCircuit,
  ScanEye,
  Database,
  Wrench,
};

export function Skills() {
  return (
    <section id="skills" className="relative py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          eyebrow="Skills"
          title="Toolbox"
          subtitle="Technologies I work with daily, grouped by discipline."
        />

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {skills.map((group, gi) => {
            const Icon = icons[group.icon] ?? Code2;
            return (
              <Reveal key={group.category} delay={gi * 0.05}>
                <article className="glass card-hover h-full rounded-3xl p-6">
                  <header className="flex items-center gap-3">
                    <span className="bg-gradient-brand flex h-10 w-10 items-center justify-center rounded-xl text-primary-foreground">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="font-display text-base font-semibold">{group.category}</h3>
                  </header>

                  <ul className="mt-5 space-y-4">
                    {group.skills.map((skill) => (
                      <li key={skill.name}>
                        <div className="flex items-baseline justify-between text-sm">
                          <span className="font-medium">{skill.name}</span>
                          <span className="text-xs text-muted-foreground">
                            {skill.experience} · {skill.level}%
                          </span>
                        </div>
                        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                          <motion.div
                            className="bg-gradient-brand h-full rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                          />
                        </div>
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
