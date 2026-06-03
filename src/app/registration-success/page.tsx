import Link from "next/link";

export default function RegistrationSuccessPage() {
  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-md mx-auto py-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-green-800 mb-4">Registration Successful ✅</h1>

        <div className="space-y-4 mb-8">
          <p className="text-lg text-gray-700 font-semibold">
            Thank you for joining the ABZ Capital Lending Pool.
          </p>

          <p className="text-gray-600">
            We have successfully received your registration details.
          </p>

          <p className="text-gray-600">
            Our investment team will review your information and contact you when suitable investment opportunities become available.
          </p>

          <p className="text-gray-600">
            Please check your email for confirmation and future updates.
          </p>
        </div>

        <div className="space-y-3">
          <a
            href="https://chat.whatsapp.com/CUtQEf4CkNI1zeYyo7cUVs?s=cl&p=i&mlu=1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition"
          >
            📱 Join WhatsApp Group for Faster Alerts
          </a>

          <Link
            href="/invest"
            className="inline-block w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-lg transition"
          >
            ← Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
