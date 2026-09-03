import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  BookOpen, 
  Plus, 
  Search, 
  Tag, 
  Calendar, 
  Clock, 
  Heart, 
  MessageSquare, 
  ArrowUpRight, 
  Sparkles,
  Loader2
} from "lucide-react";
import { BlogPost, isSupabaseConfigured, supabase, INITIAL_DEMO_POSTS, fetchPostBySlug } from "../../lib/supabase";
import { useAuth } from "../../contexts/AuthContext";
import { BlogPostView } from "./BlogPostView";
import { BlogEditorModal } from "./BlogEditorModal";

interface BlogSectionProps {
  initialSlug?: string | null;
  onPostSelect?: (post: BlogPost | null) => void;
}

export function BlogSection({ initialSlug, onPostSelect }: BlogSectionProps = {}) {
  const { isAdmin } = useAuth();

  const [posts, setPosts] = useState<BlogPost[]>(INITIAL_DEMO_POSTS);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string>("all");
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(() => {
    if (!initialSlug) return null;
    return INITIAL_DEMO_POSTS.find(p => p.slug.toLowerCase() === initialSlug.toLowerCase()) || null;
  });
  const [loadingSlugPost, setLoadingSlugPost] = useState<boolean>(() => {
    return Boolean(initialSlug && !INITIAL_DEMO_POSTS.some(p => p.slug.toLowerCase() === initialSlug.toLowerCase()));
  });

  // Editor Modal states
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  // Fetch posts from Supabase or fallback
  useEffect(() => {
    async function loadPosts() {
      if (!isSupabaseConfigured) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("posts")
          .select("*, author:profiles(*)")
          .order("created_at", { ascending: false });

        if (error) throw error;
        if (data && data.length > 0) {
          // Also fetch counts for likes and comments
          const postsWithCounts = await Promise.all(
            data.map(async (post) => {
              const [{ count: likesCount }, { count: commentsCount }] = await Promise.all([
                supabase.from("likes").select("*", { count: "exact", head: true }).eq("post_id", post.id),
                supabase.from("comments").select("*", { count: "exact", head: true }).eq("post_id", post.id)
              ]);
              return {
                ...post,
                likes_count: likesCount || 0,
                comments_count: commentsCount || 0
              };
            })
          );
          setPosts(postsWithCounts as BlogPost[]);
        }
      } catch (err) {
        console.warn("Supabase posts load warning:", err);
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, []);

  // Synchronize post selection when initialSlug changes (e.g. direct URL navigation)
  useEffect(() => {
    if (!initialSlug) {
      setSelectedPost(null);
      setLoadingSlugPost(false);
      return;
    }

    if (selectedPost && selectedPost.slug.toLowerCase() === initialSlug.toLowerCase()) {
      setLoadingSlugPost(false);
      return;
    }

    const foundInPosts = posts.find((p) => p.slug.toLowerCase() === initialSlug.toLowerCase());
    if (foundInPosts) {
      setSelectedPost(foundInPosts);
      setLoadingSlugPost(false);
      return;
    }

    let isMounted = true;
    setLoadingSlugPost(true);

    fetchPostBySlug(initialSlug).then((fetched) => {
      if (!isMounted) return;
      if (fetched) {
        setSelectedPost(fetched);
        setPosts((prev) => {
          if (prev.some((p) => p.id === fetched.id)) return prev;
          return [fetched, ...prev];
        });
      }
      setLoadingSlugPost(false);
    });

    return () => {
      isMounted = false;
    };
  }, [initialSlug, posts]);

  const handleSelectPost = (post: BlogPost | null) => {
    setSelectedPost(post);
    onPostSelect?.(post);
  };

  // Collect all unique tags
  const allTags = Array.from(
    new Set(posts.flatMap((p) => p.tags || []))
  );

  // Filter posts by search query and selected tag
  const filteredPosts = posts.filter((post) => {
    // If not admin, only show published posts
    if (!isAdmin && post.published === false) return false;

    const matchesTag =
      selectedTag === "all" || (post.tags && post.tags.includes(selectedTag));

    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      post.title.toLowerCase().includes(q) ||
      (post.excerpt && post.excerpt.toLowerCase().includes(q)) ||
      (post.tags && post.tags.some((t) => t.toLowerCase().includes(q)));

    return matchesTag && matchesSearch;
  });

  const handleOpenCreateModal = () => {
    setEditingPost(null);
    setIsEditorOpen(true);
  };

  const handleOpenEditModal = (post: BlogPost) => {
    setEditingPost(post);
    setIsEditorOpen(true);
  };

  const handleSaveSuccess = (savedPost: BlogPost, isNew: boolean) => {
    if (isNew) {
      setPosts((prev) => [savedPost, ...prev]);
    } else {
      setPosts((prev) => prev.map((p) => (p.id === savedPost.id ? savedPost : p)));
    }
    if (selectedPost && selectedPost.id === savedPost.id) {
      setSelectedPost(savedPost);
    }
  };

  const handleDeleteSuccess = (postId: string) => {
    setPosts((prev) => prev.filter((p) => p.id !== postId));
    if (selectedPost && selectedPost.id === postId) {
      handleSelectPost(null);
    }
  };

  if (loadingSlugPost) {
    return (
      <div className="w-full max-w-4xl py-24 flex flex-col items-center justify-center gap-3 text-zinc-400 font-mono text-xs">
        <Loader2 size={24} className="animate-spin text-blue-500" />
        <span>Loading article...</span>
      </div>
    );
  }

  // If a single post is active, render the dedicated post view
  if (selectedPost) {
    return (
      <>
        <BlogPostView
          post={selectedPost}
          onBack={() => handleSelectPost(null)}
          onEditPost={handleOpenEditModal}
          onDeletePost={handleDeleteSuccess}
        />

        <BlogEditorModal
          isOpen={isEditorOpen}
          onClose={() => setIsEditorOpen(false)}
          postToEdit={editingPost}
          onSaveSuccess={handleSaveSuccess}
          onDeleteSuccess={handleDeleteSuccess}
        />
      </>
    );
  }

  return (
    <motion.section
      key="blog"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="w-full max-w-4xl space-y-10"
    >
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
            <BookOpen size={15} />
            <span>Technical Insights & Engineering Notes</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white font-mono">
            Blog & Articles
          </h2>
          <p className="text-zinc-600 dark:text-zinc-300 text-base md:text-lg leading-relaxed max-w-2xl mt-2">
            In-depth writings on enterprise software design, full-stack architectures, real-time queues, and embedded IoT systems.
          </p>
        </div>

        {isAdmin && (
          <button
            onClick={handleOpenCreateModal}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-mono text-xs font-bold hover:bg-black dark:hover:bg-zinc-100 shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer shrink-0"
          >
            <Plus size={16} />
            <span>New Article</span>
          </button>
        )}
      </div>

      {/* Search Bar & Tag Filters */}
      <div className="space-y-4">
        <div className="relative">
          <Search size={16} className="absolute left-4 top-3.5 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles by title, topic, or keyword..."
            className="w-full pl-11 pr-4 py-3 bg-white dark:bg-[#121826] border border-zinc-200/80 dark:border-zinc-800 rounded-2xl text-xs text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-500 transition-colors font-mono shadow-2xs"
          />
        </div>

        {/* Tag Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <button
            onClick={() => setSelectedTag("all")}
            className={`px-3 py-1.5 rounded-xl font-mono text-xs font-medium transition-all cursor-pointer ${
              selectedTag === "all"
                ? "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold shadow-2xs"
                : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
            }`}
          >
            All ({posts.length})
          </button>

          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1.5 rounded-xl font-mono text-xs font-medium transition-all cursor-pointer ${
                selectedTag === tag
                  ? "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold shadow-2xs"
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Posts Grid Feed */}
      {loading ? (
        <div className="text-center py-16 text-zinc-400 font-mono text-xs flex items-center justify-center gap-2">
          <Loader2 size={18} className="animate-spin text-blue-500" />
          <span>Loading articles...</span>
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="p-12 text-center rounded-3xl border border-dashed border-zinc-200 dark:border-zinc-800 bg-white/40 dark:bg-zinc-900/40 text-zinc-500 font-mono text-xs space-y-2">
          <p>No articles found matching your criteria.</p>
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedTag("all");
              }}
              className="text-blue-600 dark:text-blue-400 underline cursor-pointer"
            >
              Clear filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-7">
          {filteredPosts.map((post, idx) => {
            const wordCount = post.content ? post.content.split(/\s+/).length : 0;
            const readingTime = Math.max(1, Math.ceil(wordCount / 200));

            return (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => handleSelectPost(post)}
                className="bg-white dark:bg-[#121826] rounded-3xl border border-zinc-200/80 dark:border-zinc-800 shadow-xs hover:border-zinc-400 dark:hover:border-zinc-600 hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group cursor-pointer"
              >
                <div>
                  {/* Cover Image */}
                  {post.cover_image && (
                    <div className="w-full aspect-[16/9] overflow-hidden bg-zinc-100 dark:bg-zinc-900 relative">
                      <img
                        src={post.cover_image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {!post.published && (
                        <span className="absolute top-3 left-3 px-2.5 py-1 bg-amber-500 text-white font-mono text-[10px] font-bold rounded-lg uppercase tracking-wider shadow-sm">
                          Draft
                        </span>
                      )}
                    </div>
                  )}

                  {/* Body Info */}
                  <div className="p-6 md:p-7 space-y-4">
                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-mono text-[10px] border border-zinc-200/80 dark:border-zinc-700 font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <h3 className="text-xl font-bold text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                      {post.title}
                    </h3>

                    {post.excerpt && (
                      <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                    )}
                  </div>
                </div>

                {/* Footer Metrics */}
                <div className="px-6 md:px-7 pb-6 pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Calendar size={13} />
                      <span>{new Date(post.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock size={13} />
                      <span>{readingTime}m read</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-zinc-600 dark:text-zinc-300">
                      <Heart size={13} className="text-rose-500" />
                      <span>{post.likes_count || 0}</span>
                    </span>
                    <span className="flex items-center gap-1 text-zinc-600 dark:text-zinc-300">
                      <MessageSquare size={13} />
                      <span>{post.comments_count || 0}</span>
                    </span>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      )}

      {/* Editor Modal for Admin */}
      <BlogEditorModal
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        postToEdit={editingPost}
        onSaveSuccess={handleSaveSuccess}
        onDeleteSuccess={handleDeleteSuccess}
      />
    </motion.section>
  );
}
