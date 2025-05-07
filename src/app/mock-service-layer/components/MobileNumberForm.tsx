'use client'

import { useActionState, useEffect } from 'react'
import {
  requestVerification,
  RequestVerificationState,
} from '../actions/requestVerification'
import { SubmitButton } from './SubmitButton'

type Props = {
  onVerificationRequested: () => void
}

export function MobileNumberForm({ onVerificationRequested }: Props) {
  const initialState: RequestVerificationState = {
    errors: {},
  }

  const [state, action, isPending] = useActionState(
    requestVerification,
    initialState,
  )

  // avoid calling callback directly during the render phase
  useEffect(() => {
    if (state.success) {
      onVerificationRequested()
    }
  }, [state.success, onVerificationRequested])

  return (
    <form
      action={action}
      className="mx-auto mt-8 max-w-md rounded-lg bg-white p-8 shadow-md"
    >
      <div className="mb-6">
        <label className="block">
          <span className="mb-2 block font-medium text-gray-700">
            Mobile Number
          </span>
          <input
            type="tel"
            name="mobileNumber"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            defaultValue={state.values?.mobileNumber || ''}
          />
        </label>
        {state.errors.mobileNumber && (
          <p className="mt-2 text-sm text-red-600">
            {state.errors.mobileNumber}
          </p>
        )}
      </div>

      <SubmitButton isPending={isPending} />
    </form>
  )
}
