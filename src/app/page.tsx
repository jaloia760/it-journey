import Header from "@/components/header"
import TopicCard from "@/components/topic-card"
import { topics } from "@/lib/topics"
import ClientTourKickoff from "@/components/tour/ClientTourKickoff";

export default function Home() {
  return (
    <>
      <Header />
      <ClientTourKickoff variant="home" />
      <section className="mb-8">
        <p className="text-slate-600">
          A guided narrative of IT’s evolution. Click any topic to see how it moves from reactive to proactive to autonomous.
        </p>
      </section>
      <section className="grid auto-rows-fr gap-6 sm:grid-cols-2 lg:grid-cols-3" data-tour-id="topic-card">
        {topics.map((t) => (
          <TopicCard key={t.slug} slug={t.slug} title={t.title} subtitle={t.subtitle} tags={t.tags} />
        ))}
      </section>
    </>
  )
}
