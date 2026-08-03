import { Reveal, SectionHeading } from "./motion";
import { Heart, Languages, Target, Trophy, User } from "lucide-react";
import profile from "@/data/profile.json";

export function About() {
  return (
    <section id="about" className="relative py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          eyebrow="About"
          title="A bit about me"
          subtitle="Professional summary, career objective and what drives my work."
        />

        <div className="grid gap-5 lg:grid-cols-3">
          <Reveal className="lg:col-span-2">
            <article className="glass card-hover h-full rounded-3xl p-7">
              <h3 className="flex items-center gap-2 text-lg font-semibold">
                <User className="h-5 w-5 text-primary" /> Professional summary
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {profile.summary}
              </p>
              <h4 className="mt-6 flex items-center gap-2 text-base font-semibold">
                <Target className="h-4.5 w-4.5 text-accent" /> Career objective
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {profile.objective}
              </p>
            </article>
          </Reveal>

          <Reveal delay={0.1}>
            <article className="glass card-hover h-full rounded-3xl p-7">
              <h3 className="text-lg font-semibold">Personal information</h3>
              <dl className="mt-4 space-y-3 text-sm">
                {profile.personalInfo.map((item) => (
                  <div
                    key={item.label}
                    className="flex justify-between gap-3 border-b border-border/60 pb-2"
                  >
                    <dt className="text-muted-foreground">{item.label}</dt>
                    <dd className="text-right font-medium">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </article>
          </Reveal>

          <Reveal delay={0.05}>
            <article className="glass card-hover h-full rounded-3xl p-7">
              <h3 className="flex items-center gap-2 text-lg font-semibold">
                <Languages className="h-5 w-5 text-primary" /> Languages
              </h3>
              <ul className="mt-4 space-y-3 text-sm">
                {profile.languages.map((lang) => (
                  <li key={lang.name} className="flex items-center justify-between">
                    <span>{lang.name}</span>
                    <span className="rounded-full bg-secondary px-2.5 py-1 text-xs text-secondary-foreground">
                      {lang.level}
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>

          <Reveal delay={0.1}>
            <article className="glass card-hover h-full rounded-3xl p-7">
              <h3 className="flex items-center gap-2 text-lg font-semibold">
                <Heart className="h-5 w-5 text-accent" /> Interests
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {profile.interests.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>

          <Reveal delay={0.15}>
            <article className="glass card-hover h-full rounded-3xl p-7">
              <h3 className="flex items-center gap-2 text-lg font-semibold">
                <Trophy className="h-5 w-5 text-primary" /> Strengths
              </h3>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {profile.strengths.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="bg-gradient-brand mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="mt-6">
          <div className="glass rounded-3xl p-7">
            <h3 className="text-lg font-semibold">Career goals</h3>
            <ol className="mt-6 grid gap-6 sm:grid-cols-3">
              {profile.careerGoals.map((goal, i) => (
                <li key={goal.term} className="relative pl-6">
                  <span className="bg-gradient-brand absolute top-1 left-0 flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold text-primary-foreground">
                    {i + 1}
                  </span>
                  <p className="text-sm font-semibold text-primary">{goal.term}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{goal.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
