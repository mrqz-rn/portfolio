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
  let codeBlockContent: string[] = [];

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
        `<code class="bg-zinc-100 text-zinc-800 px-1 py-0.5 rounded font-mono text-[11px] border border-zinc-200/70">${escapedCode}</code>`
      );
    });

    // 7. Bold text **bold**
    t = t.replace(/\*\*([^*]+)\*\*/g, '<strong class="font-bold">$1</strong>');

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
        htmlLines.push(
          `<pre class="bg-zinc-900 text-zinc-100 p-3 rounded-xl font-mono text-[11px] overflow-x-auto my-2 border border-zinc-800"><code>${codeBlockContent.join("\n")}</code></pre>`
        );
        codeBlockContent = [];
        inCodeBlock = false;
      } else {
        closeListIfOpen();
        closeTableIfOpen();
        inCodeBlock = true;
      }
      continue;
    }

    if (inCodeBlock) {
      codeBlockContent.push(rawLine.replace(/</g, "&lt;").replace(/>/g, "&gt;"));
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
        htmlLines.push('<div class="overflow-x-auto my-3 rounded-xl border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-[#121826] shadow-2xs overscroll-x-contain custom-scrollbar">');
        htmlLines.push('<table class="min-w-[460px] w-full text-[11px] border-collapse text-left">');
        htmlLines.push('<thead class="bg-zinc-100/90 dark:bg-zinc-800/90 border-b border-zinc-200/90 dark:border-zinc-800"><tr>');
        rawCells.forEach((cell, cellIdx) => {
          const isFirstCol = cellIdx === 0;
          htmlLines.push(`<th class="px-3 py-2 text-left font-bold text-zinc-900 dark:text-zinc-100 font-mono text-[11px] ${isFirstCol ? 'w-10 whitespace-nowrap' : 'whitespace-nowrap'}">${formatInline(cell)}</th>`);
        });
        htmlLines.push('</tr></thead><tbody class="divide-y divide-zinc-200/70 dark:divide-zinc-800">');
      } else {
        htmlLines.push('<tr class="hover:bg-zinc-50/80 dark:hover:bg-zinc-800/50 transition-colors">');
        rawCells.forEach((cell, cellIdx) => {
          const isFirstCol = cellIdx === 0;
          htmlLines.push(
            `<td class="px-3 py-2 text-zinc-700 dark:text-zinc-300 leading-relaxed align-top ${isFirstCol ? 'font-mono whitespace-nowrap text-zinc-500 dark:text-zinc-400 font-semibold' : ''}">${formatInline(cell)}</td>`
          );
        });
        htmlLines.push('</tr>');
      }
      continue;
    } else {
      closeTableIfOpen();
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
      htmlLines.push(`<h4 class="text-xs font-bold uppercase font-mono tracking-wider mt-3 mb-1.5">${formatInline(trimmed.slice(4))}</h4>`);
      continue;
    }
    if (trimmed.startsWith("## ")) {
      closeListIfOpen();
      htmlLines.push(`<h3 class="text-sm font-bold font-mono tracking-tight mt-3.5 mb-2">${formatInline(trimmed.slice(3))}</h3>`);
      continue;
    }
    if (trimmed.startsWith("# ")) {
      closeListIfOpen();
      htmlLines.push(`<h2 class="text-base font-bold font-mono tracking-tight mt-4 mb-2">${formatInline(trimmed.slice(2))}</h2>`);
      continue;
    }

    // Unordered List Items (-, *, •)
    const ulMatch = trimmed.match(/^[-*•]\s+(.*)$/);
    if (ulMatch) {
      if (!inList || listType !== "ul") {
        closeListIfOpen();
        htmlLines.push('<ul class="space-y-1.5 my-1.5 pl-4 list-disc marker:opacity-60">');
        inList = true;
        listType = "ul";
      }
      htmlLines.push(`<li class="leading-relaxed pl-0.5">${formatInline(ulMatch[1])}</li>`);
      continue;
    }

    // Ordered List Items (1. , 2. )
    const olMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
    if (olMatch) {
      if (!inList || listType !== "ol") {
        closeListIfOpen();
        htmlLines.push('<ol class="space-y-1.5 my-1.5 pl-4 list-decimal marker:font-mono marker:opacity-75">');
        inList = true;
        listType = "ol";
      }
      htmlLines.push(`<li class="leading-relaxed pl-0.5">${formatInline(olMatch[2])}</li>`);
      continue;
    }

    // Regular Paragraph
    closeListIfOpen();
    htmlLines.push(`<p class="leading-relaxed">${formatInline(trimmed)}</p>`);
  }

  closeListIfOpen();
  closeTableIfOpen();

  return htmlLines.join("");
}
