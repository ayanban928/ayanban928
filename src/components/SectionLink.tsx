import { Logo, githubPath, linkedinPath } from './icons'
import type { ReactNode } from 'react'

const icons = {
  linkedin: linkedinPath,
  github: githubPath,
} as const

type SectionLinkProps = {
  href: string
  service: keyof typeof icons
  label: string
  children: ReactNode
}

// Heading link with a tooltip that shows the service logo on hover.
export function SectionLink({ href, service, label, children }: SectionLinkProps) {
  return (
    <a className="section-title-link" href={href} target="_blank" rel="noreferrer">
      {children}
      <span className="tip" aria-hidden="true">
        {label}
        <Logo path={icons[service]} />
        ↗
      </span>
    </a>
  )
}
