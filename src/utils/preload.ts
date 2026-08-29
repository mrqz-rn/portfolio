import { skills, works, certs, jobs, projects } from "../data";

/**
 * Preloads critical images and icons on idle so there is zero delay when viewing sections or opening modals.
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

  // Cert icons
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

  // Primary project thumbnails
  works.forEach((work) => {
    if (work.images && work.images.length > 0) {
      imagesToPreload.push(work.images[0]);
    }
  });

  projects.forEach((proj) => {
    if (proj.images && proj.images.length > 0) {
      imagesToPreload.push(proj.images[0]);
    }
  });

  // Preload in batches during idle time
  const preloadNext = () => {
    if (imagesToPreload.length === 0) return;
    const batch = imagesToPreload.splice(0, 4);
    batch.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.decoding = "async";
    });

    if (imagesToPreload.length > 0) {
      if ("requestIdleCallback" in window) {
        window.requestIdleCallback(preloadNext, { timeout: 1000 });
      } else {
        setTimeout(preloadNext, 200);
      }
    }
  };

  if (typeof window !== "undefined") {
    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(preloadNext, { timeout: 1500 });
    } else {
      setTimeout(preloadNext, 500);
    }
  }
}
