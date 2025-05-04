'use client'

import {
  createUser,
  CreateUserActionState,
} from '@/app/client-form-server-action/actions/createUser'
import { useActionState } from 'react'
import { SubmitButton } from './SubmitButton'

// Server component that uses a server-action
export default function CreateUserPage() {
  const initialState: CreateUserActionState = {
    errors: {},
  }

  // this bridges the client form to the server action; and gives status
  // preferable to useFormStatus bc works with any action
  // also useFormStatus would show pending anytime any form is pending; not this one
  const [state, createUserAction, isPending] = useActionState(
    createUser,
    initialState,
  )

  return (
    <form
      action={createUserAction}
      className="mx-auto mt-8 max-w-md rounded-lg bg-white p-8 shadow-md"
    >
      <div className="mb-6">
        <label className="block">
          <span className="mb-2 block font-medium text-gray-700">
            First Name
          </span>
          <input
            type="text"
            name="firstName"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            defaultValue={state.values?.firstName || ''}
            data-click-tracker
            data-name="firstName"
            data-element-type="input"
            data-location="create-user-form"
          />
        </label>
        {state.errors.firstName && (
          <p className="mt-2 text-sm text-red-600">{state.errors.firstName}</p>
        )}
      </div>

      <div className="mb-6">
        <label className="block">
          <span className="mb-2 block font-medium text-gray-700">
            Last Name
          </span>
          <input
            type="text"
            name="lastName"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            defaultValue={state.values?.lastName || ''}
            data-click-tracker
            data-name="lastName"
            data-element-type="input"
            data-location="create-user-form"
          />
        </label>
        {state.errors.lastName && (
          <p className="mt-2 text-sm text-red-600">{state.errors.lastName}</p>
        )}
      </div>

      <div className="mb-6">
        <label className="flex cursor-pointer items-center space-x-2">
          <input
            type="checkbox"
            name="shouldFail"
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            defaultChecked={state.values?.shouldFail === true}
            data-click-tracker
            data-name="shouldFail"
            data-element-type="checkbox"
            data-location="create-user-form"
            data-text="Should fail?"
          />
          <span className="font-medium text-gray-700">Should fail?</span>
        </label>
      </div>

      <SubmitButton isPending={isPending} />
    </form>
  )
}
