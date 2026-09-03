export interface DeviceInfo {
  deviceType: "desktop" | "mobile" | "tablet";
  os: string;
  browser: string;
  screenResolution: string;
  language: string;
  timezone: string;
  summary: string;
}

/**
 * Detects visitor device type, operating system, browser, screen size, language, and timezone.
 */
export function detectDeviceInfo(): DeviceInfo {
  if (typeof window === "undefined" || typeof navigator === "undefined") {
    return {
      deviceType: "desktop",
      os: "Unknown OS",
      browser: "Unknown Browser",
      screenResolution: "N/A",
      language: "en",
      timezone: "UTC",
      summary: "Server / Unknown"
    };
  }

  const ua = navigator.userAgent || "";

  // 1. Operating System
  let os = "Unknown OS";
  if (/Macintosh|Mac OS X/i.test(ua)) {
    os = /iPad|iPhone|iPod/i.test(ua) ? "iOS" : "macOS";
  } else if (/Windows/i.test(ua)) {
    os = "Windows";
  } else if (/Android/i.test(ua)) {
    os = "Android";
  } else if (/Linux/i.test(ua)) {
    os = "Linux";
  } else if (/iPhone|iPad|iPod/i.test(ua)) {
    os = "iOS";
  } else if (/CrOS/i.test(ua)) {
    os = "ChromeOS";
  }

  // 2. Device Category
  let deviceType: "desktop" | "mobile" | "tablet" = "desktop";
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    deviceType = "tablet";
  } else if (
    /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/i.test(ua) ||
    window.innerWidth <= 768
  ) {
    deviceType = "mobile";
  }

  // 3. Browser
  let browser = "Unknown Browser";
  if (/Edg\//i.test(ua)) {
    browser = "Edge";
  } else if (/Chrome\//i.test(ua) && !/Chromium|Edg\//i.test(ua)) {
    browser = "Chrome";
  } else if (/Safari\//i.test(ua) && !/Chrome\//i.test(ua)) {
    browser = "Safari";
  } else if (/Firefox\//i.test(ua)) {
    browser = "Firefox";
  } else if (/Opera|OPR\//i.test(ua)) {
    browser = "Opera";
  }

  // 4. Resolution & Locale
  const screenResolution = `${window.screen?.width || window.innerWidth}x${window.screen?.height || window.innerHeight}`;
  const language = navigator.language || "en";
  let timezone = "UTC";
  try {
    timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
  } catch (e) {
    // ignore
  }

  const deviceLabel = deviceType.charAt(0).toUpperCase() + deviceType.slice(1);
  const summary = `${os} • ${browser} (${deviceLabel})`;

  return {
    deviceType,
    os,
    browser,
    screenResolution,
    language,
    timezone,
    summary
  };
}

/**
 * Returns or creates a persistent conversation session ID for this visitor session.
 */
export function getChatSessionId(): string {
  if (typeof window === "undefined") {
    return "session-" + Math.random().toString(36).substring(2, 10);
  }

  const STORAGE_KEY = "rom_chat_session_id";
  try {
    let sessionId = sessionStorage.getItem(STORAGE_KEY);
    if (!sessionId) {
      sessionId = "sess_" + Date.now().toString(36) + "_" + Math.random().toString(36).substring(2, 8);
      sessionStorage.setItem(STORAGE_KEY, sessionId);
    }
    return sessionId;
  } catch (e) {
    return "sess_" + Date.now().toString(36);
  }
}

/**
 * Quick client-side IP lookup fallback if needed
 */
export async function getClientIpFallback(): Promise<string> {
  try {
    const res = await fetch("https://api.ipify.org?format=json", { signal: AbortSignal.timeout(2000) });
    if (res.ok) {
      const data = await res.json();
      return data.ip || "127.0.0.1";
    }
  } catch (e) {
    // ignore fallback error
  }
  return "127.0.0.1";
}
