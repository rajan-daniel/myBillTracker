export default function PrivacyPolicyPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-gray-900 text-3xl font-bold mb-8">Privacy Policy</h1>

      <div className="space-y-6 text-gray-700">
        <p>
          Last Updated: June 2026
        </p>

        <section>
          <h2 className="text-xl font-semibold mb-2">
            Information We Collect
          </h2>
          <p>
            This application stores account information such as your email
            address and any bill information you choose to add.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">
            How Your Data Is Used
          </h2>
          <p>
            Your data is used solely to provide bill tracking functionality.
            We do not sell, rent, or share your personal information with
            third parties.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">
            Data Storage
          </h2>
          <p>
            Account and bill information is stored securely using Supabase.
            Access to your bill data is restricted to your account.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">
            Data Retention
          </h2>
          <p>
            We store only the most recent 15 paid bill records for display
            purposes. Paid bill history is automatically removed from our
            database after 7 days to reduce storage usage and maintain system
            performance.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">
            Contact
          </h2>
          <p>
            If you have questions regarding this policy, please contact rajan.daniel.dev@gmail.com
          </p>
        </section>
      </div>
    </main>
  );
}