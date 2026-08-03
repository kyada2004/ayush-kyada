import { useState } from "react";
import { Award, Download, ExternalLink, X } from "lucide-react";

import { Reveal, SectionHeading } from "./motion";
import certifications from "@/data/certifications.json";

type Certification = (typeof certifications)[number];

export function Certifications() {
  const [preview, setPreview] = useState<Certification | null>(null);

  return (
    <section id="certifications" className="relative py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          eyebrow="Certifications"
          title="Credentials & Courses"
          subtitle="Verified certifications in AI, Machine Learning, Cloud Computing and Cybersecurity."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {certifications.map((cert, index) => (
            <Reveal key={cert.id} delay={index * 0.05}>
              <article className="glass card-hover flex h-full flex-col rounded-3xl p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-brand text-white">
                  <Award className="h-6 w-6" />
                </div>

                <h3 className="mt-5 text-base font-semibold">{cert.title}</h3>

                <p className="mt-2 text-sm text-primary">{cert.organization}</p>

                <p className="mt-1 text-xs text-muted-foreground">Issued : {cert.issueDate}</p>

                <p className="mt-1 break-all text-[11px] text-muted-foreground">
                  Credential ID : {cert.credentialId}
                </p>

                <div className="mt-auto flex gap-2 pt-6">
                  <button
                    type="button"
                    onClick={() => setPreview(cert)}
                    className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-xs font-semibold"
                  >
                    <ExternalLink className="h-4 w-4" />
                    View
                  </button>

                  <a
                    href={cert.download}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-semibold hover:border-primary"
                  >
                    <Download className="h-4 w-4" />
                    PDF
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      {preview && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setPreview(null)}
        >
          <div
            className="relative flex h-[90vh] w-full max-w-7xl flex-col overflow-hidden rounded-3xl bg-background shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b p-5">
              <div>
                <h2 className="text-2xl font-bold">{preview.title}</h2>

                <p className="text-primary">{preview.organization}</p>

                <p className="text-sm text-muted-foreground">Issued : {preview.issueDate}</p>

                <p className="text-sm text-muted-foreground">
                  Credential ID : {preview.credentialId}
                </p>
              </div>

              <button
                onClick={() => setPreview(null)}
                className="rounded-full p-2 hover:bg-secondary"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="flex-1">
              <iframe
                src={`${preview.download}#toolbar=1&navpanes=0`}
                title={preview.title}
                className="h-full w-full border-0"
              />
            </div>

            <div className="flex flex-wrap justify-end gap-3 border-t p-5">
              <a
                href={preview.download}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border px-5 py-2"
              >
                <Download className="h-4 w-4" />
                Download PDF
              </a>

              <a
                href={preview.download}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-5 py-2 text-white"
              >
                <ExternalLink className="h-4 w-4" />
                Open PDF
              </a>

              {preview.url && (
                <a
                  href={preview.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-primary px-5 py-2 text-primary"
                >
                  <ExternalLink className="h-4 w-4" />
                  Verify Certificate
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
