import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Save, Eye, Edit3, Trash2, Image, Tag, AlertCircle, Loader2, Sparkles, Link as LinkIcon, Check, Copy } from "lucide-react";
import { BlogPost, isSupabaseConfigured, supabase, deleteBlogPost, unmarkPostAsDeleted } from "../../lib/supabase";
import { useAuth } from "../../contexts/AuthContext";
import { MarkdownRenderer } from "../ui/MarkdownRenderer";

interface BlogEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  postToEdit?: BlogPost | null;
  onSaveSuccess: (post: BlogPost, isNew: boolean) => void;
  onDeleteSuccess?: (postId: string) => void;
}

export function BlogEditorModal({
  isOpen,
  onClose,
  postToEdit,
  onSaveSuccess,
  onDeleteSuccess
}: BlogEditorModalProps) {
  const { user } = useAuth();
  const isEditing = Boolean(postToEdit);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [published, setPublished] = useState(true);
  const [viewMode, setViewMode] = useState<"write" | "preview">("write");

  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    if (postToEdit) {
      setTitle(postToEdit.title || "");
      setSlug(postToEdit.slug || "");
      setExcerpt(postToEdit.excerpt || "");
      setContent(postToEdit.content || "");
      setCoverImage(postToEdit.cover_image || "");
      setTagsInput(postToEdit.tags ? postToEdit.tags.join(", ") : "");
      setPublished(postToEdit.published ?? true);
    } else {
      setTitle("");
      setSlug("");
      setExcerpt("");
      setContent("");
      setCoverImage("");
      setTagsInput("Engineering, Systems");
      setPublished(true);
    }
    setErrorMsg("");
    setViewMode("write");
  }, [postToEdit, isOpen]);

  const generateSlug = (rawTitle: string) => {
    return rawTitle
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!isEditing) {
      setSlug(generateSlug(val));
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setErrorMsg("Title and content are required.");
      return;
    }

    setErrorMsg("");
    setLoading(true);

    const tagsArray = tagsInput
      .split(",")
      .map(t => t.trim())
      .filter(Boolean);

    const finalSlug = slug.trim() || generateSlug(title);

    const postPayload = {
      title: title.trim(),
      slug: finalSlug,
      excerpt: excerpt.trim(),
      content: content.trim(),
      cover_image: coverImage.trim() || undefined,
      tags: tagsArray,
      published,
      updated_at: new Date().toISOString()
    };

    try {
      if (isSupabaseConfigured) {
        if (isEditing && postToEdit) {
          const { data, error } = await supabase
            .from("posts")
            .update(postPayload)
            .eq("id", postToEdit.id)
            .select()
            .single();

          if (error) throw error;
          onSaveSuccess(data as BlogPost, false);
        } else {
          const { data, error } = await supabase
            .from("posts")
            .insert({
              ...postPayload,
              author_id: user?.id,
              created_at: new Date().toISOString()
            })
            .select()
            .single();

          if (error) throw error;
          unmarkPostAsDeleted(data.id, data.slug);
          onSaveSuccess(data as BlogPost, true);
        }
      } else {
        // Mock save for local demo
        const savedPost: BlogPost = {
          id: isEditing && postToEdit ? postToEdit.id : `post-${Date.now()}`,
          title: postPayload.title,
          slug: postPayload.slug,
          excerpt: postPayload.excerpt,
          content: postPayload.content,
          cover_image: postPayload.cover_image || "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
          tags: postPayload.tags,
          published: postPayload.published,
          author_id: user?.id,
          created_at: isEditing && postToEdit ? postToEdit.created_at : new Date().toISOString(),
          updated_at: new Date().toISOString(),
          likes_count: isEditing && postToEdit ? (postToEdit.likes_count || 0) : 0,
          comments_count: isEditing && postToEdit ? (postToEdit.comments_count || 0) : 0
        };
        unmarkPostAsDeleted(savedPost.id, savedPost.slug);
        onSaveSuccess(savedPost, !isEditing);
      }
      onClose();
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to save blog post.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!postToEdit || !window.confirm("Are you sure you want to delete this blog post? This action cannot be undone.")) {
      return;
    }

    setDeleting(true);
    setErrorMsg("");

    try {
      const result = await deleteBlogPost(postToEdit.id, postToEdit.slug);
      if (!result.success && result.error) {
        throw result.error;
      }
      if (onDeleteSuccess) {
        onDeleteSuccess(postToEdit.id);
      }
      onClose();
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to delete post.");
    } finally {
      setDeleting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 md:p-6 overflow-y-auto custom-scrollbar">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-md"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          className="relative w-full max-w-4xl bg-white dark:bg-[#111624] border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden z-10 text-zinc-900 dark:text-zinc-100"
        >
          {/* Header */}
          <div className="p-5 md:px-7 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/90 dark:bg-zinc-900/90 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 flex items-center justify-center font-bold">
                <Edit3 size={17} />
              </div>
              <div>
                <h3 className="text-lg font-bold font-mono">
                  {isEditing ? "Edit Blog Article" : "Create New Blog Article"}
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">
                  Markdown-enabled enterprise technical publishing
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {isEditing && (
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={deleting || loading}
                  className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-xl transition-colors cursor-pointer title='Delete post'"
                  title="Delete post"
                >
                  <Trash2 size={17} />
                </button>
              )}
              <button
                onClick={onClose}
                className="p-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-white rounded-xl hover:bg-zinc-200/60 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X size={19} />
              </button>
            </div>
          </div>

          {/* Form Container */}
          <form onSubmit={handleSave} className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-8 space-y-6">
            {errorMsg && (
              <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs flex items-center gap-2 font-mono">
                <AlertCircle size={15} className="shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Title & Slug */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 space-y-1.5 font-mono text-xs">
                <label className="text-zinc-600 dark:text-zinc-400 font-bold uppercase tracking-wider text-[11px]">
                  Post Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="e.g. Architecting Scalable ERP Platforms with Vue 3 & Laravel"
                  className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:border-zinc-900 dark:focus:border-white font-sans text-sm font-semibold"
                />
              </div>

              <div className="space-y-1.5 font-mono text-xs">
                <label className="text-zinc-600 dark:text-zinc-400 font-bold uppercase tracking-wider text-[11px]">
                  URL Slug
                </label>
                <input
                  type="text"
                  required
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="enterprise-hris-payroll"
                  className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:border-zinc-900 dark:focus:border-white font-mono text-xs"
                />
                <div className="flex items-center justify-between gap-1 text-[10px] font-mono text-zinc-500 dark:text-zinc-400 pt-0.5">
                  <span className="truncate">
                    ronmarquez.tech/<span className="text-blue-600 dark:text-blue-400 font-semibold">{slug.trim() || "slug"}</span>
                  </span>
                  {slug.trim() && (
                    <button
                      type="button"
                      onClick={() => {
                        const directUrl = typeof window !== "undefined"
                          ? `${window.location.origin}/${slug.trim()}`
                          : `https://ronmarquez.tech/${slug.trim()}`;
                        if (navigator.clipboard) {
                          navigator.clipboard.writeText(directUrl);
                          setCopiedLink(true);
                          setTimeout(() => setCopiedLink(false), 2000);
                        }
                      }}
                      className="inline-flex items-center gap-1 text-zinc-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer shrink-0"
                      title="Copy link"
                    >
                      {copiedLink ? <Check size={11} className="text-emerald-500" /> : <Copy size={11} />}
                      <span>{copiedLink ? "Copied" : "Copy"}</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Cover Image & Tags */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5 font-mono text-xs">
                <label className="text-zinc-600 dark:text-zinc-400 font-bold uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <Image size={13} />
                  <span>Cover Image URL</span>
                </label>
                <input
                  type="url"
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:border-zinc-900 dark:focus:border-white text-xs font-mono"
                />
              </div>

              <div className="space-y-1.5 font-mono text-xs">
                <label className="text-zinc-600 dark:text-zinc-400 font-bold uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <Tag size={13} />
                  <span>Tags (Comma-separated)</span>
                </label>
                <input
                  type="text"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="Systems, Architecture, Vue.js, Laravel"
                  className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:border-zinc-900 dark:focus:border-white text-xs font-mono"
                />
              </div>
            </div>

            {/* Excerpt */}
            <div className="space-y-1.5 font-mono text-xs">
              <label className="text-zinc-600 dark:text-zinc-400 font-bold uppercase tracking-wider text-[11px]">
                Brief Excerpt / Summary
              </label>
              <textarea
                rows={2}
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="A concise synopsis of the article for feed cards and SEO..."
                className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:border-zinc-900 dark:focus:border-white font-sans text-xs leading-relaxed"
              />
            </div>

            {/* Markdown Content Editor & Live Preview Switcher */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-zinc-600 dark:text-zinc-400 font-bold font-mono uppercase tracking-wider text-[11px]">
                  Article Content (Markdown) *
                </label>

                <div className="flex p-1 bg-zinc-100 dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 text-xs font-mono">
                  <button
                    type="button"
                    onClick={() => setViewMode("write")}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all cursor-pointer ${
                      viewMode === "write"
                        ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white font-bold shadow-xs"
                        : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                    }`}
                  >
                    <Edit3 size={12} />
                    <span>Write</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode("preview")}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all cursor-pointer ${
                      viewMode === "preview"
                        ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white font-bold shadow-xs"
                        : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                    }`}
                  >
                    <Eye size={12} />
                    <span>Preview</span>
                  </button>
                </div>
              </div>

              {viewMode === "write" ? (
                <textarea
                  rows={14}
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="## Introduction&#10;&#10;Write your technical article using markdown (headings, code blocks, lists, bold, etc.)..."
                  className="w-full p-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-2xl text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:border-zinc-900 dark:focus:border-white font-mono text-xs leading-relaxed custom-scrollbar"
                />
              ) : (
                <MarkdownRenderer
                  content={content || "*No content entered yet. Switch back to Write mode to type.*"}
                  className="min-h-[300px] max-h-[400px] overflow-y-auto p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 leading-relaxed text-sm prose dark:prose-invert max-w-none custom-scrollbar"
                />
              )}
            </div>

            {/* Publication Status Toggle */}
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800">
              <input
                type="checkbox"
                id="publishedCheckbox"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
              <label htmlFor="publishedCheckbox" className="font-mono text-xs text-zinc-800 dark:text-zinc-200 cursor-pointer select-none">
                <span className="font-bold">Publish Live</span> — Make this article visible to public visitors
              </label>
            </div>
          </form>

          {/* Footer Actions */}
          <div className="p-4 px-6 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/90 dark:bg-zinc-900/90 flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl font-mono text-xs border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSave}
              disabled={loading || deleting}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-mono text-xs font-bold bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-black dark:hover:bg-zinc-100 active:scale-95 transition-all cursor-pointer shadow-md disabled:opacity-50"
            >
              {loading ? (
                <Loader2 size={15} className="animate-spin" />
              ) : (
                <Save size={15} />
              )}
              <span>{isEditing ? "Update Article" : "Publish Post"}</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
