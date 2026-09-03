import { getPreRenderedDiagram } from "./preRenderedDiagrams";

let mermaidInstance: any = null;

export async function getMermaid() {
  if (!mermaidInstance) {
    const mod = await import("mermaid");
    mermaidInstance = mod.default || mod;
  }
  return mermaidInstance;
}

export async function renderMermaidDiagrams(container: HTMLElement) {
  if (!container || typeof window === "undefined") return;

  const elements = container.querySelectorAll<HTMLElement>(".mermaid-diagram-container[data-mermaid]");
  if (elements.length === 0) return;

  const isDark = document.documentElement.classList.contains("dark");
  const unhandledElements: HTMLElement[] = [];

  // 1. Process instant pre-rendered diagrams (0ms latency, zero dependencies)
  for (const el of Array.from(elements)) {
    const rawData = el.getAttribute("data-mermaid");
    if (!rawData) continue;

    const code = decodeURIComponent(rawData);
    const preRendered = getPreRenderedDiagram(code, isDark);

    if (preRendered) {
      const target = el.querySelector(".mermaid-svg-target");
      if (target) {
        target.innerHTML = preRendered;
        const svgEl = target.querySelector("svg");
        if (svgEl) {
          svgEl.style.maxWidth = "100%";
          svgEl.style.height = "auto";
          svgEl.style.display = "block";
          svgEl.style.margin = "0 auto";
        }
      }
    } else {
      unhandledElements.push(el);
    }
  }

  // If all diagrams were pre-rendered, return immediately!
  if (unhandledElements.length === 0) {
    return;
  }

  // 2. For custom or newly typed diagrams, dynamically load Mermaid with timeout safety
  try {
    const mermaid = await Promise.race([
      getMermaid(),
      new Promise<null>((_, reject) =>
        setTimeout(() => reject(new Error("Mermaid load timeout")), 3500)
      )
    ]);

    if (!mermaid) return;

    mermaid.initialize({
      startOnLoad: false,
      securityLevel: "loose",
      fontFamily: "JetBrains Mono, system-ui, sans-serif",
      theme: isDark ? "dark" : "default",
      flowchart: {
        useMaxWidth: true,
        htmlLabels: true,
        curve: "basis"
      },
      sequence: {
        useMaxWidth: true,
        showSequenceNumbers: true
      }
    });

    for (let i = 0; i < unhandledElements.length; i++) {
      const el = unhandledElements[i];
      const encoded = el.getAttribute("data-mermaid");
      if (!encoded) continue;

      const code = decodeURIComponent(encoded);
      const uniqueId = `mermaid-chart-${Date.now()}-${i}`;

      try {
        const { svg } = await mermaid.render(uniqueId, code);
        const target = el.querySelector(".mermaid-svg-target");
        if (target) {
          target.innerHTML = svg;
          const svgEl = target.querySelector("svg");
          if (svgEl) {
            svgEl.style.maxWidth = "100%";
            svgEl.style.height = "auto";
            svgEl.style.display = "block";
            svgEl.style.margin = "0 auto";
          }
        }
      } catch (renderError) {
        console.warn("Mermaid render error:", renderError);
        const tempEl = document.getElementById(uniqueId);
        if (tempEl) tempEl.remove();

        const target = el.querySelector(".mermaid-svg-target");
        if (target) {
          target.innerHTML = `<div class="p-4 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 text-left w-full overflow-x-auto">
            <div class="text-[11px] font-mono font-bold text-zinc-500 uppercase tracking-wider mb-2">Diagram Source Code</div>
            <pre class="font-mono text-xs text-zinc-700 dark:text-zinc-300">${code.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</pre>
          </div>`;
        }
      }
    }
  } catch (err) {
    console.warn("Mermaid dynamic loading fallback:", err);
    // Never leave user hanging on "Rendering diagram..."
    for (const el of unhandledElements) {
      const encoded = el.getAttribute("data-mermaid");
      if (!encoded) continue;
      const code = decodeURIComponent(encoded);
      const target = el.querySelector(".mermaid-svg-target");
      if (target) {
        target.innerHTML = `<div class="p-4 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 text-left w-full overflow-x-auto">
          <div class="text-[11px] font-mono font-bold text-zinc-500 uppercase tracking-wider mb-2">Diagram Source</div>
          <pre class="font-mono text-xs text-zinc-700 dark:text-zinc-300">${code.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</pre>
        </div>`;
      }
    }
  }
}
