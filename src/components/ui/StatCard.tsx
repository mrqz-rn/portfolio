interface StatCardProps {
  label: string;
  value: string;
}

export function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-xs hover:border-zinc-300 hover:shadow-md transition-all group">
      <div className="text-3xl font-bold text-zinc-900 group-hover:text-black transition-colors font-mono">{value}</div>
      <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 mt-1">{label}</div>
    </div>
  );
}
