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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Success!</h1>
          <div className="h-1 w-16 bg-green-500 mx-auto rounded"></div>
        </div>

        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">First Name</p>
            <p className="text-lg font-semibold text-gray-800">{userInfo.firstName}</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Last Name</p>
            <p className="text-lg font-semibold text-gray-800">{userInfo.lastName}</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Status</p>
            <div className="flex items-center mt-1">
              <span
                className={`inline-block w-3 h-3 rounded-full mr-2 ${userInfo.shouldFail ? 'bg-red-500' : 'bg-green-500'}`}></span>
              <p className="text-lg font-semibold text-gray-800">
                {userInfo.shouldFail ? 'Failed' : 'Successful'}
              </p>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Confirmation ID</p>
            <p className="text-lg font-semibold text-gray-800">{conf}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
