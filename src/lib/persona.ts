export type PersonaStage = 'reactive' | 'proactive' | 'autonomous';
export type PersonaContext = 'incident' | 'change' | 'health' | 'request' | 'asset' | 'knowledge';

export interface PersonaInfo {
  name: string;
  title: string;
  roleEvolution: string;
  description: string;
  skills: string[];
  quote?: string;
  visual?: string;
}

export const personas: Record<PersonaContext, Record<PersonaStage, PersonaInfo>> = {
  incident: {
    reactive: {
      name: 'Jordan',
      title: 'IT Support Agent',
      roleEvolution: 'Responder → Troubleshooter',
      description:
        'Handles incidents and service requests manually. Focused on resolving tickets quickly under SLA pressure. Often juggling multiple channels of communication and routine tasks.',
      skills: ['Troubleshooting', 'Customer Support', 'Process Adherence'],
      quote: 'Most of my day is spent reacting to issues as they come in.',
    },
    proactive: {
      name: 'Alex',
      title: 'Service Reliability Analyst',
      roleEvolution: 'Troubleshooter → Orchestrator',
      description:
        'Identifies recurring issues, creates automations, and improves workflows. Partners with AI copilots to prevent incidents and streamline support operations.',
      skills: ['Automation', 'Data Analysis', 'Continuous Improvement'],
      quote: 'Now, I spend less time firefighting and more time improving the system.',
    },
    autonomous: {
      name: 'Riley',
      title: 'AI Service Architect',
      roleEvolution: 'Orchestrator → Designer',
      description:
        'Defines policies and governance for self-healing systems. Oversees AI-driven service orchestration, ensuring compliance, ethics, and optimal outcomes.',
      skills: ['AI Governance', 'System Design', 'Strategic Thinking'],
      quote: 'My role is to design and guide the digital workforce — humans and AI working in harmony.',
    },
  },
  change: {
    reactive: {
      name: 'Priya',
      title: 'Change Coordinator',
      roleEvolution: 'Reviewer → Planner',
      description:
        'Manages change tickets and approvals manually. Coordinates across teams to minimize risk, relying heavily on human judgment and spreadsheets.',
      skills: ['Change Management', 'Risk Assessment', 'Communication'],
      quote: 'Every change feels like a mini project — lots of coordination and approvals.',
    },
    proactive: {
      name: 'Noah',
      title: 'Change Automation Specialist',
      roleEvolution: 'Planner → Controller',
      description:
        'Implements automated risk scoring and pre-approval workflows. Uses AI insights to predict change impact and reduce collisions.',
      skills: ['Automation', 'Workflow Design', 'Risk Prediction'],
      quote: 'We’ve made change approvals smarter and faster — less waiting, fewer surprises.',
    },
    autonomous: {
      name: 'Mei',
      title: 'AI-driven Governance Lead',
      roleEvolution: 'Controller → Policy Steward',
      description:
        'Oversees autonomous change orchestration systems that assess risk, apply approvals, and enforce compliance automatically.',
      skills: ['Governance', 'Policy Modeling', 'AI Compliance'],
      quote: 'Our changes now self-assess and self-approve within defined guardrails.',
    },
  },
  health: {
    reactive: {
      name: 'Carlos',
      title: 'NOC Engineer',
      roleEvolution: 'Observer → Responder',
      description:
        'Monitors dashboards and reacts to alerts manually, escalating to teams as issues occur.',
      skills: ['Monitoring', 'Alert Management', 'Incident Escalation'],
      quote: 'I spend most of my shift staring at graphs, waiting for something to go red.',
    },
    proactive: {
      name: 'Samira',
      title: 'AIOps Analyst',
      roleEvolution: 'Responder → Predictor',
      description:
        'Correlates events and predicts service degradation early using machine learning models.',
      skills: ['AIOps', 'Correlation', 'Anomaly Detection'],
      quote: 'Our AI predictions help us act before customers notice an outage.',
    },
    autonomous: {
      name: 'Arjun',
      title: 'Service Health Architect',
      roleEvolution: 'Predictor → Self-healer Designer',
      description:
        'Designs and governs fully autonomous systems that self-diagnose and self-heal.',
      skills: ['Autonomous Systems', 'AI Design', 'Reliability Engineering'],
      quote: 'We’ve gone from monitoring to mastering service health.',
    },
  },
  request: {
    reactive: {
      name: 'Taylor',
      title: 'Service Desk Agent',
      roleEvolution: 'Processor → Assistant',
      description:
        'Handles requests manually, guiding users through forms and approvals.',
      skills: ['Customer Service', 'Form Management', 'Ticket Routing'],
      quote: 'I spend hours handling repetitive “how do I” requests.',
    },
    proactive: {
      name: 'Morgan',
      title: 'Request Workflow Designer',
      roleEvolution: 'Assistant → Orchestrator',
      description:
        'Designs intelligent request workflows, using Freddy to guide employees and automate approvals.',
      skills: ['Workflow Design', 'Automation', 'UX for IT'],
      quote: 'Freddy helps us guide employees to the right path instantly.',
    },
    autonomous: {
      name: 'Jamie',
      title: 'AI Fulfillment Orchestrator',
      roleEvolution: 'Orchestrator → Conductor',
      description:
        'Oversees AI systems that anticipate needs and fulfill requests before users ask.',
      skills: ['Predictive Fulfillment', 'AI Orchestration', 'Experience Design'],
      quote: 'Employees don’t even need to request — the system takes care of them.',
    },
  },
  asset: {
    reactive: {
      name: 'Devin',
      title: 'Asset Administrator',
      roleEvolution: 'Tracker → Controller',
      description:
        'Tracks hardware and software assets manually across spreadsheets or CMDB.',
      skills: ['Inventory Management', 'Data Entry', 'Tracking'],
      quote: 'Keeping assets accurate is a full-time job.',
    },
    proactive: {
      name: 'Avery',
      title: 'Asset Intelligence Analyst',
      roleEvolution: 'Controller → Optimizer',
      description:
        'Uses telemetry and automation to detect drift, trigger maintenance, and manage lifecycle renewals.',
      skills: ['Automation', 'Lifecycle Management', 'Data Analytics'],
      quote: 'We’ve turned asset management into a data-driven discipline.',
    },
    autonomous: {
      name: 'Jordan',
      title: 'Digital Twin Architect',
      roleEvolution: 'Optimizer → Designer',
      description:
        'Designs systems that maintain asset accuracy and health through autonomous digital twins.',
      skills: ['Digital Twins', 'AI Modeling', 'Predictive Maintenance'],
      quote: 'Assets now maintain themselves — accuracy is continuous.',
    },
  },
  knowledge: {
    reactive: {
      name: 'Casey',
      title: 'Knowledge Author',
      roleEvolution: 'Writer → Curator',
      description:
        'Writes and updates articles manually, often after incidents occur.',
      skills: ['Writing', 'Documentation', 'Tagging'],
      quote: 'I write a lot of “what went wrong” articles after the fact.',
    },
    proactive: {
      name: 'Jordan',
      title: 'Knowledge Experience Designer',
      roleEvolution: 'Curator → Optimizer',
      description:
        'Optimizes article relevance and freshness using analytics and AI recommendations.',
      skills: ['Content Strategy', 'AI Insights', 'Taxonomy Design'],
      quote: 'Now we tune our knowledge base dynamically based on usage data.',
    },
    autonomous: {
      name: 'Sky',
      title: 'Autonomous Knowledge Architect',
      roleEvolution: 'Optimizer → Mentor',
      description:
        'Designs AI systems that auto-generate, validate, and evolve knowledge content.',
      skills: ['Generative AI', 'Content Governance', 'Continuous Learning'],
      quote: 'Knowledge now learns and evolves on its own.',
    },
  },
};