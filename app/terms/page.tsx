import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Terms of Service — Mindful Mama",
}

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/">
            <Image src="/logo2.png" alt="Mindful Mama" width={120} height={32} className="h-8 w-auto" />
          </Link>
          <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            My Toolkit
          </Link>
        </div>
      </header>
      <div className="max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-medium text-foreground mb-8">Terms of Service</h1>
        <p className="text-sm text-muted-foreground mb-8">Last updated: June 1, 2026</p>

        <div className="prose prose-sm max-w-none space-y-6 text-foreground/80">
          <section>
            <h2 className="text-xl font-medium text-foreground mb-3">1. What This Product Is</h2>
            <p>
              Mindful Mama provides educational content and self-reflection tools related to
              parenting with ADHD and executive function differences. Our assessment and
              resulting report are designed to help you understand your personal patterns
              and provide practical life strategies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-foreground mb-3">2. What This Product Is NOT</h2>
            <p>
              This product is <strong>not</strong> a medical device, diagnostic tool, therapeutic
              service, or substitute for professional mental health care. It does not diagnose
              ADHD or any other condition. It does not provide medical advice, therapy, or
              treatment of any kind.
            </p>
            <p>
              No professional-client relationship (therapeutic, medical, or otherwise) is
              created through your use of this product.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-foreground mb-3">3. Not Medical Advice</h2>
            <p>
              The information provided through Mindful Mama is for educational and
              self-reflection purposes only. It should not be used as a substitute for
              consultation with a qualified healthcare provider. Always seek the advice
              of your physician, therapist, or other qualified health provider with any
              questions you may have regarding a medical or mental health condition.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-foreground mb-3">4. Use of the Service</h2>
            <p>
              By using Mindful Mama, you acknowledge that:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>You are at least 18 years of age</li>
              <li>You understand this is an educational tool, not a clinical service</li>
              <li>You take full responsibility for how you apply the information provided</li>
              <li>You will seek professional help if you are in crisis or need clinical support</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-medium text-foreground mb-3">5. Payment and Access</h2>
            <p>
              The assessment report is available for a one-time payment. Upon successful
              payment, you receive immediate access to your personalized report. Your
              report remains accessible as long as the service is operational.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-foreground mb-3">6. Refund Policy</h2>
            <p>
              Due to the digital nature of the product and immediate delivery of results,
              refunds are handled on a case-by-case basis. If you are unsatisfied with
              your report, please contact us within 7 days of purchase and we will work
              with you to resolve the issue.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-foreground mb-3">7. Limitation of Liability</h2>
            <p>
              Mindful Mama and its creators shall not be liable for any direct, indirect,
              incidental, consequential, or special damages arising from your use of this
              product or reliance on any information provided. This includes, but is not
              limited to, damages for loss of profits, goodwill, or other intangible losses.
            </p>
            <p>
              We make no warranties or representations about the accuracy, completeness,
              or suitability of the information provided. Use of this product is at your
              own risk.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-foreground mb-3">8. Intellectual Property</h2>
            <p>
              All content, including assessment questions, report text, strategies, scripts,
              and design elements, is the intellectual property of Mindful Mama. You may
              not reproduce, distribute, or commercially exploit any content without
              written permission. You may share your personal results for non-commercial
              purposes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-foreground mb-3">9. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. Continued use of
              the service after changes constitutes acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-foreground mb-3">10. Crisis Resources</h2>
            <p>
              If you are experiencing a mental health crisis, please contact:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li><strong>988 Suicide &amp; Crisis Lifeline:</strong> Call or text 988</li>
              <li><strong>Crisis Text Line:</strong> Text HOME to 741741</li>
              <li><strong>Emergency Services:</strong> Call 911</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-medium text-foreground mb-3">11. Contact</h2>
            <p>
              For questions about these terms, please contact us at{" "}
              <a href="mailto:hello@mindfulmama.ai" className="underline">hello@mindfulmama.ai</a>.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
