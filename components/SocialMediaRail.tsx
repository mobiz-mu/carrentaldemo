const SOCIAL_LINKS = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/mobiz.mu",
    icon: (
      <path d="M14 8.5h2V5.2c-.35-.05-1.55-.15-2.95-.15-2.92 0-4.92 1.78-4.92 5.05v2.9H5v3.7h3.13V24h3.84v-7.3h3l.48-3.7h-3.48v-2.55c0-1.07.3-1.95 2.03-1.95z" />
    ),
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/mobiz.mu",
    icon: (
      <>
        <path d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2zm0 2A3.8 3.8 0 0 0 4 7.8v8.4A3.8 3.8 0 0 0 7.8 20h8.4a3.8 3.8 0 0 0 3.8-3.8V7.8A3.8 3.8 0 0 0 16.2 4H7.8z" />
        <path d="M12 7.2A4.8 4.8 0 1 1 12 16.8 4.8 4.8 0 0 1 12 7.2zm0 2A2.8 2.8 0 1 0 12 14.8 2.8 2.8 0 0 0 12 9.2z" />
        <path d="M17.05 6.65a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3z" />
      </>
    ),
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@mobiz.mu",
    icon: (
      <path d="M15.3 2c.35 2.75 1.9 4.4 4.7 4.58v3.12c-1.63.16-3.07-.38-4.6-1.32v5.85c0 7.42-8.1 9.73-11.35 4.42-2.08-3.4-.8-9.37 5.88-9.6v3.3c-.53.08-1.1.22-1.62.4-1.55.53-2.43 1.52-2.18 3.28.48 3.38 6.65 4.38 6.13-2.22V2h3.04z" />
    ),
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/mobiz-mu",
    icon: (
      <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.35 8h4.3v14H.35V8zM8 8h4.12v1.92h.06c.57-1.08 1.98-2.22 4.08-2.22 4.36 0 5.17 2.87 5.17 6.6V22h-4.3v-6.82c0-1.63-.03-3.72-2.27-3.72-2.27 0-2.62 1.77-2.62 3.6V22H8V8z" />
    ),
  },
];

export default function SocialMediaRail() {
  return (
    <aside
      className="fixed right-0 top-1/2 z-40 hidden -translate-y-1/2 md:block"
      aria-label="Mobiz social media links"
    >
      <div className="border-y border-l border-gold/40 bg-gold shadow-2xl shadow-ink/25">
        <div className="flex flex-col">
          {SOCIAL_LINKS.map((social, index) => (
            <div key={social.name} className="flex flex-col items-center">
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="group flex h-11 w-11 items-center justify-center bg-gold text-navy transition-all duration-300 hover:bg-ink hover:text-gold"
              >
                <svg
                  className="h-4.5 w-4.5 transition-transform duration-300 group-hover:scale-110"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  {social.icon}
                </svg>
              </a>

              {index < SOCIAL_LINKS.length - 1 && (
                <span className="relative h-px w-6 overflow-hidden bg-ink/20">
                  <span className="absolute inset-y-0 left-0 w-2 animate-[socialLine_1.8s_ease-in-out_infinite] bg-ink/70" />
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}