/**
 * Wraps a page so the page-scoped rules in globals.css apply.
 *
 * Each source page's <style> block is emitted under its own class, because the
 * pages declare conflicting rules and order their @media blocks differently —
 * merging them into one flat sheet silently changed which rule won. The class
 * on this wrapper is what selects a page's own CSS.
 *
 * `standard` covers Contact, FAQ and Pricing, whose style blocks are identical,
 * and `post` the three blog articles, which likewise share one.
 */
export type PageScope = 'landing' | 'about' | 'standard' | 'legal' | 'blog' | 'post' | 'industry';

const CLASS: Record<PageScope, string> = {
  landing: 'page-landing',
  about: 'page-about',
  standard: 'page-std',
  legal: 'legal-page',
  blog: 'page-blog',
  post: 'page-post',
  industry: 'page-ind',
};

export default function PageShell({
  scope,
  children,
}: {
  scope: PageScope;
  children: React.ReactNode;
}) {
  return (
    <div
      className={CLASS[scope]}
      style={{
        fontFamily: 'var(--font-body)',
        color: 'var(--color-text)',
        background: 'var(--color-bg)',
        minHeight: '100vh',
      }}
    >
      {children}
    </div>
  );
}
