import PageTransition from '../components/PageTransition';

export default function TermsPage() {
  return (
    <PageTransition>
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 max-w-3xl prose prose-neutral">
          <h1 className="text-3xl font-heading font-bold mb-8">Terms & Conditions – Astro Tulika</h1>
          <p>By using this website or enrolling in any course, you agree to the following:</p>

          <h2 className="text-xl font-heading font-semibold mt-8 mb-3">General</h2>
          <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
            <li>All content is for educational and guidance purposes</li>
            <li>Results may vary from person to person</li>
          </ul>

          <h2 className="text-xl font-heading font-semibold mt-8 mb-3">Courses</h2>
          <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
            <li>Access is provided as per the selected course</li>
            <li>Content cannot be copied or redistributed</li>
          </ul>

          <h2 className="text-xl font-heading font-semibold mt-8 mb-3">Consultations</h2>
          <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
            <li>Sessions are for guidance only</li>
            <li>No guaranteed outcomes are promised</li>
          </ul>

          <h2 className="text-xl font-heading font-semibold mt-8 mb-3">Payments</h2>
          <p className="text-muted-foreground">All payments must be completed before access or booking.</p>
        </div>
      </section>
    </PageTransition>
  );
}
