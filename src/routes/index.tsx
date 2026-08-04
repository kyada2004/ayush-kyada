import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Skills } from "@/components/portfolio/Skills";
import { Experience } from "@/components/portfolio/Experience";
import { Education } from "@/components/portfolio/Education";
import { Projects } from "@/components/portfolio/Projects";
import { Certifications } from "@/components/portfolio/Certifications";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";

// Absolute site origin — required for canonical + social image URLs
const SITE_URL = "https://ayushkyada.vercel.app";
const OG_IMAGE = `${SITE_URL}/images/profile/ayush.jpg`;

const title = "Ayush Kyada — AI & Machine Learning Engineer Portfolio";
const description =
  "Portfolio of Kyada Ayush Bharatbhai (Ayush Kyada), AI/ML Engineer and Python developer in India building LLM apps, AI agents and computer vision systems.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      // Open Graph (Facebook/LinkedIn share previews)
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/` },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:alt", content: "Ayush Kyada, AI and Machine Learning Engineer" },
      // Twitter/X card
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    // Self-referencing canonical prevents duplicate-content dilution
    links: [{ rel: "canonical", href: `${SITE_URL}/` }],
    // JSON-LD: Person + WebSite so Google can build a knowledge panel / sitelinks search
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Person",
              "@id": `${SITE_URL}/#person`,
              name: "Kyada Ayush Bharatbhai",
              alternateName: "Ayush Kyada",
              url: `${SITE_URL}/`,
              image: OG_IMAGE,
              jobTitle: "AI & Machine Learning Engineer",
              email: "mailto:ayushkyada210@gmail.com",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Ahmedabad",
                addressRegion: "Gujarat",
                addressCountry: "IN",
              },
              alumniOf: { "@type": "CollegeOrUniversity", name: "Silver Oak University" },
              knowsAbout: [
                "Artificial Intelligence",
                "Machine Learning",
                "Large Language Models",
                "LangChain",
                "Computer Vision",
                "Python",
              ],
              sameAs: [
                "https://github.com/ayushkyada",
                "https://www.linkedin.com/in/ayush-kyada",
              ],
            },
            {
              "@type": "WebSite",
              "@id": `${SITE_URL}/#website`,
              url: `${SITE_URL}/`,
              name: title,
              description,
              inLanguage: "en",
              publisher: { "@id": `${SITE_URL}/#person` },
            },
            {
              "@type": "ProfilePage",
              url: `${SITE_URL}/`,
              name: title,
              about: { "@id": `${SITE_URL}/#person` },
              isPartOf: { "@id": `${SITE_URL}/#website` },
            },
          ],
        }),
      },
    ],
  }),
  component: Index,
});


function Index() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Education />
        <Projects />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
