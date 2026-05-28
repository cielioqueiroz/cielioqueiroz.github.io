import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Skills } from '@/components/Skills';
import { Certificates } from '@/components/Certificates';
import { DataShowcase } from '@/components/DataShowcase';
import { Projects } from '@/components/Projects';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Certificates />
        <DataShowcase />
        <Projects />
      </main>
      <Footer />
    </>
  );
}
