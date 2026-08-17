export function SiteContentLoadingShell() {
  return (
    <div className="min-h-screen bg-background" aria-busy="true" aria-label="A carregar conteúdo da loja">
      <div className="max-w-[1440px] mx-auto p-4 md:p-6 space-y-6 animate-pulse">
        <div className="h-48 rounded-3xl bg-muted" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="h-28 rounded-2xl bg-muted" />
          <div className="h-28 rounded-2xl bg-muted" />
          <div className="h-28 rounded-2xl bg-muted" />
          <div className="h-28 rounded-2xl bg-muted" />
        </div>
        <div className="h-64 rounded-3xl bg-muted" />
      </div>
    </div>
  );
}
