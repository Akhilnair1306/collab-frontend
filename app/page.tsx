import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 dark:bg-black dark:text-zinc-100">
      {/* Header */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <h1 className="text-lg font-semibold tracking-tight">Notes</h1>
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/login" className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100">
            Login
          </Link>
          <Link
            href="/signup"
            className="rounded-md bg-zinc-900 px-4 py-2 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-black dark:hover:bg-zinc-200"
          >
            Get started
          </Link>
        </nav>
      </header>

      {/* Hero */}
      <main className="mx-auto max-w-6xl px-6">
        <section className="py-24">
          <h2 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            A fast, collaborative place to think and write.
          </h2>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Create notes, collaborate in real-time, and share ideas effortlessly.
            Built for focus, not clutter.
          </p>

          <div className="mt-10 flex items-center gap-4">
            <Link
              href="/signup"
              className="rounded-md bg-zinc-900 px-6 py-3 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-black dark:hover:bg-zinc-200"
            >
              Start writing
            </Link>

            <Link
              href="/login"
              className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              Sign in →
            </Link>
          </div>
        </section>

        {/* Features */}
        <section className="border-t border-zinc-200 py-20 dark:border-zinc-800">
          <div className="grid gap-12 sm:grid-cols-3">
            <div>
              <h3 className="text-lg font-medium">Real-time collaboration</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                Work together instantly. See edits and presence as they happen.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium">Role-based access</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                Control who can view or edit your notes with simple permissions.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium">Shareable links</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                Share read-only notes securely with a single link.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24">
          <div className="rounded-xl border border-zinc-200 p-12 dark:border-zinc-800">
            <h3 className="text-2xl font-semibold tracking-tight">
              Start writing today
            </h3>
            <p className="mt-3 max-w-xl text-zinc-600 dark:text-zinc-400">
              No distractions. No learning curve. Just a clean space to think.
            </p>

            <div className="mt-8">
              <Link
                href="/signup"
                className="inline-flex rounded-md bg-zinc-900 px-6 py-3 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-black dark:hover:bg-zinc-200"
              >
                Create your workspace
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 py-8 text-center text-sm text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
        © {new Date().getFullYear()} Notes. Built for focus.
      </footer>
    </div>
  );
}
