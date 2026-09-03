import { getPreRenderedDiagram } from "./preRenderedDiagrams";

/**
 * Lightweight, robust Markdown to HTML parser for ChatBot responses.
 * Supports Tables, Headings, Unordered/Ordered Lists, Code Blocks, Inline Code, Bold, Italics, Links, and Emails.
 * Uses a tokenization technique to prevent regex double-replacement collisions on HTML tags.
 */
export function parseMarkdownToHtml(markdown: string): string {
  if (!markdown) return "";

  // Normalize line endings
  let lines = markdown.replace(/\r\n/g, "\n").split("\n");
  let htmlLines: string[] = [];
  let inTable = false;
  let tableHeaderParsed = false;
  let inList = false;
  let listType: "ul" | "ol" | null = null;
  let inCodeBlock = false;
  let codeBlockLang = "";
  let codeBlockRawLines: string[] = [];

  const formatInline = (text: string): string => {
    let t = text;
    const tokens: string[] = [];
    const pushToken = (html: string) => {
      const id = `___TOKEN_${tokens.length}___`;
      tokens.push(html);
      return id;
    };

    // 1. Markdown Links [label](url)
    t = t.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_match, label, href) => {
      let link = href;
      if (href.includes("@") && !href.startsWith("mailto:")) {
        link = "mailto:" + href;
      } else if (
        !href.startsWith("http://") &&
        !href.startsWith("https://") &&
        !href.startsWith("mailto:")
      ) {
        link = "https://" + href;
      }
      const isMail = link.startsWith("mailto:");
      return pushToken(
        `<a href="${link}" ${
          isMail ? "" : 'target="_blank" rel="noopener noreferrer" '
        }class="text-blue-600 underline font-semibold hover:text-blue-800">${label}</a>`
      );
    });

    // 2. Autolink Email <email@example.com>
    t = t.replace(/<([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})>/g, (_match, email) => {
      return pushToken(
        `<a href="mailto:${email}" class="text-blue-600 underline font-semibold hover:text-blue-800">${email}</a>`
      );
    });

    // 3. Autolink URL <https://example.com>
    t = t.replace(/<(https?:\/\/[^\s>]+)>/g, (_match, url) => {
      return pushToken(
        `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-600 underline font-semibold hover:text-blue-800">${url}</a>`
      );
    });

    // 4. Standalone plain emails (e.g. user@domain.com)
    t = t.replace(/\b([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})\b/g, (_match, email) => {
      return pushToken(
        `<a href="mailto:${email}" class="text-blue-600 underline font-semibold hover:text-blue-800">${email}</a>`
      );
    });

    // 5. Standalone plain URLs
    t = t.replace(/\b(https?:\/\/[^\s<]+)/g, (_match, url) => {
      return pushToken(
        `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-600 underline font-semibold hover:text-blue-800">${url}</a>`
      );
    });

    // 6. Inline code `code`
    t = t.replace(/`([^`]+)`/g, (_match, code) => {
      const escapedCode = code.replace(/</g, "&lt;").replace(/>/g, "&gt;");
      return pushToken(
        `<code class="bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 px-1.5 py-0.5 rounded font-mono text-[11px] border border-zinc-200/70 dark:border-zinc-700">${escapedCode}</code>`
      );
    });

    // 7. Bold text **bold**
    t = t.replace(/\*\*([^*]+)\*\*/g, '<strong class="font-bold text-zinc-950 dark:text-white">$1</strong>');

    // 8. Italic text *italic* or _italic_
    t = t.replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, '<em class="italic opacity-90">$1</em>');

    // Restore tokens safely without regex collision
    tokens.forEach((tokenHtml, idx) => {
      t = t.replaceAll(`___TOKEN_${idx}___`, tokenHtml);
    });

    return t;
  };

  const closeListIfOpen = () => {
    if (inList) {
      htmlLines.push(listType === "ol" ? "</ol>" : "</ul>");
      inList = false;
      listType = null;
    }
  };

  const closeTableIfOpen = () => {
    if (inTable) {
      htmlLines.push("</tbody></table></div>");
      inTable = false;
      tableHeaderParsed = false;
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    // Code Block Toggle
    if (trimmed.startsWith("```")) {
      if (inCodeBlock) {
        const rawCode = codeBlockRawLines.join("\n");
        const trimmedCode = rawCode.trim();
        const isMermaid =
          codeBlockLang.toLowerCase() === "mermaid" ||
          /^(flowchart|graph|sequenceDiagram|classDiagram|stateDiagram|erDiagram|gantt|pie|gitGraph)\b/i.test(trimmedCode);

        if (isMermaid) {
          let diagramTitle = "Architecture Diagram";
          if (/^(flowchart|graph)\b/i.test(trimmedCode)) {
            diagramTitle = "Architecture Flowchart";
          } else if (/^sequenceDiagram\b/i.test(trimmedCode)) {
            diagramTitle = "Sequence Process Diagram";
          }

          const encoded = encodeURIComponent(trimmedCode);
          const isDarkTheme = typeof document !== "undefined" && document.documentElement.classList.contains("dark");
          const preRendered = getPreRenderedDiagram(trimmedCode, isDarkTheme);

          htmlLines.push(
            `<div class="mermaid-block my-8 overflow-hidden rounded-3xl border border-zinc-200/90 dark:border-zinc-800 bg-white/80 dark:bg-[#101524] shadow-xs">
              <div class="flex items-center justify-between px-5 py-3 bg-zinc-50/90 dark:bg-zinc-900/90 border-b border-zinc-200/80 dark:border-zinc-800 text-xs font-mono text-zinc-500">
                <span class="flex items-center gap-2 font-semibold text-zinc-800 dark:text-zinc-200">
                  <span class="w-2 h-2 rounded-full bg-blue-500"></span>
                  <span>${diagramTitle}</span>
                </span>
                <span class="text-[10px] uppercase font-mono px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 font-bold border border-blue-200/60 dark:border-blue-800/60">Mermaid Diagram</span>
              </div>
              <div class="mermaid-diagram-container p-6 md:p-8 overflow-x-auto flex justify-center items-center custom-scrollbar" data-mermaid="${encoded}">
                <div class="mermaid-svg-target flex justify-center w-full min-h-[120px]">
                  ${preRendered || `
                  <div class="text-xs font-mono text-zinc-400 flex items-center gap-2 py-6">
                    <span class="inline-block w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></span>
                    <span>Rendering diagram...</span>
                  </div>`}
                </div>
              </div>
            </div>`
          );
        } else {
          const escaped = rawCode.replace(/</g, "&lt;").replace(/>/g, "&gt;");
          htmlLines.push(
            `<pre class="bg-zinc-900 text-zinc-100 p-4 rounded-2xl font-mono text-xs overflow-x-auto my-4 border border-zinc-800 custom-scrollbar"><code class="${codeBlockLang ? `language-${codeBlockLang}` : ""}">${escaped}</code></pre>`
          );
        }

        codeBlockRawLines = [];
        codeBlockLang = "";
        inCodeBlock = false;
      } else {
        closeListIfOpen();
        closeTableIfOpen();
        codeBlockLang = trimmed.slice(3).trim();
        codeBlockRawLines = [];
        inCodeBlock = true;
      }
      continue;
    }

    if (inCodeBlock) {
      codeBlockRawLines.push(rawLine);
      continue;
    }

    // Horizontal Rule (---, ***, ___)
    if (/^(---+|\*\*\*+|___+)$/.test(trimmed)) {
      closeListIfOpen();
      closeTableIfOpen();
      htmlLines.push('<hr class="my-8 border-t border-zinc-200 dark:border-zinc-800" />');
      continue;
    }

    // Markdown Table Row Detection
    if (trimmed.startsWith("|") && trimmed.endsWith("|")) {
      closeListIfOpen();

      const isSeparator = /^\|(\s*:?-+:?\s*\|)+$/.test(trimmed);
      if (isSeparator) {
        tableHeaderParsed = true;
        continue;
      }

      const rawCells = trimmed
        .slice(1, -1)
        .split("|")
        .map(c => c.trim());

      if (!inTable) {
        inTable = true;
        tableHeaderParsed = false;
        htmlLines.push('<div class="overflow-x-auto my-4 rounded-2xl border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-[#121826] shadow-2xs overscroll-x-contain custom-scrollbar">');
        htmlLines.push('<table class="min-w-[500px] w-full text-xs border-collapse text-left">');
        htmlLines.push('<thead class="bg-zinc-100/90 dark:bg-zinc-800/90 border-b border-zinc-200/90 dark:border-zinc-800"><tr>');
        rawCells.forEach((cell, cellIdx) => {
          const isFirstCol = cellIdx === 0;
          htmlLines.push(`<th class="px-4 py-2.5 text-left font-bold text-zinc-900 dark:text-zinc-100 font-mono text-xs ${isFirstCol ? 'w-24 whitespace-nowrap' : 'whitespace-nowrap'}">${formatInline(cell)}</th>`);
        });
        htmlLines.push('</tr></thead><tbody class="divide-y divide-zinc-200/70 dark:divide-zinc-800">');
      } else {
        htmlLines.push('<tr class="hover:bg-zinc-50/80 dark:hover:bg-zinc-800/50 transition-colors">');
        rawCells.forEach((cell, cellIdx) => {
          const isFirstCol = cellIdx === 0;
          htmlLines.push(
            `<td class="px-4 py-2.5 text-zinc-700 dark:text-zinc-300 leading-relaxed align-top ${isFirstCol ? 'font-mono whitespace-nowrap text-zinc-600 dark:text-zinc-400 font-semibold' : ''}">${formatInline(cell)}</td>`
          );
        });
        htmlLines.push('</tr>');
      }
      continue;
    } else {
      closeTableIfOpen();
    }

    // Checklist Items (- [ ] or - [x])
    const taskMatch = trimmed.match(/^[-*•]\s+\[([ xX])\]\s+(.*)$/);
    if (taskMatch) {
      closeListIfOpen();
      const isChecked = taskMatch[1].toLowerCase() === "x";
      htmlLines.push(
        `<div class="flex items-start gap-3 my-2 text-zinc-800 dark:text-zinc-200 font-sans">
          <span class="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border ${
            isChecked
              ? "border-blue-500 bg-blue-500 text-white"
              : "border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 text-transparent"
          } font-mono text-[10px] font-bold select-none">
            ${isChecked ? "✓" : ""}
          </span>
          <div class="text-sm leading-relaxed">${formatInline(taskMatch[2])}</div>
        </div>`
      );
      continue;
    }

    // Blockquote (> text)
    if (trimmed.startsWith("> ")) {
      closeListIfOpen();
      htmlLines.push(
        `<blockquote class="border-l-4 border-blue-500 bg-blue-50/40 dark:bg-blue-950/20 px-4 py-2.5 my-3 rounded-r-xl text-zinc-700 dark:text-zinc-300 text-sm italic leading-relaxed">${formatInline(trimmed.slice(2))}</blockquote>`
      );
      continue;
    }

    // Empty line
    if (!trimmed) {
      closeListIfOpen();
      htmlLines.push('<div class="h-2"></div>');
      continue;
    }

    // Headings (###, ##, #)
    if (trimmed.startsWith("### ")) {
      closeListIfOpen();
      htmlLines.push(`<h3 class="text-base md:text-lg font-bold font-mono text-zinc-900 dark:text-white tracking-tight mt-6 mb-2">${formatInline(trimmed.slice(4))}</h3>`);
      continue;
    }
    if (trimmed.startsWith("## ")) {
      closeListIfOpen();
      htmlLines.push(`<h2 class="text-xl md:text-2xl font-bold font-mono text-zinc-900 dark:text-white tracking-tight mt-8 mb-3 border-b border-zinc-200/60 dark:border-zinc-800/60 pb-2">${formatInline(trimmed.slice(3))}</h2>`);
      continue;
    }
    if (trimmed.startsWith("# ")) {
      closeListIfOpen();
      htmlLines.push(`<h1 class="text-2xl md:text-3xl font-bold font-mono text-zinc-900 dark:text-white tracking-tight mt-10 mb-4">${formatInline(trimmed.slice(2))}</h1>`);
      continue;
    }

    // Unordered List Items (-, *, •)
    const ulMatch = trimmed.match(/^[-*•]\s+(.*)$/);
    if (ulMatch) {
      if (!inList || listType !== "ul") {
        closeListIfOpen();
        htmlLines.push('<ul class="space-y-1.5 my-2 pl-5 list-disc marker:opacity-60 text-zinc-800 dark:text-zinc-200">');
        inList = true;
        listType = "ul";
      }
      htmlLines.push(`<li class="leading-relaxed pl-1">${formatInline(ulMatch[1])}</li>`);
      continue;
    }

    // Ordered List Items (1. , 2. )
    const olMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
    if (olMatch) {
      if (!inList || listType !== "ol") {
        closeListIfOpen();
        htmlLines.push('<ol class="space-y-1.5 my-2 pl-5 list-decimal marker:font-mono marker:opacity-75 text-zinc-800 dark:text-zinc-200">');
        inList = true;
        listType = "ol";
      }
      htmlLines.push(`<li class="leading-relaxed pl-1">${formatInline(olMatch[2])}</li>`);
      continue;
    }

    // Regular Paragraph
    closeListIfOpen();
    htmlLines.push(`<p class="leading-relaxed text-zinc-800 dark:text-zinc-200 my-2">${formatInline(trimmed)}</p>`);
  }

  closeListIfOpen();
  closeTableIfOpen();

  return htmlLines.join("");
}
