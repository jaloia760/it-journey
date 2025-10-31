export type Topic = {
  slug: string
  title: string
  subtitle: string
  tags: string[]
  embeds?: { reactive?: string; proactive?: string; autonomous?: string }
}
export const topics: Topic[] = [
  {
    slug: "incident-management",
    title: "Incident Management",
    subtitle: "From manual triage and routing to AI-correlated prioritization to autonomous resolution and RCA generation.",
    /**
     * reactive: Agents manually triage and route; resolution depends on individual expertise; MTTA/MTTR vary.
     * proactive: Freddy correlates alerts/incidents, prioritizes by business impact, and recommends runbooks.
     * autonomous: Platform dedupes and auto-routes to the right owner, executes remediation playbooks, and closes with RCA draft + postmortem stub.
     */
    tags: ["Manual triage", "Impact-aware routing", "Auto-resolve + RCA"],
    embeds: {
      reactive: "https://www.loom.com/share/example-reactive-incident",
      proactive: "https://www.loom.com/share/example-proactive-incident",
      autonomous: "https://www.loom.com/share/example-autonomous-incident",
    },
  },
  {
    slug: "change-risk",
    title: "Change Risk & CAB",
    subtitle: "From intuition-driven CAB reviews to AI-scored risk prediction to guardrailed auto-approvals and rollback.",
    /**
     * reactive: CAB reviews forms; risk is intuition-driven; approvals are slow and inconsistent.
     * proactive: AI risk scoring with blast-radius analysis, test/rollback recommendations; CAB focuses on outliers.
     * autonomous: Low-risk changes auto-approved with guardrails; pre/post checks automated; safe auto-rollback on regression signals.
     */
    tags: ["Form-based CAB", "Risk-scored + blast radius", "Auto-approve + rollback"],
  },
  {
    slug: "service-health",
    title: "Service Health",
    subtitle: "From reactive alert chasing to predictive detection and guidance to closed-loop self-healing under SLOs.",
    /**
     * reactive: Teams chase noisy alerts; service impact is understood after users report issues.
     * proactive: Predictive degradation detection with dependency-aware impact mapping and guided actions.
     * autonomous: Self-heal actions execute under SLO guardrails; incidents auto-created/resolved and status pages updated.
     */
    tags: ["Alert chasing", "Predictive anomalies", "Self-healing under SLOs"],
  },
  {
    slug: "request-fulfillment",
    title: "Request Fulfillment",
    subtitle: "From static catalog requests to context-aware orchestration to AI-generated zero-touch fulfillment.",
    /**
     * reactive: Static catalog, manual approvals and provisioning; frequent back-and-forth.
     * proactive: Context-aware item suggestions, auto-filled requests, policy-based approvals, and one-click orchestration.
     * autonomous: AI-generated service items and zero-touch fulfillment via least-privilege workflows with continuous optimization.
     */
    tags: ["Static catalog", "Policy-aware orchestration", "Zero-touch fulfillment"],
  },
  {
    slug: "asset-config",
    title: "Asset & Config Management",
    subtitle: "From manual CMDB updates to continuous discovery and simulation to autonomous drift remediation.",
    /**
     * reactive: Point-in-time CMDB; manual updates and blind spots; impact hard to predict.
     * proactive: Continuous discovery (Device42), drift/anomaly detection, and change impact simulation before rollout.
     * autonomous: Self-maintaining topology with policy-enforced configurations and auto-remediation of drift.
     */
    tags: ["Point-in-time CMDB", "Drift detection", "Policy remediation"],
  },
  {
    slug: "knowledge-insight",
    title: "Knowledge & Insight",
    subtitle: "From static knowledge bases to Freddy-assisted insights to self-evolving, outcome-verified knowledge.",
    /**
     * reactive: Users and agents search static articles; content becomes stale and duplicated.
     * proactive: Freddy suggests answers from histories; tracks deflection; flags gaps; drafts updates for review.
     * autonomous: Knowledge is auto-authored and curated from resolved tickets; outcome-verified and pushed contextually across channels.
     */
    tags: ["Stale KB", "Drafted updates", "Auto-curated knowledge"],
  },
]
