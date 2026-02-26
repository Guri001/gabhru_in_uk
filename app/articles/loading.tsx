export default function LoadingArticles() {
  return (
    <main className="min-h-screen pt-32 pb-24 bg-background animate-pulse">
      <div className="container mx-auto px-6 max-w-7xl">
        <header className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-12 border-b border-white/5 pb-16">
          <div className="max-w-3xl w-full">
            <div className="h-16 w-80 bg-accent/10 rounded-sm mb-6" />
            <div className="h-6 w-full max-w-2xl bg-foreground/10 rounded-sm" />
          </div>
          
          <div className="flex items-center gap-4 shrink-0">
             <div className="w-14 h-14 rounded-full bg-foreground/10" />
             <div className="flex flex-col gap-2">
                <div className="h-5 w-32 bg-foreground/10" />
                <div className="h-3 w-20 bg-accent/10" />
             </div>
          </div>
        </header>

        {/* Tabs Skeleton */}
        <div className="flex flex-wrap gap-4 mb-16">
          {[1,2,3,4,5].map(i => (
            <div key={i} className="h-8 w-24 bg-foreground/10 rounded-full" />
          ))}
        </div>

        {/* Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {[1,2,3,4,5,6].map(i => (
            <div key={i} className="flex flex-col h-[450px] bg-background-secondary border border-transparent">
              <div className="w-full aspect-[4/3] bg-foreground/5" />
              <div className="p-8 flex flex-col pt-6">
                <div className="h-3 w-32 bg-foreground/10 mb-4" />
                <div className="h-8 w-full bg-foreground/10 mb-2" />
                <div className="h-8 w-3/4 bg-foreground/10 mb-6" />
                <div className="mt-auto h-4 w-full bg-foreground/5 mb-2" />
                <div className="h-4 w-2/3 bg-foreground/5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
