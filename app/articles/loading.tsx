export default function LoadingArticles() {
  return (
    <main className="min-h-screen pt-32 pb-24 bg-background animate-pulse">
      <div className="container mx-auto px-6 max-w-7xl">
        <header className="mb-16">
          <div className="h-16 w-64 bg-accent/10 rounded-sm mb-6" />
          <div className="h-6 w-full max-w-2xl bg-foreground/10 rounded-sm mb-2" />
          <div className="h-6 w-full max-w-xl bg-foreground/10 rounded-sm" />
        </header>

        {/* Tabs Skeleton */}
        <div className="flex gap-6 border-b border-accent/20 pb-4 mb-12">
          {[1,2,3,4,5].map(i => (
            <div key={i} className="h-6 w-24 bg-foreground/10 rounded-sm" />
          ))}
        </div>

        {/* Featured Skeleton */}
        <div className="w-full h-[500px] md:h-[600px] bg-background-card mb-12 border border-accent/10 relative">
          <div className="absolute bottom-12 left-12">
            <div className="h-6 w-32 bg-accent/20 mb-6" />
            <div className="h-12 w-[600px] bg-foreground/10 max-w-full mb-4" />
            <div className="h-12 w-[400px] bg-foreground/10 max-w-full mb-6" />
            <div className="h-4 w-48 bg-foreground/10" />
          </div>
        </div>

        {/* Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1,2,3,4,5,6].map(i => (
            <div key={i} className="flex flex-col h-[450px] bg-background-card border border-accent/10">
              <div className="w-full h-64 bg-foreground/5" />
              <div className="p-8 flex flex-col pt-6">
                <div className="h-3 w-32 bg-foreground/10 mb-4" />
                <div className="h-6 w-full bg-foreground/10 mb-2" />
                <div className="h-6 w-3/4 bg-foreground/10 mb-6" />
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
