import { addUser } from './users'
import { redirect } from 'next/navigation'
import { SubmitButton } from './SubmitButton' // adjust the import path as needed

// Server component that uses a server-action
export default function CreateUserPage() {
  async function createUser(formData: FormData) {
    'use server'

    const firstName = formData.get('firstName') as string
    const lastName = formData.get('lastName') as string
    const shouldFail = formData.get('shouldFail') === 'on'

    // will save the user as a json to /data
    const confirmationId = await addUser({
      firstName,
      lastName,
      shouldFail,
    })

    redirect(`/server-form/success?conf=${confirmationId}`)
  }

  return (
    <form
      action={createUser}
      className="mx-auto mt-8 max-w-md rounded-lg bg-white p-8 shadow-md"
    >
      <div className="mb-6">
        <label className="block">
          <span className="mb-2 block font-medium text-gray-700">
            First Name
          </span>
          <input
            required
            type="text"
            name="firstName"
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </label>
      </div>

      <div className="mb-6">
        <label className="block">
          <span className="mb-2 block font-medium text-gray-700">
            Last Name
          </span>
          <input
            required
            type="text"
            name="lastName"
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </label>
      </div>

      <div className="mb-6">
        <label className="flex cursor-pointer items-center space-x-2">
          <input
            type="checkbox"
            name="shouldFail"
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="font-medium text-gray-700">Should fail?</span>
        </label>
      </div>

      <SubmitButton />
    </form>
  )
}
