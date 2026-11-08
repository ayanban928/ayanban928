import type { FormEvent } from 'react'
import { email } from '../data/experience'
import { ContactButtons } from './ContactButtons'

// No backend, so submitting opens the visitor's email app with the message filled in.
export function ContactSection() {
  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const name = String(data.get('name') ?? '')
    const from = String(data.get('email') ?? '')
    const subject = String(data.get('subject') ?? '')
    const message = String(data.get('message') ?? '')
    const body = `${message}\n\nFrom: ${name} <${from}>`
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <section id="contact" className="contact">
      <ContactButtons />
      <form className="contact-form" onSubmit={onSubmit}>
        <div className="form-row">
          <label className="field">
            <span>Name</span>
            <input name="name" placeholder="Your name" autoComplete="name" required />
          </label>
          <label className="field">
            <span>Email</span>
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              required
            />
          </label>
        </div>
        <label className="field">
          <span>Subject</span>
          <input name="subject" placeholder="What's this about?" required />
        </label>
        <label className="field">
          <span>Message</span>
          <textarea name="message" rows={6} placeholder="Your message..." required />
        </label>
        <div className="form-foot">
          <p className="muted">Opens your email app, addressed to {email}.</p>
          <button type="submit" className="send-btn">
            Send message
          </button>
        </div>
      </form>
    </section>
  )
}
