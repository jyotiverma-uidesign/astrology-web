import PageTransition from '../components/PageTransition';

export default function RefundPage() {
  return (
    <PageTransition>
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 max-w-3xl prose prose-neutral">
          <h1 className="text-3xl font-heading font-bold mb-8">Refund Policy – Astro Tulika</h1>

          <h2 className="text-xl font-heading font-semibold mt-8 mb-3">Courses</h2>
          <p className="text-muted-foreground">No refunds once course access is provided.</p>

          <h2 className="text-xl font-heading font-semibold mt-8 mb-3">Consultations</h2>
          <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
            <li>No refund for completed sessions</li>
            <li>Rescheduling allowed with prior notice</li>
          </ul>

          <h2 className="text-xl font-heading font-semibold mt-8 mb-3">Exceptions</h2>
          <p className="text-muted-foreground">Any exceptional case will be reviewed individually.</p>
        </div>
      </section>
    </PageTransition>
  );
}
