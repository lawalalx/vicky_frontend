export function SiteFooter(): React.JSX.Element {
  return (
    <footer className="border-t border-white/70 py-10">
      <div className="mx-auto max-w-7xl px-4 text-sm text-slate-500 sm:px-6 lg:px-8">
        <p className="text-center">
          &copy; {new Date().getFullYear()} Vikky. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
