import { contactLinks } from '../data/experience'
import { EmailIcon, Logo, githubPath, linkedinPath } from './icons'

const logos = {
  github: githubPath,
  linkedin: linkedinPath,
} as const

export function ContactButtons() {
  return (
    <div className="contact-buttons">
      {contactLinks.map((link) => {
        const external = link.href.startsWith('http')
        // Email scrolls to the contact form instead of opening a mail app.
        const href = link.icon === 'email' ? '#contact' : link.href
        return (
          <a
            key={link.label}
            className="contact-btn"
            href={href}
            target={external ? '_blank' : undefined}
            rel={external ? 'noreferrer' : undefined}
          >
            {link.icon === 'email' ? <EmailIcon /> : <Logo path={logos[link.icon]} size={16} />}
            {link.label}
            {external && <span aria-hidden="true">↗</span>}
          </a>
        )
      })}
    </div>
  )
}
