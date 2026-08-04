import { motion } from "framer-motion";
import { Download, Github, Linkedin, Mail, MapPin, Sparkles } from "lucide-react";
import { Particles } from "./Particles";
import { TypingText } from "./motion";
import profile from "@/data/profile.json";
import socials from "@/data/socials.json";

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-32 pb-20 sm:pt-40">
      <Particles />
      <div
        aria-hidden="true"
        className="animate-float pointer-events-none absolute -top-24 right-[-10%] h-80 w-80 rounded-full bg-gradient-brand opacity-20 blur-3xl"
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 lg:grid-cols-[1.15fr_0.85fr]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="glass inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Available for opportunities
          </span>

          <h1 className="mt-6 text-4xl leading-[1.1] font-bold sm:text-6xl">
            Hi, I&apos;m <span className="text-gradient">Kyada</span>
            <br />
            Ayush Bharatbhai
          </h1>

          <p className="mt-4 text-lg font-medium sm:text-xl">
            <TypingText words={profile.typingRoles} />
          </p>

          <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {profile.intro}
          </p>

          <p className="mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 text-accent" />
            {profile.location}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={profile.resume}
              download
              className="bg-gradient-brand glow inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              <Download className="h-4 w-4" /> Download CV
            </a>
            <a
              href="#contact"
              className="glass card-hover inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold"
            >
              <Mail className="h-4 w-4 text-primary" /> Contact
            </a>
            <a
              href={socials.github}
              target="_blank"
              rel="noreferrer"
              className="glass card-hover inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold"
            >
              <Github className="h-4 w-4" /> GitHub
            </a>
            <a
              href={socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className="glass card-hover inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold"
            >
              <Linkedin className="h-4 w-4 text-primary" /> LinkedIn
            </a>
          </div>

          <dl className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {profile.stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                className="glass rounded-2xl p-4 text-center"
              >
                <dt className="order-2 text-[11px] tracking-wide text-muted-foreground uppercase">
                  {stat.label}
                </dt>
                <dd className="text-gradient font-display text-2xl font-bold">
                  {stat.value}
                  {stat.suffix}
                </dd>
              </motion.div>
            ))}
          </dl>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-sm"
        >
          <div className="bg-gradient-brand absolute inset-0 rounded-full opacity-30 blur-3xl" />
          {/* LCP image: eager + high priority, fixed dimensions to avoid CLS */}
          <img
            src={profile.photo}
            alt={`${profile.name}, AI and Machine Learning Engineer based in Ahmedabad, India`}
            width={640}
            height={640}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="glass relative aspect-square w-full rounded-full object-cover p-2"
          />

        </motion.div>
      </div>
    </section>
  );
}
