// error components must be client components
'use client'

export default function Error({
  error,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-red-50 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-xl">
        <h2 className="mb-4 text-2xl font-bold text-red-600">
          Error Loading User Information
        </h2>
        <p className="mb-4 text-gray-600">
          {error.message ||
            'Please make sure you have a valid confirmation ID and try again.'}
        </p>
      </div>
    </div>
  )
}
