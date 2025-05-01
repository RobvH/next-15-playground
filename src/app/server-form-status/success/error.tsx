// error components must be client components
'use client'

export default function Error({ error }: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-red-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading User Information</h2>
        <p className="text-gray-600 mb-4">
          {error.message || 'Please make sure you have a valid confirmation ID and try again.'}
        </p>
      </div>
    </div>
  )
}
