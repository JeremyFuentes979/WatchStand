import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from "@tanstack/react-router";
import type { ReactNode } from "react";

import appCss from "~/styles/app.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      {
        name: "viewport",
        content:
          "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover",
      },
      { title: "The Dark Guardian" },
      {
        name: "description",
        content:
          "A private, zero-account mental wellness toolkit for first responders.",
      },
      { name: "theme-color", content: "#0F1620" },

      // iOS PWA meta tags
      { name: "apple-mobile-web-app-capable", content: "yes" },
      {
        name: "apple-mobile-web-app-status-bar-style",
        content: "black-translucent",
      },
      { name: "apple-mobile-web-app-title", content: "Dark Guardian" },
      { name: "mobile-web-app-capable", content: "yes" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&display=swap",
      },

      // PWA manifest
      { rel: "manifest", href: "/manifest.json" },

      // iOS home screen icons
      { rel: "apple-touch-icon", href: "/icons/apple-touch-icon.png" },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/icons/apple-touch-icon.png",
      },

      // Generic favicon / icon fallback
      { rel: "icon", type: "image/png", sizes: "192x192", href: "/icons/icon-192.png" },
      { rel: "icon", type: "image/png", sizes: "512x512", href: "/icons/icon-512.png" },
    ],
    scripts: [
      // Service worker registration — production only
      {
        children: `
          if ('serviceWorker' in navigator) {
            window.addEventListener('load', function() {
              navigator.serviceWorker.register('/sw.js', { scope: '/' }).then(
                function(reg) { console.log('SW registered:', reg.scope); },
                function(err) { console.log('SW registration failed:', err); }
              );
            });
          }
        `,
      },
    ],
  }),
  notFoundComponent: () => (
    <div className="p-8 text-center text-[var(--muted)]">Page not found</div>
  ),
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
