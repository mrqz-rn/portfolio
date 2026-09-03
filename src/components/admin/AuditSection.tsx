import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ShieldAlert, 
  Search, 
  RefreshCw, 
  Download, 
  Trash2, 
  Smartphone, 
  Monitor, 
  Tablet, 
  Clock, 
  Globe, 
  User, 
  Bot, 
  MessageSquare, 
  Check, 
  Copy, 
  Database, 
  ChevronDown, 
  ChevronUp, 
  ExternalLink,
  Filter,
  X,
  Lock,
  LogIn,
  Layers,
  Sparkles
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { 
  ChatbotLog, 
  fetchChatbotLogs, 
  deleteChatbotLog, 
  clearLocalChatbotLogs, 
  CHATBOT_LOGS_SQL_SCHEMA,
  isSupabaseConfigured 
} from "../../lib/supabase";

export function AuditSection() {
  const { user, isAdmin, openAuthModal } = useAuth();
  const [logs, setLogs] = useState<ChatbotLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fromSupabase, setFromSupabase] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [deviceFilter, setDeviceFilter] = useState<string>("all");
  const [providerFilter, setProviderFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<string>("all");
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  const [isSqlModalOpen, setIsSqlModalOpen] = useState(false);
  const [expandedLogId, setExpandedLogId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isSqlCopied, setIsSqlCopied] = useState(false);

  // Fetch audit logs
  const loadLogs = async () => {
    setIsLoading(true);
    try {
      const res = await fetchChatbotLogs();
      setLogs(res.logs);
      setFromSupabase(res.fromSupabase);
    } catch (e) {
      console.warn("Failed to load audit logs:", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      loadLogs();
    }
  }, [isAdmin]);

  // Handle single log deletion
  const handleDeleteLog = async (id: string) => {
    if (!confirm("Are you sure you want to delete this log entry?")) return;
    await deleteChatbotLog(id);
    setLogs(prev => prev.filter(l => l.id !== id));
  };

  // Handle clear all
  const handleClearAll = () => {
    if (!confirm("Clear all local cached logs? Supabase logs will remain if database is connected.")) return;
    clearLocalChatbotLogs();
    loadLogs();
  };

  // Copy helper
  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Copy SQL script
  const handleCopySql = () => {
    navigator.clipboard.writeText(CHATBOT_LOGS_SQL_SCHEMA);
    setIsSqlCopied(true);
    setTimeout(() => setIsSqlCopied(false), 2000);
  };

  // Filtered logs
  const filteredLogs = useMemo(() => {
    return logs.filter(log => {
      // 1. Search Query
      const q = searchQuery.toLowerCase().trim();
      if (q) {
        const matchesQuery = 
          log.user_message?.toLowerCase().includes(q) ||
          log.bot_response?.toLowerCase().includes(q) ||
          log.ip_address?.toLowerCase().includes(q) ||
          log.device?.toLowerCase().includes(q) ||
          log.user_email?.toLowerCase().includes(q) ||
          log.user_name?.toLowerCase().includes(q) ||
          log.session_id?.toLowerCase().includes(q);
        if (!matchesQuery) return false;
      }

      // 2. Device filter
      if (deviceFilter !== "all") {
        const devLower = (log.device || "").toLowerCase();
        if (deviceFilter === "mobile" && !devLower.includes("mobile")) return false;
        if (deviceFilter === "desktop" && !devLower.includes("desktop")) return false;
        if (deviceFilter === "tablet" && !devLower.includes("tablet")) return false;
      }

      // 3. Provider filter
      if (providerFilter !== "all") {
        const provLower = (log.provider || "").toLowerCase();
        if (!provLower.includes(providerFilter.toLowerCase())) return false;
      }

      // 4. Date filter
      if (dateFilter !== "all") {
        const logDate = new Date(log.created_at).getTime();
        const now = Date.now();
        if (dateFilter === "today" && now - logDate > 86400000) return false;
        if (dateFilter === "week" && now - logDate > 86400000 * 7) return false;
        if (dateFilter === "month" && now - logDate > 86400000 * 30) return false;
      }

      return true;
    });
  }, [logs, searchQuery, deviceFilter, providerFilter, dateFilter]);

  // Analytics Metrics
  const metrics = useMemo(() => {
    const total = logs.length;
    const uniqueSessions = new Set(logs.map(l => l.session_id)).size;
    const uniqueIps = new Set(logs.map(l => l.ip_address)).size;
    const mobileCount = logs.filter(l => (l.device || "").toLowerCase().includes("mobile")).length;
    const desktopCount = logs.filter(l => (l.device || "").toLowerCase().includes("desktop")).length;
    return {
      total,
      uniqueSessions,
      uniqueIps,
      mobileCount,
      desktopCount
    };
  }, [logs]);

  // Session messages for Transcript Modal
  const sessionMessages = useMemo(() => {
    if (!selectedSessionId) return [];
    return logs
      .filter(l => l.session_id === selectedSessionId)
      .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
  }, [logs, selectedSessionId]);

  // Export CSV
  const exportToCsv = () => {
    if (filteredLogs.length === 0) return;
    const headers = ["Timestamp", "Session ID", "IP Address", "Device", "User", "User Message", "Bot Response", "Provider"];
    const rows = filteredLogs.map(l => [
      `"${new Date(l.created_at).toLocaleString()}"`,
      `"${l.session_id}"`,
      `"${l.ip_address}"`,
      `"${(l.device || "").replace(/"/g, '""')}"`,
      `"${(l.user_email || l.user_name || "Anonymous").replace(/"/g, '""')}"`,
      `"${(l.user_message || "").replace(/"/g, '""')}"`,
      `"${(l.bot_response || "").replace(/"/g, '""')}"`,
      `"${l.provider || "ai"}"`
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `chatbot_audit_logs_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export JSON
  const exportToJson = () => {
    if (filteredLogs.length === 0) return;
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(filteredLogs, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `chatbot_audit_logs_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Helper for relative time
  const formatTimeAgo = (iso: string) => {
    const diff = Date.now() - new Date(iso).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "Just now";
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  // Device Icon Helper
  const renderDeviceIcon = (deviceStr: string) => {
    const d = (deviceStr || "").toLowerCase();
    if (d.includes("mobile")) return <Smartphone size={13} className="text-amber-500" />;
    if (d.includes("tablet")) return <Tablet size={13} className="text-purple-500" />;
    return <Monitor size={13} className="text-blue-500" />;
  };

  // -------------------------------------------------------------------------
  // Access Denied / Admin Gate
  // -------------------------------------------------------------------------
  if (!isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8">
        <div className="w-16 h-16 rounded-3xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center mb-6 shadow-sm">
          <Lock size={28} />
        </div>
        <h2 className="text-2xl font-bold font-mono text-zinc-900 dark:text-white tracking-tight mb-2">
          Admin Access Required
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-md mb-6 leading-relaxed">
          The Chatbot Audit Module contains sensitive visitor telemetry, IP tracking, and client message history. Please authenticate as an authorized administrator.
        </p>
        <button
          onClick={() => openAuthModal("signin")}
          className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-mono text-xs font-bold shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          <LogIn size={15} />
          <span>Sign In as Admin</span>
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Module Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-blue-500/10 text-blue-500 border border-blue-500/20">
              <ShieldAlert size={18} />
            </span>
            <h1 className="text-2xl font-bold font-mono tracking-tight text-zinc-900 dark:text-white">
              Chatbot Audit & Telemetry
            </h1>
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-bold border border-blue-200/60 dark:border-blue-800/60">
              Admin
            </span>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 font-mono">
            Inspect real-time visitor inquiries, client device fingerprints, IP addresses, and AI assistant responses.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setIsSqlModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs font-mono text-zinc-700 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-700/50 shadow-2xs transition-all cursor-pointer"
            title="View Supabase SQL Schema"
          >
            <Database size={13} className="text-emerald-500" />
            <span>SQL Schema</span>
          </button>

          <button
            onClick={exportToCsv}
            disabled={filteredLogs.length === 0}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs font-mono text-zinc-700 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-700/50 shadow-2xs transition-all disabled:opacity-40 cursor-pointer"
            title="Export filtered logs to CSV"
          >
            <Download size={13} />
            <span>Export CSV</span>
          </button>

          <button
            onClick={loadLogs}
            disabled={isLoading}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 text-white font-mono text-xs font-bold shadow-xs hover:bg-blue-700 active:scale-95 transition-all cursor-pointer"
          >
            <RefreshCw size={13} className={isLoading ? "animate-spin" : ""} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Database Connection Status Banner */}
      {!fromSupabase && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2.5 text-amber-700 dark:text-amber-400">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping shrink-0" />
            <span>
              <strong>Local Cache Active:</strong> Displaying locally captured chat logs. Run the Supabase SQL schema to sync logs directly to your cloud PostgreSQL instance.
            </span>
          </div>
          <button
            onClick={() => setIsSqlModalOpen(true)}
            className="px-3 py-1.5 rounded-lg bg-amber-500 text-white font-bold hover:bg-amber-600 transition-all shrink-0"
          >
            Setup Supabase Table
          </button>
        </div>
      )}

      {/* Analytics KPI Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-[#111624] border border-zinc-200/80 dark:border-zinc-800 shadow-xs">
          <div className="flex items-center justify-between text-zinc-400 mb-2">
            <span className="text-[11px] font-mono uppercase tracking-wider">Total Messages</span>
            <MessageSquare size={15} className="text-blue-500" />
          </div>
          <div className="text-2xl font-bold font-mono text-zinc-900 dark:text-white">
            {metrics.total}
          </div>
          <div className="text-[10px] text-zinc-500 mt-1 font-mono">Logged chat queries</div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#111624] border border-zinc-200/80 dark:border-zinc-800 shadow-xs">
          <div className="flex items-center justify-between text-zinc-400 mb-2">
            <span className="text-[11px] font-mono uppercase tracking-wider">Unique Sessions</span>
            <Layers size={15} className="text-indigo-500" />
          </div>
          <div className="text-2xl font-bold font-mono text-zinc-900 dark:text-white">
            {metrics.uniqueSessions}
          </div>
          <div className="text-[10px] text-zinc-500 mt-1 font-mono">Distinct conversations</div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#111624] border border-zinc-200/80 dark:border-zinc-800 shadow-xs">
          <div className="flex items-center justify-between text-zinc-400 mb-2">
            <span className="text-[11px] font-mono uppercase tracking-wider">Unique IPs</span>
            <Globe size={15} className="text-emerald-500" />
          </div>
          <div className="text-2xl font-bold font-mono text-zinc-900 dark:text-white">
            {metrics.uniqueIps}
          </div>
          <div className="text-[10px] text-zinc-500 mt-1 font-mono">Individual client hosts</div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#111624] border border-zinc-200/80 dark:border-zinc-800 shadow-xs">
          <div className="flex items-center justify-between text-zinc-400 mb-2">
            <span className="text-[11px] font-mono uppercase tracking-wider">Device Split</span>
            <Monitor size={15} className="text-purple-500" />
          </div>
          <div className="text-lg font-bold font-mono text-zinc-900 dark:text-white flex items-center gap-2">
            <span>{metrics.desktopCount} <span className="text-xs text-zinc-400 font-normal">Desk</span></span>
            <span>•</span>
            <span>{metrics.mobileCount} <span className="text-xs text-zinc-400 font-normal">Mob</span></span>
          </div>
          <div className="text-[10px] text-zinc-500 mt-1 font-mono">Client hardware mix</div>
        </div>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-[#111624] border border-zinc-200/80 dark:border-zinc-800 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search user query, bot response, IP address, device, or email..."
              className="w-full pl-9 pr-8 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-xs font-mono text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:border-blue-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
              >
                <X size={12} />
              </button>
            )}
          </div>

          {/* Device Filter */}
          <select
            value={deviceFilter}
            onChange={(e) => setDeviceFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-xs font-mono text-zinc-700 dark:text-zinc-200 focus:outline-none focus:border-blue-500 cursor-pointer"
          >
            <option value="all">All Devices</option>
            <option value="desktop">Desktop Only</option>
            <option value="mobile">Mobile Only</option>
            <option value="tablet">Tablet Only</option>
          </select>

          {/* Provider Filter */}
          <select
            value={providerFilter}
            onChange={(e) => setProviderFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-xs font-mono text-zinc-700 dark:text-zinc-200 focus:outline-none focus:border-blue-500 cursor-pointer"
          >
            <option value="all">All Providers</option>
            <option value="groq">Groq</option>
            <option value="gemini">Gemini</option>
            <option value="claude">Claude</option>
            <option value="knowledge">Knowledge Engine</option>
          </select>

          {/* Date Filter */}
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-xs font-mono text-zinc-700 dark:text-zinc-200 focus:outline-none focus:border-blue-500 cursor-pointer"
          >
            <option value="all">All Time</option>
            <option value="today">Today (24h)</option>
            <option value="week">Last 7 Days</option>
            <option value="month">Last 30 Days</option>
          </select>
        </div>

        {/* Results summary bar */}
        <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 dark:text-zinc-400 pt-1 border-t border-zinc-100 dark:border-zinc-800/80">
          <div>
            Showing <strong className="text-zinc-800 dark:text-zinc-200">{filteredLogs.length}</strong> of {logs.length} logged queries
          </div>
          {logs.length > 0 && (
            <button
              onClick={handleClearAll}
              className="text-red-500 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Trash2 size={11} />
              <span>Clear local cache</span>
            </button>
          )}
        </div>
      </div>

      {/* Audit Logs Table / Feed */}
      <div className="rounded-3xl border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-[#111624] overflow-hidden shadow-xs">
        {isLoading ? (
          <div className="py-20 flex flex-col items-center justify-center text-center">
            <RefreshCw size={24} className="animate-spin text-blue-500 mb-3" />
            <p className="text-xs font-mono text-zinc-500">Retrieving audit telemetry logs...</p>
          </div>
        ) : filteredLogs.length === 0 ? (
          <div className="py-20 flex flex-col items-center justify-center text-center p-6">
            <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-400 mb-3">
              <MessageSquare size={20} />
            </div>
            <h3 className="text-sm font-bold font-mono text-zinc-800 dark:text-zinc-200 mb-1">
              No Audit Logs Found
            </h3>
            <p className="text-xs font-mono text-zinc-500 max-w-sm">
              {searchQuery || deviceFilter !== "all" || providerFilter !== "all" || dateFilter !== "all"
                ? "No logs match the selected search criteria and filters."
                : "No chat messages have been recorded yet. Open the chatbot to send a test message."}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-zinc-200/70 dark:divide-zinc-800">
            {filteredLogs.map((log) => {
              const isExpanded = expandedLogId === log.id;

              return (
                <div 
                  key={log.id} 
                  className="p-4 md:p-5 hover:bg-zinc-50/60 dark:hover:bg-zinc-800/30 transition-colors"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-3">
                    {/* Visitor & Client Metadata Tags */}
                    <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                      {/* Timestamp */}
                      <span 
                        title={new Date(log.created_at).toLocaleString()}
                        className="inline-flex items-center gap-1 text-zinc-500 dark:text-zinc-400 text-[11px]"
                      >
                        <Clock size={12} />
                        <span>{formatTimeAgo(log.created_at)}</span>
                        <span className="text-zinc-300 dark:text-zinc-600">•</span>
                        <span>{new Date(log.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </span>

                      {/* Device Pill */}
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-[11px] font-medium border border-zinc-200/60 dark:border-zinc-700/60">
                        {renderDeviceIcon(log.device)}
                        <span className="truncate max-w-[200px]">{log.device || "Unknown Device"}</span>
                      </span>

                      {/* IP Address Pill */}
                      <button
                        onClick={() => handleCopy(log.ip_address, `ip-${log.id}`)}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 text-[11px] border border-blue-200/60 dark:border-blue-800/60 hover:bg-blue-100 transition-all cursor-pointer"
                        title="Click to copy IP"
                      >
                        <Globe size={11} />
                        <span>{log.ip_address || "127.0.0.1"}</span>
                        {copiedId === `ip-${log.id}` ? <Check size={10} /> : <Copy size={10} />}
                      </button>

                      {/* User Account / Visitor Tag */}
                      {log.user_email ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 text-[11px] border border-emerald-200/60 dark:border-emerald-800/60">
                          <User size={11} />
                          <span className="truncate max-w-[130px]">{log.user_email}</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800/80 text-zinc-500 text-[11px]">
                          <span>Visitor</span>
                        </span>
                      )}

                      {/* Provider Badge */}
                      <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-zinc-200/70 dark:bg-zinc-700/70 text-zinc-600 dark:text-zinc-300 font-bold">
                        {log.provider || "ai"}
                      </span>
                    </div>

                    {/* Right-side quick actions */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedSessionId(log.session_id)}
                        className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-xs font-mono transition-colors cursor-pointer"
                        title="View complete conversation session"
                      >
                        <MessageSquare size={12} className="text-blue-500" />
                        <span>View Session</span>
                      </button>

                      <button
                        onClick={() => handleDeleteLog(log.id)}
                        className="p-1.5 rounded-lg text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer"
                        title="Delete log entry"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>

                  {/* Message Content Bubble Comparison */}
                  <div className="space-y-2 mt-2">
                    {/* User Query */}
                    <div className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center shrink-0 mt-0.5 text-zinc-600 dark:text-zinc-300 text-[10px] font-bold">
                        U
                      </div>
                      <div className="flex-1 text-xs text-zinc-900 dark:text-zinc-100 font-medium leading-relaxed bg-zinc-50 dark:bg-zinc-800/50 p-3 rounded-2xl border border-zinc-200/60 dark:border-zinc-700/50">
                        {log.user_message}
                      </div>
                    </div>

                    {/* Bot Response */}
                    <div className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                        <Bot size={11} />
                      </div>
                      <div className="flex-1 text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed bg-blue-50/40 dark:bg-blue-950/20 p-3 rounded-2xl border border-blue-100/60 dark:border-blue-900/30">
                        <div className={isExpanded ? "" : "line-clamp-2"}>
                          {log.bot_response || "(Empty response)"}
                        </div>
                        {log.bot_response && log.bot_response.length > 140 && (
                          <button
                            onClick={() => setExpandedLogId(isExpanded ? null : log.id)}
                            className="text-blue-600 dark:text-blue-400 text-[11px] font-mono font-semibold mt-1 flex items-center gap-0.5 hover:underline cursor-pointer"
                          >
                            <span>{isExpanded ? "Show less" : "Read full response"}</span>
                            {isExpanded ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* --------------------------------------------------------------------- */}
      {/* Session Conversation Modal */}
      {/* --------------------------------------------------------------------- */}
      <AnimatePresence>
        {selectedSessionId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-[#0f1422] rounded-3xl border border-zinc-200 dark:border-zinc-800 w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-5 border-b border-zinc-200 dark:border-zinc-800">
                <div>
                  <div className="flex items-center gap-2">
                    <MessageSquare size={16} className="text-blue-500" />
                    <h3 className="font-bold font-mono text-sm text-zinc-900 dark:text-white">
                      Conversation Session
                    </h3>
                  </div>
                  <div className="text-[11px] font-mono text-zinc-400 mt-0.5">
                    Session ID: <code className="text-zinc-600 dark:text-zinc-300">{selectedSessionId}</code> ({sessionMessages.length} exchanges)
                  </div>
                </div>
                <button
                  onClick={() => setSelectedSessionId(null)}
                  className="p-1.5 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Messages Thread */}
              <div className="p-6 overflow-y-auto space-y-4 flex-1 custom-scrollbar">
                {sessionMessages.map((msg, idx) => (
                  <div key={idx} className="space-y-3 pb-4 border-b border-zinc-100 dark:border-zinc-800/60 last:border-0">
                    {/* User Prompt */}
                    <div className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-xl bg-zinc-900 text-white flex items-center justify-center text-xs font-mono font-bold shrink-0">
                        U
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-400 mb-1">
                          <span>User</span>
                          <span>•</span>
                          <span>{new Date(msg.created_at).toLocaleTimeString()}</span>
                        </div>
                        <div className="p-3.5 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-xs font-sans text-zinc-900 dark:text-white leading-relaxed">
                          {msg.user_message}
                        </div>
                      </div>
                    </div>

                    {/* RoM Assistant Reply */}
                    <div className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
                        <Bot size={14} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-400 mb-1">
                          <span>RoM AI ({msg.provider || "assistant"})</span>
                          <span>•</span>
                          <span>{new Date(msg.created_at).toLocaleTimeString()}</span>
                        </div>
                        <div className="p-3.5 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-100/60 dark:border-blue-900/40 text-xs font-sans text-zinc-800 dark:text-zinc-200 leading-relaxed whitespace-pre-wrap">
                          {msg.bot_response}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Modal Footer */}
              <div className="p-4 bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 flex justify-end">
                <button
                  onClick={() => setSelectedSessionId(null)}
                  className="px-4 py-2 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-mono text-xs font-bold cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --------------------------------------------------------------------- */}
      {/* Supabase SQL DDL Modal */}
      {/* --------------------------------------------------------------------- */}
      <AnimatePresence>
        {isSqlModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-[#0f1422] rounded-3xl border border-zinc-200 dark:border-zinc-800 w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-5 border-b border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center gap-2">
                  <Database size={16} className="text-emerald-500" />
                  <h3 className="font-bold font-mono text-sm text-zinc-900 dark:text-white">
                    Supabase SQL Schema & RLS Setup
                  </h3>
                </div>
                <button
                  onClick={() => setIsSqlModalOpen(false)}
                  className="p-1.5 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Instructions */}
              <div className="p-6 overflow-y-auto space-y-4 flex-1 custom-scrollbar">
                <p className="text-xs text-zinc-600 dark:text-zinc-300 font-mono leading-relaxed">
                  To persist all visitor device, IP, and chat logs directly into your cloud Supabase database, copy the SQL below and run it in your <strong>Supabase Dashboard &gt; SQL Editor</strong>:
                </p>

                <div className="relative">
                  <pre className="p-4 rounded-2xl bg-zinc-900 text-zinc-100 font-mono text-[11px] overflow-x-auto leading-relaxed border border-zinc-800 custom-scrollbar">
                    <code>{CHATBOT_LOGS_SQL_SCHEMA}</code>
                  </pre>
                  <button
                    onClick={handleCopySql}
                    className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-mono transition-all cursor-pointer border border-zinc-700"
                  >
                    {isSqlCopied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                    <span>{isSqlCopied ? "Copied!" : "Copy SQL"}</span>
                  </button>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 flex justify-between items-center">
                <button
                  onClick={handleCopySql}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 text-white font-mono text-xs font-bold shadow-xs hover:bg-blue-700 active:scale-95 transition-all cursor-pointer"
                >
                  {isSqlCopied ? <Check size={13} /> : <Copy size={13} />}
                  <span>{isSqlCopied ? "Copied to Clipboard!" : "Copy Schema"}</span>
                </button>
                <button
                  onClick={() => setIsSqlModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-mono text-xs font-bold cursor-pointer"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
