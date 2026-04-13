import PageTransition from '../components/PageTransition';

export default function PrivacyPage() {
  return (
    <PageTransition>
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 max-w-3xl prose prose-neutral">
          <h1 className="text-3xl font-heading font-bold mb-8">Privacy Policy – Astro Tulika</h1>
          <p>We respect your privacy and are committed to protecting your personal information.</p>

          <h2 className="text-xl font-heading font-semibold mt-8 mb-3">Information We Collect</h2>
          <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
            <li>Name</li>
            <li>Contact details (email / phone)</li>
            <li>Information shared during consultations</li>
          </ul>

          <h2 className="text-xl font-heading font-semibold mt-8 mb-3">How We Use Your Information</h2>
          <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
            <li>To provide services and courses</li>
            <li>To communicate updates or responses</li>
            <li>To improve offerings</li>
          </ul>

          <h2 className="text-xl font-heading font-semibold mt-8 mb-3">Data Protection</h2>
          <p className="text-muted-foreground">Your personal data is not sold, shared, or misused.</p>

          <h2 className="text-xl font-heading font-semibold mt-8 mb-3">Consent</h2>
          <p className="text-muted-foreground">By using this website, you consent to this policy.</p>
        </div>
      </section>
    </PageTransition>
  );
}
