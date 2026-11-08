import type { ReactNode } from 'react'

const year = new Date().getFullYear()

export function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <header className="nav">
        <nav className="nav-inner" aria-label="Main">
          <a href="#top" className="wordmark">
            Ayan
          </a>
          <div className="nav-links">
            <a href="#experience">Experience</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </div>
        </nav>
      </header>

      {children}

      <footer className="footer">
        <p>© {year} Ayan Banerjee</p>
      </footer>
    </>
  )
}
