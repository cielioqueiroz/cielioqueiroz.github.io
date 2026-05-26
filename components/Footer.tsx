import { site } from '@/config/site';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { Mail } from 'lucide-react';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-slate-200 py-10 dark:border-slate-800">
      <div className="container-page flex flex-col items-center justify-between gap-6 md:flex-row">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          © {year} {site.name}. Construído com Next.js e Tailwind.
        </p>

        <div className="flex items-center gap-4 text-slate-500">
          <a
            href={site.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="transition-colors hover:text-accent"
          >
            <FaGithub size={20} />
          </a>
          <a
            href={site.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="transition-colors hover:text-accent"
          >
            <FaLinkedin size={20} />
          </a>
          <a
            href={site.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="transition-colors hover:text-accent"
          >
            <FaInstagram size={20} />
          </a>
          <a
            href={`mailto:${site.socials.email}`}
            aria-label="Email"
            className="transition-colors hover:text-accent"
          >
            <Mail size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
