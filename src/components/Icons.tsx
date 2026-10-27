// Small UI glyphs, drawn on a 20px grid with a 1.5 stroke.
type P = { className?: string };

export const ArrowRight = ({ className }: P) => (
  <svg className={className} viewBox="0 0 20 20" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
    <path d="M3.5 10h12.5M11.5 5.5 16 10l-4.5 4.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ArrowLeft = ({ className }: P) => (
  <svg className={className} viewBox="0 0 20 20" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
    <path d="M16.5 10H4M8.5 5.5 4 10l4.5 4.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const WhatsApp = ({ className }: P) => (
  <svg className={className} viewBox="0 0 20 20" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
    <path d="M3.2 16.8 4.3 13A7 7 0 1 1 7 15.7l-3.8 1.1Z" strokeLinejoin="round" />
    <path d="M7.6 7.2c.2-.5.5-.6.8-.6h.4c.2 0 .3.1.4.4l.6 1.4c0 .2 0 .4-.1.5l-.4.5c.4.8 1.2 1.6 2 2l.5-.4c.1-.1.3-.2.5-.1l1.4.6c.3.1.4.2.4.4v.4c0 .3-.2.7-.6.8-.6.3-1.4.3-2.2 0a7 7 0 0 1-3.3-3.3c-.3-.8-.3-1.6 0-2.2Z" fill="currentColor" stroke="none" />
  </svg>
);

export const Instagram = ({ className }: P) => (
  <svg className={className} viewBox="0 0 20 20" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
    <rect x="3" y="3" width="14" height="14" rx="4" />
    <circle cx="10" cy="10" r="3.2" />
    <circle cx="14.2" cy="5.8" r="0.6" fill="currentColor" stroke="none" />
  </svg>
);
