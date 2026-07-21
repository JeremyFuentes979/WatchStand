// The Dark Guardian — Service Worker
// Cache-first for app shell, network-first for navigation,
// offline fallback for everything else.

const CACHE_VERSION = "tdg-v2";
const APP_SHELL_CACHE = `${CACHE_VERSION}-shell`;
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const FONT_CACHE = `${CACHE_VERSION}-fonts`;

// Resources to pre-cache on install (app shell)
const APP_SHELL = ["/", "/offline"];

// Static asset patterns to cache-first match
const STATIC_PATTERNS = [
  /\.js$/,
  /\.css$/,
  /\.png$/,
  /\.svg$/,
  /\.ico$/,
  /\.webp$/,
  /\/icons\//,
  /\/manifest\.json$/,
];

// Font CDN patterns
const FONT_PATTERNS = [/fonts\.googleapis\.com/, /fonts\.gstatic\.com/];

// API-like routes — network first
const API_PATTERNS = [/^\/api\//];

// Offline page HTML (inlined so it works with no network at all)
const OFFLINE_HTML = `<!DOCTYPE html>
<html lang="en" class="dark">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
  <title>The Dark Guardian — Offline</title>
  <style>
    :root { --bg-deep: #0F1620; --amber: #D98E3B; --text: #EDEAE3; --muted: #8B93A1; }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body {
      font-family: "IBM Plex Sans", system-ui, -apple-system, sans-serif;
      background-color: var(--bg-deep); color: var(--text);
      height: 100dvh; display: flex; flex-direction: column;
      align-items: center; justify-content: center; text-align: center;
      padding: 24px;
    }
    .badge {
      width: 72px; height: 72px; border: 2px solid var(--amber);
      border-radius: 18px; display: flex; align-items: center;
      justify-content: center; margin-bottom: 24px; font-size: 32px;
    }
    h1 { font-size: 22px; font-weight: 600; margin-bottom: 8px; }
    p { color: var(--muted); font-size: 15px; line-height: 1.5; max-width: 280px; margin-bottom: 24px; }
    .btn {
      background-color: var(--amber); color: var(--bg-deep);
      font-weight: 600; font-size: 15px; padding: 14px 32px;
      border-radius: 12px; border: none; cursor: pointer;
      text-decoration: none; display: inline-block;
    }
  </style>
</head>
<body>
  <div class="badge">🛡️</div>
  <h1>You're Offline</h1>
  <p>The Dark Guardian works offline — but this page isn't cached yet. Visit it while connected to save it for later.</p>
  <button class="btn" onclick="location.reload()">Try Again</button>
</body>
</html>`;

// Install — pre-cache app shell
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(APP_SHELL_CACHE).then((cache) => {
      // Pre-cache the offline page HTML directly
      const offlineResponse = new Response(OFFLINE_HTML, {
        headers: { "Content-Type": "text/html" },
      });
      cache.put(new Request("/offline"), offlineResponse);
      return Promise.all(
        APP_SHELL.map((url) => {
          // Skip /offline — we just cached it above
          if (url === "/offline") return Promise.resolve();
          return fetch(url, { mode: "no-cors" })
            .then((resp) => {
              if (resp.ok || resp.type === "opaque") {
                return cache.put(url, resp);
              }
            })
            .catch(() => {});
        })
      );
    })
  );
  self.skipWaiting();
});

// Activate — clean old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      const currentCaches = [APP_SHELL_CACHE, STATIC_CACHE, FONT_CACHE];
      return Promise.all(
        keys.filter((k) => !currentCaches.includes(k)).map((k) => caches.delete(k))
      );
    })
  );
  self.clients.claim();
});

// Helper: does a URL match any of the given patterns?
function matchesAny(url, patterns) {
  return patterns.some((p) => p.test(url));
}

// Fetch strategy
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = request.url;
  const method = request.method;

  // Only handle GET
  if (method !== "GET") return;

  // API calls — network first, no caching
  if (matchesAny(url, API_PATTERNS)) {
    event.respondWith(
      fetch(request).catch(() => {
        return new Response(JSON.stringify({ error: "offline" }), {
          status: 503,
          headers: { "Content-Type": "application/json" },
        });
      })
    );
    return;
  }

  // Fonts — cache first
  if (matchesAny(url, FONT_PATTERNS)) {
    event.respondWith(
      caches.open(FONT_CACHE).then((cache) =>
        cache.match(request).then((cached) => {
          const fetchPromise = fetch(request).then((resp) => {
            if (resp.ok) cache.put(request, resp.clone());
            return resp;
          });
          return cached || fetchPromise;
        })
      )
    );
    return;
  }

  // Static assets — cache first with network update
  if (matchesAny(url, STATIC_PATTERNS)) {
    event.respondWith(
      caches.open(STATIC_CACHE).then((cache) =>
        cache.match(request).then((cached) => {
          const fetchPromise = fetch(request).then((resp) => {
            if (resp.ok) cache.put(request, resp.clone());
            return resp;
          });
          return cached || fetchPromise;
        })
      )
    );
    return;
  }

  // Navigation requests — network first, fallback to offline page
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((resp) => {
          // Cache the successful navigation response
          if (resp.ok) {
            const clone = resp.clone();
            caches.open(APP_SHELL_CACHE).then((cache) => cache.put(request, clone));
          }
          return resp;
        })
        .catch(() => {
          return caches
            .match(request)
            .then((cached) => cached || caches.match("/offline"));
        })
    );
    return;
  }

  // Everything else — stale-while-revalidate
  event.respondWith(
    caches.open(STATIC_CACHE).then((cache) =>
      cache.match(request).then((cached) => {
        const fetchPromise = fetch(request)
          .then((resp) => {
            if (resp.ok) cache.put(request, resp.clone());
            return resp;
          })
          .catch(() => cached);
        return cached || fetchPromise;
      })
    )
  );
});
