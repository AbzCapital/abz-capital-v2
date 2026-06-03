import Link from "next/link";

export default function InvestorNetworkSuccessPage() {
  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-md mx-auto py-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-green-800 mb-4">Welcome to the Network! 🎉</h1>

        <div className="space-y-4 mb-8">
          <p className="text-lg text-gray-700 font-semibold">
            Congratulations! You've successfully joined our Investor Network.
          </p>

          <p className="text-gray-600">
            You're now part of an exclusive community of investors with access to curated SME and innovation opportunities.
          </p>

          <p className="text-gray-600">
            Our investment team will carefully review your profile and match you with opportunities that align with your investment preferences.
          </p>

          <p className="text-gray-600">
            Watch your email for exclusive deal notifications and investment alerts tailored to your interests.
          </p>
        </div>

        <Link
          href="/invest"
          className="inline-block w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-lg transition"
        >
          ← Return Home
        </Link>
      </div>
    </div>
  );
}
