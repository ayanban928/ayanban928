export type Experience = {
  period: string
  company: string
  role: string
  description?: string
}

export const experiences: Experience[] = [
  {
    period: 'September 2026 — Present',
    company: 'Tesla',
    role: 'Software Engineer Intern',
  },
  {
    period: 'June 2026 — August 2026',
    company: 'Amazon',
    role: 'Software Engineer Intern',
    description:
      'Built and optimized scalable pricing infrastructure and AI-powered operational tooling to improve performance, reliability, and product automation across global systems.',
  },
  {
    period: 'September 2025 — May 2026',
    company: 'Àjamais AI',
    role: 'Machine Learning Engineer',
    description:
      'Designed and shipped real-time AI and distributed systems for matchmaking, session orchestration, and 3D floor-plan conversion to improve scale and latency for a live product experience.',
  },
  {
    period: 'June 2025 — August 2025',
    company: 'Walmart Global Tech',
    role: 'Software Engineer Intern',
    description:
      'Developed AI-driven automation and observability tools to streamline issue resolution, reduce engineering overhead, and improve operational decision-making at scale.',
  },
  {
    period: 'August 2023 — May 2025',
    company: 'University of Maryland',
    role: 'Research Assistant',
    description:
      'Researched generative-model robustness and large-scale scientific data analysis to improve model quality, signal processing, and performance under noisy conditions.',
  },
]

export const email = 'ayanbanerj@gmail.com'

export const linkedin = 'https://linkedin.com/in/ayanban928/'
export const github = 'https://github.com/ayanban928'

export const contactLinks = [
  { label: 'Email me', href: `mailto:${email}`, icon: 'email' },
  { label: 'GitHub', href: github, icon: 'github' },
  { label: 'LinkedIn', href: linkedin, icon: 'linkedin' },
] as const

export type Project = {
  name: string
  blurb: string
  tags: string[]
  github: string
}

export const projects: Project[] = [
  {
    name: 'Navix',
    blurb:
      'AI travel planner. A shadow agent audits every answer and turns Instagram and TikTok links into trip notes.',
    tags: ['TypeScript', 'AI agents', 'Gemini'],
    github: 'https://github.com/ayanban928/Navix',
  },
  {
    name: 'Jorda',
    blurb: 'Job application tracker. Organize applications by recruitment cycle.',
    tags: ['React', 'TypeScript', 'Express'],
    github: 'https://github.com/ayanban928/Jorda',
  },
]
