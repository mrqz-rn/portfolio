import { useEffect, useRef, useMemo, memo } from "react";
import { parseMarkdownToHtml } from "../../utils/markdownParser";
import { renderMermaidDiagrams } from "../../utils/mermaidRenderer";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export const MarkdownRenderer = memo(function MarkdownRenderer({
  content,
  className = ""
}: MarkdownRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const html = useMemo(() => parseMarkdownToHtml(content), [content]);
  const innerHtml = useMemo(() => ({ __html: html }), [html]);

  useEffect(() => {
    if (!containerRef.current) return;

    let isMounted = true;
    renderMermaidDiagrams(containerRef.current);

    // Re-render when theme changes (light/dark mode toggle)
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === "attributes" && mutation.attributeName === "class") {
          if (isMounted && containerRef.current) {
            renderMermaidDiagrams(containerRef.current);
          }
        }
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"]
    });

    return () => {
      isMounted = false;
      observer.disconnect();
    };
  }, [html]);

  return (
    <div
      ref={containerRef}
      className={className}
      dangerouslySetInnerHTML={innerHtml}
    />
  );
});
