// success.tsx
import { getUser } from '../users'
import { redirect } from 'next/navigation'

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const conf = params.conf

  if (!conf || typeof conf !== 'string') {
    redirect('/server-form')
  }

  // do not use timestamps for ids, ever, this is just a demo
  const userId = parseInt(conf, 10)

  const userInfo = await getUser(userId)

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-xl">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-gray-800">Success!</h1>
          <div className="mx-auto h-1 w-16 rounded bg-green-500"></div>
        </div>

        <div className="space-y-4">
          <div className="rounded-lg bg-gray-50 p-4">
            <p className="text-sm text-gray-600">First Name</p>
            <p className="text-lg font-semibold text-gray-800">
              {userInfo.firstName}
            </p>
          </div>

          <div className="rounded-lg bg-gray-50 p-4">
            <p className="text-sm text-gray-600">Last Name</p>
            <p className="text-lg font-semibold text-gray-800">
              {userInfo.lastName}
            </p>
          </div>

          <div className="rounded-lg bg-gray-50 p-4">
            <p className="text-sm text-gray-600">Status</p>
            <div className="mt-1 flex items-center">
              <span
                className={`mr-2 inline-block h-3 w-3 rounded-full ${userInfo.shouldFail ? 'bg-red-500' : 'bg-green-500'}`}
              ></span>
              <p className="text-lg font-semibold text-gray-800">
                {userInfo.shouldFail ? 'Failed' : 'Successful'}
              </p>
            </div>
          </div>

          <div className="rounded-lg bg-gray-50 p-4">
            <p className="text-sm text-gray-600">Confirmation ID</p>
            <p className="text-lg font-semibold text-gray-800">{conf}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
