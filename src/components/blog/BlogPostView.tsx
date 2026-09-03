import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  ArrowLeft, 
  Heart, 
  MessageSquare, 
  Calendar, 
  Clock, 
  Edit3, 
  Trash2, 
  Send, 
  User as UserIcon, 
  Share2, 
  Check, 
  Loader2,
  LogIn,
  Link as LinkIcon
} from "lucide-react";
import { BlogPost, PostComment, isSupabaseConfigured, supabase } from "../../lib/supabase";
import { useAuth } from "../../contexts/AuthContext";
import { MarkdownRenderer } from "../ui/MarkdownRenderer";

interface BlogPostViewProps {
  post: BlogPost;
  onBack: () => void;
  onEditPost?: (post: BlogPost) => void;
  onDeletePost?: (postId: string) => void;
}

export function BlogPostView({
  post,
  onBack,
  onEditPost,
  onDeletePost
}: BlogPostViewProps) {
  const { user, profile, isAdmin, openAuthModal } = useAuth();

  const [likesCount, setLikesCount] = useState(post.likes_count || 0);
  const [hasLiked, setHasLiked] = useState(post.user_has_liked || false);
  const [likeLoading, setLikeLoading] = useState(false);

  const [comments, setComments] = useState<PostComment[]>([]);
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [commentInput, setCommentInput] = useState("");
  const [submittingComment, setSubmittingComment] = useState(false);
  const [copied, setCopied] = useState(false);

  // Synchronize document title and description with the post for dynamic navigation
  useEffect(() => {
    const originalTitle = document.title;
    document.title = `${post.title} | Ron Marquez`;

    const descMeta = document.querySelector('meta[name="description"]');
    const ogTitleMeta = document.querySelector('meta[property="og:title"]');
    const ogDescMeta = document.querySelector('meta[property="og:description"]');
    const ogUrlMeta = document.querySelector('meta[property="og:url"]');

    const originalDesc = descMeta?.getAttribute("content") || "";
    const originalOgTitle = ogTitleMeta?.getAttribute("content") || "";
    const originalOgDesc = ogDescMeta?.getAttribute("content") || "";
    const originalOgUrl = ogUrlMeta?.getAttribute("content") || "";

    const postUrl = typeof window !== "undefined"
      ? `${window.location.origin}/${post.slug}`
      : `https://ronmarquez.tech/${post.slug}`;

    if (descMeta && post.excerpt) descMeta.setAttribute("content", post.excerpt);
    if (ogTitleMeta) ogTitleMeta.setAttribute("content", `${post.title} | Ron Marquez`);
    if (ogDescMeta && post.excerpt) ogDescMeta.setAttribute("content", post.excerpt);
    if (ogUrlMeta) ogUrlMeta.setAttribute("content", postUrl);

    return () => {
      document.title = originalTitle;
      if (descMeta) descMeta.setAttribute("content", originalDesc);
      if (ogTitleMeta) ogTitleMeta.setAttribute("content", originalOgTitle);
      if (ogDescMeta) ogDescMeta.setAttribute("content", originalOgDesc);
      if (ogUrlMeta) ogUrlMeta.setAttribute("content", originalOgUrl);
    };
  }, [post.title, post.excerpt, post.slug]);

  // Calculate estimated reading time
  const wordCount = post.content ? post.content.split(/\s+/).length : 0;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  // Fetch comments and like status
  useEffect(() => {
    let isMounted = true;

    async function loadPostData() {
      if (!isSupabaseConfigured) {
        // Mock sample comments
        if (isMounted) {
          setComments([
            {
              id: "demo-c-1",
              post_id: post.id,
              user_id: "demo-user-1",
              content: "Great breakdown of the architecture! The database indexing tips are super helpful.",
              created_at: new Date(Date.now() - 3600000 * 4).toISOString(),
              user: {
                id: "demo-user-1",
                email: "alex@example.com",
                full_name: "Alex Rivera",
                role: "user",
                avatar_url: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80",
                created_at: new Date().toISOString()
              }
            },
            {
              id: "demo-c-2",
              post_id: post.id,
              user_id: "demo-user-2",
              content: "Looking forward to implementing similar WebSocket queue broadcasts in our stack.",
              created_at: new Date(Date.now() - 3600000 * 12).toISOString(),
              user: {
                id: "demo-user-2",
                email: "sarah@example.com",
                full_name: "Sarah Chen",
                role: "user",
                avatar_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
                created_at: new Date().toISOString()
              }
            }
          ]);
          setCommentsLoading(false);
        }
        return;
      }

      try {
        // Fetch comments with author profile
        const { data: commentsData } = await supabase
          .from("comments")
          .select("*, user:profiles(*)")
          .eq("post_id", post.id)
          .order("created_at", { ascending: true });

        if (isMounted && commentsData) {
          setComments(commentsData as PostComment[]);
        }

        // Fetch like count
        const { count: likeCount } = await supabase
          .from("likes")
          .select("*", { count: "exact", head: true })
          .eq("post_id", post.id);

        if (isMounted && typeof likeCount === "number") {
          setLikesCount(likeCount);
        }

        // Check if current user liked
        if (user) {
          const { data: userLike } = await supabase
            .from("likes")
            .select("id")
            .eq("post_id", post.id)
            .eq("user_id", user.id)
            .maybeSingle();

          if (isMounted) {
            setHasLiked(Boolean(userLike));
          }
        }
      } catch (err) {
        console.warn("Post data fetch warning:", err);
      } finally {
        if (isMounted) setCommentsLoading(false);
      }
    }

    loadPostData();
    return () => {
      isMounted = false;
    };
  }, [post.id, user]);

  const handleToggleLike = async () => {
    if (!user) {
      openAuthModal("signin");
      return;
    }

    if (likeLoading) return;
    setLikeLoading(true);

    const prevLiked = hasLiked;
    const prevCount = likesCount;

    // Optimistic UI update
    setHasLiked(!prevLiked);
    setLikesCount(prevLiked ? Math.max(0, prevCount - 1) : prevCount + 1);

    if (isSupabaseConfigured) {
      try {
        if (prevLiked) {
          await supabase
            .from("likes")
            .delete()
            .eq("post_id", post.id)
            .eq("user_id", user.id);
        } else {
          await supabase
            .from("likes")
            .insert({
              post_id: post.id,
              user_id: user.id,
              created_at: new Date().toISOString()
            });
        }
      } catch (err) {
        // Revert on error
        setHasLiked(prevLiked);
        setLikesCount(prevCount);
      }
    }

    setLikeLoading(false);
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      openAuthModal("signin");
      return;
    }

    const trimmed = commentInput.trim();
    if (!trimmed || submittingComment) return;

    setSubmittingComment(true);

    try {
      if (isSupabaseConfigured) {
        const { data, error } = await supabase
          .from("comments")
          .insert({
            post_id: post.id,
            user_id: user.id,
            content: trimmed,
            created_at: new Date().toISOString()
          })
          .select("*, user:profiles(*)")
          .single();

        if (error) throw error;
        if (data) {
          setComments(prev => [...prev, data as PostComment]);
        }
      } else {
        // Local demo comment
        const newMockComment: PostComment = {
          id: `comment-${Date.now()}`,
          post_id: post.id,
          user_id: user.id,
          content: trimmed,
          created_at: new Date().toISOString(),
          user: profile || {
            id: user.id,
            email: user.email || "",
            full_name: user.user_metadata?.full_name || "You",
            avatar_url: user.user_metadata?.avatar_url || "",
            role: isAdmin ? "admin" : "user",
            created_at: new Date().toISOString()
          }
        };
        setComments(prev => [...prev, newMockComment]);
      }
      setCommentInput("");
    } catch (err: any) {
      alert("Failed to submit comment. Please try again.");
    } finally {
      setSubmittingComment(false);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!window.confirm("Delete this comment?")) return;

    setComments(prev => prev.filter(c => c.id !== commentId));

    if (isSupabaseConfigured) {
      try {
        await supabase.from("comments").delete().eq("id", commentId);
      } catch (err) {
        console.warn("Delete comment error:", err);
      }
    }
  };

  const postUrl = typeof window !== "undefined"
    ? `${window.location.origin}/${post.slug}`
    : `https://ronmarquez.tech/${post.slug}`;

  const handleShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share && /mobile|android|iphone|ipad/i.test(navigator.userAgent)) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt || post.title,
          url: postUrl
        });
        return;
      } catch (err) {
        // Fallback to clipboard
      }
    }

    if (navigator.clipboard) {
      await navigator.clipboard.writeText(postUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="w-full max-w-4xl space-y-10"
    >
      {/* Top Bar Navigation & Actions */}
      <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 font-mono text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors cursor-pointer group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span>BACK TO ALL POSTS</span>
        </button>

        <div className="flex items-center gap-2">
          {/* Direct Link Pill */}
          <button
            onClick={handleShare}
            title={`Copy direct link: ${postUrl}`}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-300 font-mono text-xs font-semibold border border-zinc-200/70 dark:border-zinc-700/70 transition-all cursor-pointer group"
          >
            <LinkIcon size={12} className="text-zinc-400 group-hover:text-blue-500 transition-colors" />
            <span className="text-zinc-400 font-normal select-none">/</span>
            <span className="truncate max-w-[140px] md:max-w-[200px]">{post.slug}</span>
          </button>

          {isAdmin && onEditPost && (
            <button
              onClick={() => onEditPost(post)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 font-mono text-xs font-semibold transition-colors cursor-pointer"
            >
              <Edit3 size={13} />
              <span>Edit Post</span>
            </button>
          )}

          {isAdmin && onDeletePost && (
            <button
              onClick={() => onDeletePost(post.id)}
              className="p-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-xl transition-colors cursor-pointer"
              title="Delete Post"
            >
              <Trash2 size={16} />
            </button>
          )}

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-mono text-xs font-semibold transition-colors cursor-pointer"
            title="Share article link"
          >
            {copied ? <Check size={13} className="text-emerald-500" /> : <Share2 size={13} />}
            <span>{copied ? "Copied" : "Share"}</span>
          </button>
        </div>
      </div>

      {/* Article Header */}
      <header className="space-y-5">
        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map(tag => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800 font-mono text-[11px] font-semibold uppercase tracking-wider"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white font-mono leading-tight">
          {post.title}
        </h1>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-500 dark:text-zinc-400 pt-1">
          <div className="flex items-center gap-2 font-medium text-zinc-900 dark:text-zinc-200">
            <div className="w-7 h-7 rounded-full bg-zinc-900 dark:bg-zinc-800 text-white flex items-center justify-center font-bold text-[10px] overflow-hidden">
              <img src="/icons/user.webp" alt="Ron Marquez" className="w-full h-full object-cover" />
            </div>
            <span>Ron Marquez</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1.5">
            <Calendar size={14} />
            <span>{new Date(post.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1.5">
            <Clock size={14} />
            <span>{readingTime} min read</span>
          </div>
        </div>

        {/* Cover Image */}
        {post.cover_image && (
          <div className="w-full aspect-[21/9] rounded-3xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-md">
            <img
              src={post.cover_image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </header>

      {/* Article Content (Rendered Markdown with Mermaid Diagrams) */}
      <MarkdownRenderer
        content={post.content}
        className="space-y-4 text-zinc-800 dark:text-zinc-200 leading-relaxed text-base prose dark:prose-invert max-w-none pt-4 border-t border-zinc-100 dark:border-zinc-800"
      />

      {/* Like & Interaction Bar */}
      <div className="flex items-center justify-between p-6 rounded-3xl bg-white dark:bg-[#121826] border border-zinc-200/80 dark:border-zinc-800 shadow-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={handleToggleLike}
            disabled={likeLoading}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-mono text-xs font-bold transition-all cursor-pointer active:scale-95 border ${
              hasLiked
                ? "bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-800 shadow-xs"
                : "bg-zinc-50 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700 hover:border-rose-300 dark:hover:border-rose-800"
            }`}
          >
            <Heart size={16} className={`transition-transform ${hasLiked ? "fill-rose-500 text-rose-500 scale-110" : ""}`} />
            <span>{likesCount} {likesCount === 1 ? "Like" : "Likes"}</span>
          </button>

          <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-700/80 font-mono text-xs text-zinc-600 dark:text-zinc-400 font-semibold">
            <MessageSquare size={15} />
            <span>{comments.length} Comments</span>
          </div>
        </div>

        {!user && (
          <button
            onClick={() => openAuthModal("signin")}
            className="flex items-center gap-1.5 font-mono text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors cursor-pointer"
          >
            <LogIn size={14} />
            <span>Sign in to comment</span>
          </button>
        )}
      </div>

      {/* Comments Section */}
      <section className="space-y-8 pt-4">
        <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
          <h3 className="text-xl font-bold font-mono text-zinc-900 dark:text-white flex items-center gap-2">
            <span>Comments</span>
            <span className="text-sm font-normal text-zinc-400 font-mono">({comments.length})</span>
          </h3>
        </div>

        {/* Add Comment Input Form */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#121826] border border-zinc-200/80 dark:border-zinc-800 shadow-xs">
          {user ? (
            <form onSubmit={handleAddComment} className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-zinc-900 dark:bg-zinc-800 text-white flex items-center justify-center font-bold font-mono text-xs overflow-hidden">
                  {profile?.avatar_url ? (
                    <img src={profile.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <UserIcon size={14} />
                  )}
                </div>
                <div>
                  <div className="font-mono text-xs font-bold text-zinc-900 dark:text-white">
                    {profile?.full_name || user.email?.split("@")[0]}
                  </div>
                  <div className="font-mono text-[10px] text-zinc-400">{user.email}</div>
                </div>
              </div>

              <textarea
                rows={3}
                required
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                placeholder="Share your thoughts, feedback, or ask a technical question..."
                className="w-full p-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-2xl text-xs text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:border-zinc-900 dark:focus:border-white leading-relaxed font-sans"
              />

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={submittingComment || !commentInput.trim()}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-mono text-xs font-bold bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-black dark:hover:bg-zinc-100 active:scale-95 transition-all cursor-pointer shadow-sm disabled:opacity-40"
                >
                  {submittingComment ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
                  <span>Post Comment</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center py-6 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto">
                <MessageSquare size={22} />
              </div>
              <div>
                <h4 className="font-bold text-base text-zinc-900 dark:text-white font-mono">Join the Discussion</h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 max-w-sm mx-auto leading-relaxed">
                  Sign in with your Email or Google account to leave comments and connect with other developers.
                </p>
              </div>
              <button
                type="button"
                onClick={() => openAuthModal("signin")}
                className="px-6 py-3 rounded-2xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-mono text-xs font-bold hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-md inline-flex items-center gap-2"
              >
                <LogIn size={15} />
                <span>Sign in or Register</span>
              </button>
            </div>
          )}
        </div>

        {/* Comment Feed */}
        <div className="space-y-4">
          {commentsLoading ? (
            <div className="text-center py-8 text-zinc-400 font-mono text-xs flex items-center justify-center gap-2">
              <Loader2 size={16} className="animate-spin" />
              <span>Loading comments...</span>
            </div>
          ) : comments.length === 0 ? (
            <div className="p-8 text-center rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800 text-zinc-500 font-mono text-xs">
              No comments yet. Be the first to leave a comment!
            </div>
          ) : (
            comments.map((comment) => {
              const isCommentAuthor = user && user.id === comment.user_id;
              const canDelete = isCommentAuthor || isAdmin;

              return (
                <div
                  key={comment.id}
                  className="p-5 rounded-2xl bg-white dark:bg-[#121826] border border-zinc-200/80 dark:border-zinc-800 shadow-2xs space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 flex items-center justify-center font-bold text-xs overflow-hidden border border-zinc-200 dark:border-zinc-700">
                        {comment.user?.avatar_url ? (
                          <img src={comment.user.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                        ) : (
                          <UserIcon size={14} />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-zinc-900 dark:text-white">
                            {comment.user?.full_name || "Community Member"}
                          </span>
                          {comment.user?.role === "admin" && (
                            <span className="px-1.5 py-0.2 bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-300 font-mono text-[9px] font-bold rounded border border-blue-200 dark:border-blue-800">
                              AUTHOR
                            </span>
                          )}
                        </div>
                        <div className="font-mono text-[10px] text-zinc-400">
                          {new Date(comment.created_at).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit"
                          })}
                        </div>
                      </div>
                    </div>

                    {canDelete && (
                      <button
                        onClick={() => handleDeleteComment(comment.id)}
                        className="p-1.5 text-zinc-400 hover:text-red-600 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                        title="Delete comment"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>

                  <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed pl-11">
                    {comment.content}
                  </p>
                </div>
              );
            })
          )}
        </div>
      </section>
    </motion.article>
  );
}
