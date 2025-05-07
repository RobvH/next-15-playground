// mock-service-layer/components/VerificationCodeForm.tsx
'use client'

import { useActionState, useEffect } from 'react'
import {
  checkVerification,
  CheckVerificationState,
} from '../actions/checkVerification'
import { SubmitButton } from './SubmitButton'

type Props = {
  onVerificationComplete: () => void
}

export function VerificationCodeForm({ onVerificationComplete }: Props) {
  const initialState: CheckVerificationState = {
    errors: {},
  }

  const [state, action, isPending] = useActionState(
    checkVerification,
    initialState,
  )

  useEffect(() => {
    if (state.success) {
      onVerificationComplete()
    }
  }, [state.success, onVerificationComplete])

  return (
    <form
      action={action}
      className="mx-auto mt-8 max-w-md rounded-lg bg-white p-8 shadow-md"
    >
      <div className="mb-6">
        <label className="block">
          <span className="mb-2 block font-medium text-gray-700">
            Verification Code
          </span>
          <input
            type="text"
            name="code"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            defaultValue={state.values?.code || ''}
          />
        </label>
        {state.errors.code && (
          <p className="mt-2 text-sm text-red-600">{state.errors.code}</p>
        )}
      </div>

      <SubmitButton isPending={isPending} />
    </form>
  )
}
