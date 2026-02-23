interface StatCardProps {
  label: string;
  value: string;
}

export function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="glass p-6 rounded-2xl border border-white/5 hover:border-nexus-accent/20 transition-all group">
      <div className="text-3xl font-bold text-white group-hover:text-nexus-accent transition-colors">{value}</div>
      <div className="text-[10px] uppercase tracking-widest text-nexus-muted mt-1">{label}</div>
    </div>
  );
}
