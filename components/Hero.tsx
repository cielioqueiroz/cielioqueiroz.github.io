import { site } from '@/config/site';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { MapPin, Mail } from 'lucide-react';

export function Hero() {
  return (
    <section id="top" className="section pt-32 md:pt-40">
      <div className="container-page">
        <div className="animate-fade-in-up max-w-3xl">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-1.5 text-sm text-slate-600 dark:border-slate-800 dark:text-slate-300">
            <MapPin size={14} className="text-accent" />
            {site.location}
          </p>

          <h1 className="mb-6 text-5xl font-bold tracking-tight md:text-7xl">
            Olá, eu sou{' '}
            <span className="bg-gradient-to-r from-accent to-purple-500 bg-clip-text text-transparent">
              {site.name}
            </span>
          </h1>

          <p className="mb-4 text-2xl font-semibold text-slate-700 dark:text-slate-200 md:text-3xl">
            {site.title}
          </p>

          <p className="mb-10 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
            {site.tagline}
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href={site.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <FaLinkedin size={18} />
              LinkedIn
            </a>
            <a
              href={site.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              <FaGithub size={18} />
              GitHub
            </a>
            <a
              href={site.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              <FaInstagram size={18} />
              Instagram
            </a>
            <a href={`mailto:${site.socials.email}`} className="btn-outline">
              <Mail size={18} />
              Contato
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
