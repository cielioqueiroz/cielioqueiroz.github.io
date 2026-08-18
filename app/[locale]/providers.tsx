'use client';

import { ThemeProvider } from 'next-themes';
import { ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  // enableSystem desligado: o dark obsidiana é a identidade padrão do site;
  // o visitante ainda troca pelo toggle (persistido em localStorage).
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      {children}
    </ThemeProvider>
  );
}
