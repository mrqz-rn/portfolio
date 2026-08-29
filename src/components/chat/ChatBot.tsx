import { useState, useRef, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Bot, 
  X, 
  Send, 
  RotateCcw, 
  Sparkles, 
  User, 
  Mail, 
  ExternalLink,
  MessageSquare
} from "lucide-react";

import { getRomFallbackReply } from "../../utils/romFallbackEngine";
import { ROM_SYSTEM_PROMPT } from "../../utils/romKnowledge";
import { parseMarkdownToHtml } from "../../utils/markdownParser";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const STARTER_PROMPTS = [
  "What are Ron's core technical skills?",
  "Tell me about the Basecamp TMS project",
  "What is Ron's work experience?",
  "How can I get in touch with Ron?"
];

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hi! I'm **RoM**, Ron's virtual AI assistant. Ask me anything about Ron's work history, tech stack, enterprise projects, or how to get in touch!",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setHasUnread(false);
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: query,
      timestamp: new Date()
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    let replyContent = "";

    // 1. Try serverless backend endpoint (/api/chat)
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map(m => ({
            role: m.role,
            content: m.content
          }))
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.reply && data.provider !== "knowledge_engine") {
          replyContent = data.reply;
        } else if (data.reply) {
          replyContent = data.reply;
        }
      }
    } catch (err) {
      console.warn("Serverless API note:", err);
    }

    // 2. Direct client-side Groq call if server didn't run live model
    const clientGroqKey = process.env.GROQ_API_KEY;
    if (!replyContent && clientGroqKey) {
      try {
        const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${clientGroqKey}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            model: "groq/compound-mini",
            messages: [
              { role: "system", content: ROM_SYSTEM_PROMPT },
              ...newMessages.map(m => ({
                role: m.role === "assistant" ? "assistant" : "user",
                content: m.content
              }))
            ],
            max_tokens: 1024
          })
        });

        if (groqRes.ok) {
          const groqData = await groqRes.json();
          replyContent = groqData.choices?.[0]?.message?.content || "";
        }
      } catch (groqErr) {
        console.warn("Direct Groq invocation error:", groqErr);
      }
    }

    // 3. Fallback to smart knowledge engine
    if (!replyContent) {
      replyContent = getRomFallbackReply(query);
    }

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: replyContent,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, assistantMessage]);
    if (!isOpen) setHasUnread(true);
    setIsLoading(false);
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSendMessage();
  };

  const clearChat = () => {
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content: "Chat cleared! What would you like to know about Ron?",
        timestamp: new Date()
      }
    ]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Floating Trigger Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center gap-3 px-4 py-3 bg-zinc-900 text-white rounded-full shadow-2xl hover:bg-black hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer border border-zinc-700/50"
            aria-label="Open AI Assistant RoM"
          >
            <div className="relative">
              <Bot className="w-5 h-5 text-blue-400 group-hover:rotate-12 transition-transform" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-zinc-900 animate-pulse" />
            </div>
            <div className="flex items-center gap-1.5 font-mono text-xs font-semibold tracking-wide">
              <span>Ask RoM</span>
              <Sparkles size={13} className="text-yellow-400" />
            </div>

            {hasUnread && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-blue-600 text-white text-[9px] rounded-full flex items-center justify-center font-bold">
                1
              </span>
            )}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Expandable Chat Dialog Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.2 }}
            className="w-[90vw] sm:w-[400px] h-[580px] max-h-[85vh] bg-white dark:bg-[#101622] border border-zinc-200/90 dark:border-zinc-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-zinc-900 dark:text-zinc-100 relative"
          >
            {/* Header */}
            <div className="p-4 px-5 bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200/80 dark:border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-zinc-900 dark:bg-zinc-800 text-white flex items-center justify-center shadow-xs relative">
                  <Bot size={18} className="text-blue-400" />
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white dark:border-zinc-900" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-sm text-zinc-900 dark:text-white font-mono">RoM</h3>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800 rounded">AI</span>
                  </div>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-mono">Ron&apos;s Assistant · AI</p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={clearChat}
                  className="p-1.5 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-200/60 dark:hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer"
                  title="Reset conversation"
                >
                  <RotateCcw size={15} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-200/60 dark:hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer"
                  title="Close chat"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Message Feed */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 custom-scrollbar bg-white dark:bg-[#0b0f19]">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "assistant" && (
                    <div className="w-7 h-7 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-700 flex items-center justify-center text-zinc-800 dark:text-zinc-200 shrink-0 mt-0.5">
                      <Bot size={14} className="text-blue-600 dark:text-blue-400" />
                    </div>
                  )}

                  <div
                    className={`max-w-[88%] px-4 py-3 rounded-2xl text-xs leading-relaxed overflow-hidden ${
                      msg.role === "user"
                        ? "bg-zinc-900 dark:bg-blue-600 text-white rounded-tr-xs"
                        : "bg-zinc-50 dark:bg-zinc-900/90 text-zinc-800 dark:text-zinc-200 border border-zinc-200/80 dark:border-zinc-800 rounded-tl-xs shadow-2xs"
                    }`}
                  >
                    {msg.role === "user" ? (
                      <div className="text-white whitespace-pre-wrap font-normal leading-relaxed">
                        {msg.content}
                      </div>
                    ) : (
                      <div 
                        className="space-y-1 overflow-x-auto custom-scrollbar text-zinc-800 dark:text-zinc-200"
                        dangerouslySetInnerHTML={{ 
                          __html: parseMarkdownToHtml(msg.content) 
                        }} 
                      />
                    )}
                    <div
                      className={`text-[9px] font-mono mt-1.5 ${
                        msg.role === "user" ? "text-zinc-300 dark:text-blue-200 text-right" : "text-zinc-400 dark:text-zinc-500"
                      }`}
                    >
                      {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </div>
                  </div>

                  {msg.role === "user" && (
                    <div className="w-7 h-7 rounded-lg bg-zinc-900 dark:bg-zinc-800 text-white flex items-center justify-center shrink-0 mt-0.5">
                      <User size={14} />
                    </div>
                  )}
                </div>
              ))}

              {/* Loading Typing Indicator */}
              {isLoading && (
                <div className="flex gap-2.5 justify-start items-center">
                  <div className="w-7 h-7 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-700 flex items-center justify-center text-zinc-800 dark:text-zinc-200 shrink-0">
                    <Bot size={14} className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="px-4 py-3 rounded-2xl rounded-tl-xs bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-500 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-500 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-500 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Starter Suggestions */}
            {messages.length <= 2 && (
              <div className="px-4 pb-2 pt-1 bg-white dark:bg-[#0b0f19] border-t border-zinc-100 dark:border-zinc-800">
                <div className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-2">Suggested Prompts</div>
                <div className="flex flex-wrap gap-1.5">
                  {STARTER_PROMPTS.map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => handleSendMessage(prompt)}
                      disabled={isLoading}
                      className="text-[11px] px-2.5 py-1 rounded-lg bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200/80 dark:border-zinc-800 transition-colors text-left font-mono cursor-pointer disabled:opacity-50"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Bar */}
            <form
              onSubmit={handleFormSubmit}
              className="p-3 bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask RoM anything about Ron..."
                disabled={isLoading}
                className="flex-1 px-3.5 py-2.5 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-400 transition-colors font-mono disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="p-2.5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl hover:bg-black dark:hover:bg-zinc-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shadow-xs"
                title="Send Message"
              >
                <Send size={15} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
