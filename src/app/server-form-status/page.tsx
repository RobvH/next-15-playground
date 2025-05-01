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
      shouldFail
    })
    
    redirect(`/server-form/success?conf=${confirmationId}`)
  }

  return (
    <form action={createUser} className="max-w-md mx-auto mt-8 p-8 bg-white rounded-lg shadow-md">
      <div className="mb-6">
        <label className="block">
          <span className="text-gray-700 font-medium mb-2 block">First Name</span>
          <input
            required
            type="text"
            name="firstName"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </label>
      </div>
      
      <div className="mb-6">
        <label className="block">
          <span className="text-gray-700 font-medium mb-2 block">Last Name</span>
          <input
            required
            type="text"
            name="lastName"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </label>
      </div>
      
      <div className="mb-6">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            name="shouldFail"
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <span className="text-gray-700 font-medium">Should fail?</span>
        </label>
      </div>
      
      <SubmitButton />
    </form>
  );
}
