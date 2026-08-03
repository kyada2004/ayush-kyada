import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";
import profile from "@/data/profile.json";
import socials from "@/data/socials.json";

const quickLinks = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="relative mt-10 border-t border-border py-12">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:grid-cols-3">
        <div>
          <div className="flex items-center gap-2.5">
            <img src={profile.logo} alt="" width={36} height={36} className="h-9 w-9 rounded-lg" />
            <span className="font-display font-semibold">{profile.shortName}</span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            {profile.role} building intelligent, useful and well-crafted systems.
          </p>
        </div>

        <nav aria-label="Quick links">
          <h2 className="text-sm font-semibold">Quick links</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {quickLinks.map((link) => (
              <li key={link.id}>
                <a href={`#${link.id}`} className="transition-colors hover:text-primary">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-semibold">Connect</h2>
          <div className="mt-3 flex gap-2">
            <a
              href={socials.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="glass inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:text-primary"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href={socials.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="glass inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:text-primary"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href={socials.email}
              aria-label="Email"
              className="glass inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:text-primary"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
          <a
            href="#home"
            className="glass mt-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-colors hover:text-primary"
          >
            <ArrowUp className="h-3.5 w-3.5" /> Back to top
          </a>
        </div>
      </div>

      <p className="mt-10 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {profile.name}. All rights reserved.
      </p>
    </footer>
  );
}
