export default function TermsPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-gray-900 text-3xl font-bold mb-8">Terms of Use</h1>

      <div className="space-y-6 text-gray-700">
        <p>
          Last Updated: June 2026
        </p>

        <section>
          <h2 className="text-xl font-semibold mb-2">
            Acceptance of Terms
          </h2>
          <p>
            By using this application, you agree to these Terms of Use.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">
            User Accounts
          </h2>
          <p>
            Users are responsible for maintaining the security of their
            accounts and passwords.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">
            Service Availability
          </h2>
          <p>
            This application is provided on an "as is" basis without
            guarantees of uptime, availability, or accuracy.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">
            Limitation of Liability
          </h2>
          <p>
            This application is intended for informational and organizational
            purposes only. Users remain responsible for managing and paying
            their bills.
          </p>
        </section>
      </div>
    </main>
  );
}