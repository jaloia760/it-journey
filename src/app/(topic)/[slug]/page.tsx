import { notFound } from "next/navigation"
import { topics } from "@/lib/topics"
import StageTabs from "@/components/stage-tabs"
import { Badge } from "@/components/ui/badge"
import IncidentProactive from "@/components/prototypes/incident-proactive"
import IncidentAutonomous from "@/components/prototypes/incident-autonomous"
import ChangeProactive from "@/components/prototypes/change-proactive"
import ChangeAutonomous from "@/components/prototypes/change-autonomous"
import HealthProactive from "@/components/prototypes/health-proactive"
import HealthAutonomous from "@/components/prototypes/health-autonomous"
import RequestProactive from "@/components/prototypes/request-proactive"
import RequestAutonomous from "@/components/prototypes/request-autonomous"
import AssetProactive from "@/components/prototypes/asset-proactive"
import AssetAutonomous from "@/components/prototypes/asset-autonomous"
import KnowledgeProactive from "@/components/prototypes/knowledge-proactive"
import KnowledgeAutonomous from "@/components/prototypes/knowledge-autonomous"
import Script from "next/script"
import ClientTourKickoff from "@/components/tour/ClientTourKickoff";

export default async function TopicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const topic = topics.find(t => t.slug === slug)
  if (!topic) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-semibold">Topic not found</h2>
        <pre className="mt-4 rounded bg-slate-100 p-4 text-sm">
{JSON.stringify({ slug, available: topics.map(t => t.slug) }, null, 2)}        </pre>
        <p className="mt-4 text-slate-600">
          If the slug is listed above and matches, try clearing the cache and restarting the dev server.
        </p>
      </div>
    )
  }


  const iframe = (src?: string) =>
    src ? <iframe src={src} className="h-[460px] w-full" allow="fullscreen; clipboard-read; clipboard-write" />
        : <img src={`/demos/${topic.slug}.png`} alt={topic.title} className="h-[460px] w-full object-cover" />

  const stages = topic.slug === "incident-management" ? [
    {
      label: "Reactive" as const,
      summary:
        "Today, AI assists but does not act - it unifies fragmented data, summarizes alerts, and guides human responders. Operations remain reactive, with people connecting the dots across tools, silos, and manual workflows.",
      bullets: [
        "Unified visibility across alerts, assets, and services",
        "Freddy summarizes; humans make decisions and take action",
        "Resolution relies on manual triage and escalation",
      ],
      media: (
        <a
          href="https://gartner2024.freshservice.com/a/tickets/17034"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/images/react-incident.png"
            alt="Incident Management Reactive View"
            className="rounded-xl shadow-md border border-slate-200 hover:shadow-lg transition-shadow duration-200"
          />
        </a>
      ),
    },
    {
      label: "Proactive" as const,
      summary:
        "Signals and correlation reduce duplicate tickets, prioritize by business impact, and suggest runbooks.",
      bullets: [
        "Freddy suggests responses and actions",
        "Incident deduplication and service-aware prioritization",
        "One-click orchestration from the ticket",
      ],
      media: <IncidentProactive />,
    },
    {
      label: "Autonomous" as const,
      summary:
        "Closed-loop auto-resolution for known patterns, with an audit trail, RCA draft, and stakeholder communications.",
      bullets: [
        "Auto-route and trigger runbooks",
        "Health checks and rollback as guardrails",
        "Auto-close with RCA draft or postmortem stub",
      ],
      media: <IncidentAutonomous />,
    },
  ] : [
    {
      label: "Reactive" as const,
      summary:
        topic.slug === "change-risk"
          ? "Today, CAB relies on forms and intuition. Approvals are slow and inconsistent, and risk is discovered only after the fact."
          : topic.slug === "service-health"
          ? "Teams chase noisy alerts and learn about service impact only after users are affected. Recovery depends on quick reactions."
          : topic.slug === "request-fulfillment"
          ? "Static catalog, manual approvals, and ticket handoffs. Provisioning is slow and fragile across tools."
          : topic.slug === "asset-config"
          ? "Point-in-time CMDB with manual updates and blind spots. Drift and impact are hard to detect in time."
          : topic.slug === "knowledge-insight"
          ? "Agents and users search a static knowledge base; content becomes stale or duplicated. Answers vary depending on who's available."
          : "Manual workflows and siloed steps. Outcomes depend on effort, not insight.",
      bullets:
        topic.slug === "change-risk"
          ? [
              "Forms and intuition drive decisions",
              "Slow approvals and change collisions",
              "Risk is surfaced after deployment",
            ]
          : topic.slug === "service-health"
          ? [
              "Alert storms and unclear business impact",
              "Late detection from user reports",
              "Manual triage across tools",
            ]
          : topic.slug === "request-fulfillment"
          ? [
              "Static items and inconsistent data entry",
              "Manual approvals and handoffs",
              "Slow, error-prone provisioning",
            ]
          : topic.slug === "asset-config"
          ? [
              "Incomplete and aging inventory",
              "Unknown drift and misconfigurations",
              "Hard to predict change impact",
            ]
          : topic.slug === "knowledge-insight"
          ? [
              "Stale articles and duplicate content",
              "Heavy reliance on tribal knowledge",
              "Low deflection and inconsistent answers",
            ]
          : [
              "Human-driven triage and routing",
              "Frequent context switching across tools",
              "SLA risk from queues and rework",
            ],
      media: (
        topic.slug === "service-health" ? (
          <a
            href="https://gartner2024.freshservice.com/a/assets/5876/relationship-map"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/images/react-health.png"
              alt="Service Health Reactive View"
              className="rounded-xl shadow-md border border-slate-200 hover:shadow-lg transition-shadow duration-200"
            />
          </a>
        ) : topic.slug === "change-risk" ? (
          <a
            href="https://gartner2024.freshservice.com/a/changes/365?current_tab=details"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/images/react-change.png"
              alt="Change Management Reactive View"
              className="rounded-xl shadow-md border border-slate-200 hover:shadow-lg transition-shadow duration-200"
            />
          </a>
        ) : topic.slug === "request-fulfillment" ? (
          <a
            href="https://gartner2024.freshservice.com/support/home"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/images/react-request.png"
              alt="Request Fulfillment Reactive View"
              className="rounded-xl shadow-md border border-slate-200 hover:shadow-lg transition-shadow duration-200"
            />
          </a>
        ) : topic.slug === "asset-config" ? (
          <a
            href="https://gartner2024.freshservice.com/cmdb/items/5876#relationships"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/images/react-asset.png"
              alt="Asset and Config Reactive View"
              className="rounded-xl shadow-md border border-slate-200 hover:shadow-lg transition-shadow duration-200"
            />
          </a>
        ) : topic.slug === "knowledge-insight" ? (
          <a
            href="https://gartner2024.freshservice.com/a/solutions/articles/filters/all_articles?language=en"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/images/react-know.png"
              alt="Knowledge and Insight Reactive View"
              className="rounded-xl shadow-md border border-slate-200 hover:shadow-lg transition-shadow duration-200"
            />
          </a>
        ) : (
          iframe(topic.embeds?.reactive)
        )
      ),
    },
    {
      label: "Proactive" as const,
      summary:
        topic.slug === "change-risk"
          ? "AI scores risk and maps blast radius. CAB focuses on outliers while guardrails guide safe change."
          : topic.slug === "service-health"
          ? "Predictive detection highlights degradation early, with dependency-aware impact and guided actions."
          : topic.slug === "request-fulfillment"
          ? "Context-aware catalog, auto-filled fields, and policy-based approvals trigger one-click orchestration."
          : topic.slug === "asset-config"
          ? "Continuous discovery detects drift and simulates impact before rollout to reduce incidents."
          : topic.slug === "knowledge-insight"
          ? "Freddy suggests answers, tracks deflection, flags gaps, and drafts updates for review."
          : "Signals, correlation, and predictions help teams act before users are affected.",
      bullets:
        topic.slug === "change-risk"
          ? [
              "Risk scoring and blast radius analysis",
              "Test and rollback recommendations",
              "CAB time focused on outliers",
            ]
          : topic.slug === "service-health"
          ? [
              "Early anomaly detection",
              "Service-aware prioritization",
              "Guided remediation steps",
            ]
          : topic.slug === "request-fulfillment"
          ? [
              "Smart item suggestions",
              "Policy-based approvals",
              "One-click provisioning flows",
            ]
          : topic.slug === "asset-config"
          ? [
              "Continuous discovery (Device42)",
              "Drift and anomaly detection",
              "Impact simulation before change",
            ]
          : topic.slug === "knowledge-insight"
          ? [
              "Answer suggestions from history",
              "Deflection and gap analytics",
              "Drafted updates for review",
            ]
          : [
              "Freddy suggestions and correlation",
              "Impact awareness and risk cues",
              "Trigger orchestrations from insight",
            ],
      // TODO: per‑topic components (e.g., <ChangeProactive/>, <ServiceHealthProactive/>, <RequestProactive/>, <AssetConfigProactive/>, <KnowledgeProactive/>)
      media: (
        topic.slug === "change-risk" ? <ChangeProactive /> :
        topic.slug === "service-health" ? <HealthProactive /> :
        topic.slug === "request-fulfillment" ? <RequestProactive /> :
        topic.slug === "asset-config" ? <AssetProactive /> :
        topic.slug === "knowledge-insight" ? <KnowledgeProactive /> :
        iframe(topic.embeds?.proactive)
      ),
    },
    {
      label: "Autonomous" as const,
      summary:
        topic.slug === "change-risk"
          ? "Guardrailed auto-approval for low-risk changes, with pre- and post-checks and safe auto-rollback."
          : topic.slug === "service-health"
          ? "Closed-loop self-healing executes under SLO guardrails, with automatic updates to incidents and status."
          : topic.slug === "request-fulfillment"
          ? "AI-generated items and workflows enable zero-touch fulfillment with continuous optimization."
          : topic.slug === "asset-config"
          ? "Self-maintaining topology with policy-enforced configurations and automated drift remediation."
          : topic.slug === "knowledge-insight"
          ? "Knowledge is auto-authored and outcome-verified, then delivered contextually across channels."
          : "The system anticipates needs and self-orchestrates with guardrails and a complete audit trail.",
      bullets:
        topic.slug === "change-risk"
          ? [
              "Auto-approve low-risk changes with guardrails",
              "Automated pre- and post-checks",
              "Auto-rollback on regression signals",
            ]
          : topic.slug === "service-health"
          ? [
              "Self-healing actions under SLOs",
              "Automatic incident and status updates",
              "RCA captured for learning",
            ]
          : topic.slug === "request-fulfillment"
          ? [
              "Zero-touch provisioning",
              "Least-privilege orchestration",
              "Continuous policy tuning",
            ]
          : topic.slug === "asset-config"
          ? [
              "Policy-enforced configurations",
              "Auto-remediate drift",
              "Always-current service map",
            ]
          : topic.slug === "knowledge-insight"
          ? [
              "Auto-authored, verified knowledge",
              "Continuous curation",
              "Multi-channel delivery",
            ]
          : [
              "Closed-loop automations",
              "Guardrails and audit trail",
              "Improved experience outcomes (XLA)",
            ],
      // TODO: per‑topic components (e.g., <ChangeAutonomous/>, <ServiceHealthAutonomous/>, <RequestAutonomous/>, <AssetConfigAutonomous/>, <KnowledgeAutonomous/>)
      media: (
        topic.slug === "change-risk" ? <ChangeAutonomous /> :
        topic.slug === "service-health" ? <HealthAutonomous /> :
        topic.slug === "request-fulfillment" ? <RequestAutonomous /> :
        topic.slug === "asset-config" ? <AssetAutonomous /> :
        topic.slug === "knowledge-insight" ? <KnowledgeAutonomous /> :
        iframe(topic.embeds?.autonomous)
      ),
    },
  ]

return (
  <div className="space-y-6" data-tour-id="open-demo">
    <ClientTourKickoff variant="topic" />
      <nav className="flex items-center justify-between text-sm text-slate-500 border-b border-slate-200 pb-2" data-tour-id="next-topic">
        <a href="/" className="hover:text-slate-700 transition-colors">← Back to Overview</a>
        <div className="flex gap-3">
          {topics.filter(t => t.slug !== topic.slug).map(t => (
            <a
              key={t.slug}
              href={`/${t.slug}`}
              className="hover:text-indigo-600 transition-colors"
            >
              {t.title}
            </a>
          ))}
        </div>
      </nav>
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{topic.title}</h1>
        <p className="text-slate-600">{topic.subtitle}</p>
      </div>
      <div data-tour-id="stage-tabs">
        <StageTabs stages={stages} />
      </div>
      <Script id="proto-modal-enhancer" strategy="afterInteractive">{`
        (() => {
          const apply = () => {
            var modals = Array.from(document.querySelectorAll('div.fixed.inset-0'));
            document.body.style.overflow = modals.length ? 'hidden' : '';
            modals.forEach(function(m) {
              var container = m.querySelector(
                'div.bg-white.rounded-xl.shadow-2xl, div.bg-white.rounded-xl, div.bg-white.rounded-lg.shadow-2xl, div.bg-white.rounded-lg'
              );
              if (container) {
                container.style.maxHeight = '90vh';
                container.style.overflow = 'auto';
                container.style.display = 'flex';
                container.style.flexDirection = 'column';
                container.style.scrollbarGutter = 'stable both-edges';
                var header = container.querySelector('div.border-b');
                if (header) {
                  header.style.position = 'sticky';
                  header.style.top = '0';
                  header.style.zIndex = '10';
                  header.style.background = 'white';
                }
                var footer = container.querySelector('div.border-t');
                if (footer) {
                  footer.style.position = 'sticky';
                  footer.style.bottom = '0';
                  footer.style.zIndex = '10';
                  footer.style.background = 'white';
                }
              }
            });
          };
          var mo = new MutationObserver(apply);
          mo.observe(document.documentElement, { subtree: true, childList: true });
          document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
              var btn = document.querySelector('button[aria-label="Close"], button:has(+ [aria-label="Close"])');
              if (btn) btn.click();
            }
          });
          apply();
        })();
      `}</Script>
    </div>
  )
}
