interface StatCardProps {
  label: string;
  value: string;
}

export function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="bg-white dark:bg-[#121826] p-6 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 shadow-xs hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-md transition-all group">
      <div className="text-3xl font-bold text-zinc-900 dark:text-white group-hover:text-black dark:group-hover:text-blue-400 transition-colors font-mono">{value}</div>
      <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mt-1">{label}</div>
    </div>
  );
}
