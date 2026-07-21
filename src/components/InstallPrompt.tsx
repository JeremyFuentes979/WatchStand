import { useState, useEffect } from "react";
import { Download, Share2, X } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const DISMISSAL_KEY = "tdg_install_dismissed";

function wasDismissedRecently(): boolean {
  try {
    const ts = localStorage.getItem(DISMISSAL_KEY);
    if (!ts) return false;
    const dismissedAt = parseInt(ts, 10);
    // 24 hours = 86400000 ms
    return Date.now() - dismissedAt < 86_400_000;
  } catch {
    return false;
  }
}

function setDismissed(): void {
  try {
    localStorage.setItem(DISMISSAL_KEY, Date.now().toString());
  } catch {
    // localStorage may be unavailable
  }
}

/**
 * InstallPrompt — A subtle, non-intrusive banner that appears when
 * the browser fires the `beforeinstallprompt` event (Android/Chrome PWA).
 *
 * On iOS/Safari (which doesn't support beforeinstallprompt), shows a
 * one-time hint at the bottom explaining the manual install flow.
 *
 * Only shows when:
 * - The app is not already running in standalone mode
 * - The browser has signaled installability (or it's iOS)
 * - Hasn't been dismissed in the last 24 hours
 */
export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [showIOSHint, setShowIOSHint] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Already installed
    if (window.matchMedia("(display-mode: standalone)").matches) return;

    // Already dismissed in last 24h
    if (wasDismissedRecently()) return;

    // Detect iOS (non-standalone Safari)
    const ua = navigator.userAgent;
    const iOS =
      /iPad|iPhone|iPod/.test(ua) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    const isSafari = /Safari/.test(ua) && !/CriOS|FxiOS|OPiOS|mercury/.test(ua);
    const isIOSDevice = iOS && isSafari;
    setIsIOS(isIOSDevice);

    // Android/Chrome path: listen for beforeinstallprompt
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowBanner(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    window.addEventListener("appinstalled", () => {
      setShowBanner(false);
      setShowIOSHint(false);
      setDeferredPrompt(null);
    });

    // iOS path: show hint after a short delay if no install prompt fired
    let iosTimer: ReturnType<typeof setTimeout> | null = null;
    if (isIOSDevice) {
      iosTimer = setTimeout(() => {
        setShowIOSHint(true);
      }, 3000);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      if (iosTimer) clearTimeout(iosTimer);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setShowBanner(false);
      setShowIOSHint(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowBanner(false);
    setShowIOSHint(false);
    setDismissed(true);
    setDismissed();
  };

  if (dismissed) return null;

  // Android/Chrome install banner
  if (showBanner) {
    return (
      <div className="card rounded-xl p-3 flex items-center gap-3 border border-[var(--amber)]/20 animate-slide-up">
        <div className="w-9 h-9 rounded-lg bg-[var(--amber)]/10 flex items-center justify-center shrink-0">
          <Download size={18} className="text-[var(--amber)]" />
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-[var(--text)]">
            Add to Home Screen
          </p>
          <p className="text-xs text-[var(--muted)]">
            Use it like an app — no browser chrome
          </p>
        </div>

        <button
          onClick={handleInstall}
          className="bg-[var(--amber)] text-[var(--bg-deep)] text-xs font-bold px-3.5 py-1.5 rounded-lg shrink-0"
        >
          Install
        </button>

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

  // iOS Safari hint — subtle bottom banner
  if (showIOSHint && isIOS) {
    return (
      <div className="card rounded-xl p-3 flex items-center gap-3 border border-[var(--amber)]/20 animate-slide-up">
        <div className="w-9 h-9 rounded-lg bg-[var(--amber)]/10 flex items-center justify-center shrink-0">
          <Share2 size={18} className="text-[var(--amber)]" />
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-[var(--text)]">
            Add to Home Screen
          </p>
          <p className="text-xs text-[var(--muted)]">
            Tap <span className="text-[var(--amber)] font-medium">Share</span> → Add to Home Screen
          </p>
        </div>

        <button
          onClick={handleDismiss}
          className="text-[var(--muted)] hover:text-[var(--text)] shrink-0 p-1 -mr-1"
          aria-label="Dismiss"
        >
          <X size={16} />
        </button>
      </div>
    );
  }

  return null;
}
