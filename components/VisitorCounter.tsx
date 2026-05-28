'use client';

import { useEffect, useState } from 'react';

const ABACUS_URL = 'https://abacus.jasoncameron.dev/hit/cielio-portfolio/visits';
const OWNER_FLAG = 'cielio.owner';
const OWNER_TOKEN = 'cielio';

export function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const ownerParam = params.get('owner');

      if (ownerParam === OWNER_TOKEN) {
        localStorage.setItem(OWNER_FLAG, 'true');
      } else if (ownerParam === 'off') {
        localStorage.removeItem(OWNER_FLAG);
      }

      if (ownerParam !== null) {
        params.delete('owner');
        const search = params.toString();
        const clean = window.location.pathname + (search ? `?${search}` : '') + window.location.hash;
        window.history.replaceState(null, '', clean);
      }

      setIsOwner(localStorage.getItem(OWNER_FLAG) === 'true');
    } catch {
      // localStorage indisponível (Safari modo privado, etc) — nada a fazer
    }

    fetch(ABACUS_URL)
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { value?: number } | null) => {
        if (data && typeof data.value === 'number') setCount(data.value);
      })
      .catch(() => {
        // Serviço fora, offline, etc — degrada silenciosamente
      });
  }, []);

  if (!isOwner || count === null) return null;

  return (
    <span style={{ color: 'var(--fg-muted)' }}>
      {' · '}
      {new Intl.NumberFormat('pt-BR').format(count)}
    </span>
  );
}
