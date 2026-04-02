"use client";
import Hero from "@/components/Hero";
import About from "@/app/about/page"; // We can treat the pages as components
import Services from "@/app/services/page";
import Projects from "@/app/projects/page";
import Contact from "@/app/contact/page";
import TerminalUI from "@/components/TerminalUI"

export default function Home() {
  return (
    <div className="flex flex-col gap-20">
      <section id="hero">
        <Hero />
      </section>
      
      <section id="about">
        <About />
      </section>

      <section id="services">
        <Services />
      </section>

      <section id="projects">
        <Projects />
      </section>

      <section id="contact">
        <Contact />
      </section>
    </div>
  );
}