import OsintSearch from "@/components/osint-search"
import { ThemeToggle } from "@/components/theme-toggle"
import Footer from "@/components/ui/footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gradient-to-b from-zinc-50 to-zinc-300 dark:bg-gradient-to-bl dark:from-zinc-800 dark:to-zinc-950 relative overflow-hidden transition-all">
      <div className="w-full max-w-3xl space-y-8 relative z-10 py-20">
        <div className="text-center space-y-3">
          <h1 className="text-6xl font-bold tracking-tighter md:text-5xl text-zinc-900 dark:text-zinc-100 transition-all">
            OSINT Tool
          </h1>
          <p className="text-zinc-600 dark:text-zinc-300 md:text-lg transition-all">Search for information across various platforms</p>
        </div>
        <OsintSearch />
        <Footer />
      </div>
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
    </main>
  )
}

