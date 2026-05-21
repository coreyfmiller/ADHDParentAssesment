import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy — Mindful Mama",
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-medium text-foreground mb-8">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground mb-8">Last updated: May 21, 2026</p>

        <div className="prose prose-sm max-w-none space-y-6 text-foreground/80">
          <section>
            <h2 className="text-xl font-medium text-foreground mb-3">1. Information We Collect</h2>
            <p>We collect the following information when you use Mindful Mama:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li><strong>Assessment responses:</strong> Your answers to the 25 assessment questions, stored locally in your browser to enable session persistence</li>
              <li><strong>Email address:</strong> If you choose to provide it, for report delivery and occasional communications</li>
              <li><strong>Payment information:</strong> Processed securely through our payment provider (Stripe). We do not store credit card numbers</li>
              <li><strong>Analytics data:</strong> Anonymous usage data including pages visited, assessment progress, and general interaction patterns (via Vercel Analytics)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-medium text-foreground mb-3">2. How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>To generate your personalized assessment report</li>
              <li>To deliver your report via email (if email provided)</li>
              <li>To process your payment</li>
              <li>To send occasional ADHD parenting tips and product updates (if opted in)</li>
              <li>To improve our product based on anonymous usage patterns</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-medium text-foreground mb-3">3. How We Store Your Information</h2>
            <p>
              Assessment responses are stored locally in your browser (localStorage)
              and expire after 24 hours. They are not transmitted to our servers unless
              you complete a purchase, at which point your responses may be stored to
              enable future access to your report.
            </p>
            <p>
              Email addresses are stored with our email service provider under their
              respective privacy policies and security standards.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-foreground mb-3">4. Third-Party Services</h2>
            <p>We use the following third-party services that may process your data:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li><strong>Vercel:</strong> Hosting and anonymous analytics</li>
              <li><strong>Stripe:</strong> Payment processing</li>
              <li><strong>Email service provider:</strong> Email delivery and list management</li>
            </ul>
            <p className="mt-2">
              Each of these services has their own privacy policy governing how they
              handle your data. We encourage you to review their policies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-foreground mb-3">5. Data Sharing</h2>
            <p>
              We do <strong>not</strong> sell, rent, or share your personal information
              with third parties for marketing purposes. We only share data with the
              service providers listed above as necessary to operate the product.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-foreground mb-3">6. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Request access to the personal data we hold about you</li>
              <li>Request deletion of your personal data</li>
              <li>Unsubscribe from email communications at any time</li>
              <li>Clear your local assessment data by clearing your browser storage</li>
            </ul>
            <p className="mt-2">
              To exercise any of these rights, please contact us at the email address
              provided on our website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-foreground mb-3">7. GDPR (European Users)</h2>
            <p>
              If you are located in the European Economic Area, you have additional
              rights under the General Data Protection Regulation (GDPR), including
              the right to data portability and the right to lodge a complaint with
              a supervisory authority. Our legal basis for processing your data is
              your consent (provided when you use the service) and legitimate interest
              (to improve our product).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-foreground mb-3">8. Cookies and Local Storage</h2>
            <p>
              We use browser localStorage to save your assessment progress. This data
              stays on your device and is not transmitted to our servers. We use
              essential cookies for payment processing and analytics. We do not use
              advertising cookies or tracking pixels from social media platforms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-foreground mb-3">9. Children&apos;s Privacy</h2>
            <p>
              Mindful Mama is intended for adults aged 18 and over. We do not knowingly
              collect personal information from children under 18. If you believe a
              child has provided us with personal information, please contact us and
              we will delete it promptly.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-foreground mb-3">10. Changes to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. We will notify you
              of significant changes via email (if provided) or by posting a notice on
              our website. Continued use of the service after changes constitutes
              acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-foreground mb-3">11. Contact</h2>
            <p>
              For privacy-related questions or to exercise your data rights, please
              contact us at the email address provided on our website.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
