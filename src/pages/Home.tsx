import { ContactButtons } from '../components/ContactButtons'
import { ContactSection } from '../components/ContactSection'
import { Layout } from '../components/Layout'
import { SectionLink } from '../components/SectionLink'
import { experiences, github, linkedin, projects } from '../data/experience'

export function Home() {
  return (
    <Layout>
      <main className="page">
        <section id="top" className="hero">
          <h1>
            I’m <span className="name">Ayan.</span>
          </h1>
          <p className="lead">SWE Intern @ Tesla. CS and Math Student at UMD 🐢</p>
          <p className="about-copy">
            I’m really into software engineering, generative AI, and HPC.
            <br />Nowadays you’ll most probably catch me working on LLM inference and discrete
            diffusion.
          </p>
          <a className="scroll-cue" href="#experience">
            Scroll down to see my experience and projects ↓
          </a>
          <ContactButtons />
        </section>

        <section id="experience">
          <h2 className="section-title">
            <SectionLink href={linkedin} service="linkedin" label="View on LinkedIn">
              Experience
            </SectionLink>
          </h2>
          <ul className="list">
            {experiences.map((exp) => (
              <li key={exp.company} className="list-row experience-row">
                <time className="muted">{exp.period}</time>
                <div>
                  <h3>
                    <span className="hover-accent">{exp.company}</span>
                    <span className="muted"> · {exp.role}</span>
                  </h3>
                  {exp.description && <p className="muted">{exp.description}</p>}
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section id="projects">
          <h2 className="section-title">
            <SectionLink href={github} service="github" label="View on GitHub">
              Featured projects
            </SectionLink>
          </h2>
          <ul className="list">
            {projects.map((project) => (
              <li key={project.name} className="list-row">
                <div>
                  <h3>
                    <span className="hover-accent">{project.name}</span>
                  </h3>
                  <p className="muted">{project.blurb}</p>
                  <p className="tags">{project.tags.join(' · ')}</p>
                </div>
                <a href={project.github} target="_blank" rel="noreferrer">
                  Code ↗
                </a>
              </li>
            ))}
          </ul>
        </section>

        <ContactSection />
      </main>
    </Layout>
  )
}
