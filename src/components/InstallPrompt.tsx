import { useState, useEffect } from "react";
import { Download, X } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

/**
 * InstallPrompt — A subtle, non-intrusive banner that appears when
 * the browser fires the `beforeinstallprompt` event (PWA installable).
 *
 * Only shows when:
 * - The app is not already running in standalone mode
 * - The browser has signaled installability
 * - The user hasn't dismissed it this session
 */
export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Don't show if already installed (standalone mode)
    if (window.matchMedia("(display-mode: standalone)").matches) return;

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowBanner(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    // Also check if already installed after the fact
    window.addEventListener("appinstalled", () => {
      setShowBanner(false);
      setDeferredPrompt(null);
    });

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setShowBanner(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowBanner(false);
    setDismissed(true);
  };

  if (!showBanner || dismissed) return null;

  return (
    <div className="card rounded-xl p-3 flex items-center gap-3 border border-[var(--amber)]/20 animate-slide-up">
      {/* Shield icon */}
      <div className="w-9 h-9 rounded-lg bg-[var(--amber)]/10 flex items-center justify-center shrink-0">
        <Download size={18} className="text-[var(--amber)]" />
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-[var(--text)]">
          Install The Dark Guardian
        </p>
        <p className="text-xs text-[var(--muted)]">
          Use it like an app — no browser chrome
        </p>
      </div>

      {/* Install button */}
      <button
        onClick={handleInstall}
        className="bg-[var(--amber)] text-[var(--bg-deep)] text-xs font-bold px-3.5 py-1.5 rounded-lg shrink-0"
      >
        Install
      </button>

      {/* Dismiss */}
      <button
        onClick={handleDismiss}
        className="text-[var(--muted)] hover:text-[var(--text)] shrink-0 p-1 -mr-1"
        aria-label="Dismiss install prompt"
      >
        <X size={16} />
      </button>
    </div>
  );
}
