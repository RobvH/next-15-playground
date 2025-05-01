'use client'

import { createUser, CreateUserActionState } from '@/app/client-form-server-action/actions/createUser'
import { useActionState } from 'react'
import { SubmitButton } from './SubmitButton'

// Server component that uses a server-action
export default function CreateUserPage() {
  const initialState: CreateUserActionState = {
    errors: {}
  }

  // this bridges the client form to the server action; and gives status
  // preferable to useFormStatus bc works with any action
  // also useFormStatus would show pending anytime any form is pending; not this one
  const [state, createUserAction, isPending] = useActionState(createUser, initialState)

  return (
    <form action={createUserAction} className="max-w-md mx-auto mt-8 p-8 bg-white rounded-lg shadow-md">
      <div className="mb-6">
        <label className="block">
          <span className="text-gray-700 font-medium mb-2 block">First Name</span>
          <input
            type="text"
            name="firstName"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </label>
        {state.errors.firstName && (
          <p className="mt-2 text-sm text-red-600">
            {state.errors.firstName}
          </p>
        )}
      </div>

      <div className="mb-6">
        <label className="block">
          <span className="text-gray-700 font-medium mb-2 block">Last Name</span>
          <input
            type="text"
            name="lastName"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </label>
        {state.errors.lastName && (
          <p className="mt-2 text-sm text-red-600">
            {state.errors.lastName}
          </p>
        )}
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
      
      <SubmitButton isPending={isPending} />
    </form>
  );
}
