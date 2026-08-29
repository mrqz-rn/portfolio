import { skills, certs, jobs } from "../data";

/**
 * Preloads critical icons on idle so there is zero delay when viewing sections.
 */
export function preloadAssets() {
  const imagesToPreload: string[] = [];

  // Tech stack icons
  skills.forEach((cat) => {
    cat.items.forEach((skill) => {
      if (typeof skill === "object" && skill.icon) {
        imagesToPreload.push(`/tech/${skill.icon}`);
      }
    });
  });

  // Cert icons (SVGs)
  certs.forEach((cert) => {
    if (cert.icon) {
      imagesToPreload.push(cert.icon);
    }
  });

  // Company logos
  jobs.forEach((job) => {
    if (job.icon) {
      imagesToPreload.push(job.icon);
    }
  });

  // Preload in gentle batches during idle time
  const preloadNext = () => {
    if (imagesToPreload.length === 0) return;
    const batch = imagesToPreload.splice(0, 6);
    batch.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.decoding = "async";
    });

    if (imagesToPreload.length > 0) {
      if ("requestIdleCallback" in window) {
        window.requestIdleCallback(preloadNext, { timeout: 2000 });
      } else {
        setTimeout(preloadNext, 400);
      }
    }
  };

  if (typeof window !== "undefined") {
    const win = window as any;
    if (typeof win.requestIdleCallback === "function") {
      win.requestIdleCallback(preloadNext, { timeout: 3000 });
    } else {
      window.addEventListener("load", () => {
        setTimeout(preloadNext, 1000);
      });
    }
  }
}

