type HeaderProps = {
  readonly onCreateClick: () => void;
  readonly onRefresh: () => void;
  readonly isRefreshing: boolean;
};

export function Header({ onCreateClick, onRefresh, isRefreshing }: HeaderProps) {
  return (
    <header className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-800 bg-surface-900/70 p-5">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-white">Admin Dashboard</h1>
        <p className="mt-1 text-sm text-slate-400">Manage blogs via your external CRM API.</p>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onRefresh}
          disabled={isRefreshing}
          className="inline-flex min-h-11 items-center rounded-lg border border-slate-700 px-4 text-sm font-medium text-slate-200 transition-colors hover:border-slate-600 hover:bg-surface-800 disabled:opacity-60"
        >
          {isRefreshing ? "Refreshing..." : "Refresh"}
        </button>

        <button
          type="button"
          onClick={onCreateClick}
          className="inline-flex min-h-11 items-center rounded-lg bg-brand-600 px-4 text-sm font-semibold text-white transition-colors hover:bg-brand-500"
        >
          New Blog
        </button>
      </div>
    </header>
  );
}
