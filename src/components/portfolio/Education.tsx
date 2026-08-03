import { Award, GraduationCap } from "lucide-react";
import { Reveal, SectionHeading } from "./motion";
import education from "@/data/education.json";

export function Education() {
  return (
    <section id="education" className="relative py-24">
      <div className="mx-auto max-w-5xl px-4">
        <SectionHeading
          eyebrow="Education"
          title="Academic Path"
          subtitle="My academic journey from school to postgraduate studies."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {education.map((item, i) => (
            <Reveal key={item.degree} delay={i * 0.08}>
              <article className="glass card-hover h-full rounded-3xl p-7">
                {/* Icon */}
                <div className="bg-gradient-brand flex h-11 w-11 items-center justify-center rounded-xl text-primary-foreground">
                  <GraduationCap className="h-5 w-5" />
                </div>

                {/* Title */}
                <h3 className="mt-5 font-display text-xl font-semibold">{item.degree}</h3>

                <p className="mt-1 text-primary font-medium">{item.university}</p>

                <p className="mt-1 text-xs text-muted-foreground">{item.duration}</p>

                {/* Details */}
                <div className="mt-5 space-y-2 text-sm">
                  {item.specialization && (
                    <div className="flex justify-between gap-4">
                      <span className="text-muted-foreground">Specialization</span>
                      <span className="font-medium text-right">{item.specialization}</span>
                    </div>
                  )}

                  {item.cgpa && (
                    <div className="flex justify-between gap-4">
                      <span className="text-muted-foreground">CGPA</span>
                      <span className="font-semibold text-gradient">{item.cgpa}</span>
                    </div>
                  )}

                  {item.grade && (
                    <div className="flex justify-between gap-4">
                      <span className="text-muted-foreground">Grade</span>
                      <span className="font-medium">{item.grade}</span>
                    </div>
                  )}

                  {item.percentileRank && (
                    <div className="flex justify-between gap-4">
                      <span className="text-muted-foreground">Percentile Rank</span>
                      <span className="font-medium">{item.percentileRank}</span>
                    </div>
                  )}

                  {item.yearOfPassing && (
                    <div className="flex justify-between gap-4">
                      <span className="text-muted-foreground">Year of Passing</span>
                      <span className="font-medium">{item.yearOfPassing}</span>
                    </div>
                  )}
                </div>

                {/* Achievements */}
                <div className="mt-6">
                  <h4 className="mb-3 text-sm font-semibold">Highlights</h4>

                  <ul className="space-y-2">
                    {item.achievements.map((achievement) => (
                      <li
                        key={achievement}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <Award className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
