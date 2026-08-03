import { useState, type FormEvent } from "react";
import emailjs from "@emailjs/browser";
import { Github, Globe, Linkedin, Mail, MapPin, Phone, Send } from "lucide-react";
import { toast } from "sonner";
import { Reveal, SectionHeading } from "./motion";
import profile from "@/data/profile.json";
import socials from "@/data/socials.json";

const SERVICE_ID = import.meta.env["VITE_EMAILJS_SERVICE_ID"] as string | undefined;
const TEMPLATE_ID = import.meta.env["VITE_EMAILJS_TEMPLATE_ID"] as string | undefined;
const PUBLIC_KEY = import.meta.env["VITE_EMAILJS_PUBLIC_KEY"] as string | undefined;

const details = [
  { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  {
    icon: Phone,
    label: "Phone",
    value: profile.phone,
    href: `tel:${profile.phone.replace(/\s/g, "")}`,
  },
  { icon: MapPin, label: "Location", value: profile.location, href: undefined },
  { icon: Github, label: "GitHub", value: "https://github.com/kyada2004", href: socials.github },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "https://in.linkedin.com/in/ayush-kyada-747759237",
    href: socials.linkedin,
  },
  ...(socials.portfolio
    ? [
        {
          icon: Globe,
          label: "Portfolio",
          value: socials.portfolio.replace(/^https?:\/\//, ""),
          href: socials.portfolio,
        },
      ]
    : []),
];

export function Contact() {
  const [sending, setSending] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const subject = String(data.get("subject") ?? "");
    const message = String(data.get("message") ?? "");

    if (SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY) {
      try {
        setSending(true);
        await emailjs.send(
          SERVICE_ID,
          TEMPLATE_ID,
          { from_name: name, from_email: email, subject, message },
          { publicKey: PUBLIC_KEY },
        );
        toast.success("Message sent — I'll get back to you soon.");
        form.reset();
      } catch {
        toast.error("Could not send right now. Please email me directly.");
      } finally {
        setSending(false);
      }
      return;
    }

    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(
      subject || `Portfolio enquiry from ${name}`,
    )}&body=${encodeURIComponent(`${message}\n\n— ${name} (${email})`)}`;
    toast.info("Opening your email client…");
  };

  return (
    <section id="contact" className="relative py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something"
          subtitle="Open to internships, collaborations and AI/ML projects."
        />

        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div className="glass h-full rounded-3xl p-7">
              <h3 className="font-display text-lg font-semibold">Get in touch</h3>
              <ul className="mt-6 space-y-4">
                {details.map((item) => (
                  <li key={item.label} className="flex items-start gap-3">
                    <span className="bg-gradient-brand flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-primary-foreground">
                      <item.icon className="h-4 w-4" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs tracking-wide text-muted-foreground uppercase">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          target={item.href.startsWith("http") ? "_blank" : undefined}
                          rel="noreferrer"
                          className="block truncate text-sm font-medium transition-colors hover:text-primary"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-sm font-medium">{item.value}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <form onSubmit={onSubmit} className="glass h-full rounded-3xl p-7">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm">
                  <span className="text-muted-foreground">Your name</span>
                  <input
                    name="name"
                    required
                    className="mt-1.5 w-full rounded-xl border border-border bg-background/60 px-3.5 py-2.5 text-sm outline-none focus:border-primary"
                  />
                </label>
                <label className="block text-sm">
                  <span className="text-muted-foreground">Email</span>
                  <input
                    type="email"
                    name="email"
                    required
                    className="mt-1.5 w-full rounded-xl border border-border bg-background/60 px-3.5 py-2.5 text-sm outline-none focus:border-primary"
                  />
                </label>
              </div>
              <label className="mt-4 block text-sm">
                <span className="text-muted-foreground">Subject</span>
                <input
                  name="subject"
                  required
                  className="mt-1.5 w-full rounded-xl border border-border bg-background/60 px-3.5 py-2.5 text-sm outline-none focus:border-primary"
                />
              </label>
              <label className="mt-4 block text-sm">
                <span className="text-muted-foreground">Message</span>
                <textarea
                  name="message"
                  rows={6}
                  required
                  className="mt-1.5 w-full resize-none rounded-xl border border-border bg-background/60 px-3.5 py-2.5 text-sm outline-none focus:border-primary"
                />
              </label>
              <button
                type="submit"
                disabled={sending}
                className="bg-gradient-brand glow mt-6 inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 disabled:opacity-60"
              >
                <Send className="h-4 w-4" /> {sending ? "Sending…" : "Send message"}
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
