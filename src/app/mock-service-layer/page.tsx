'use client'

import { createUser, type CreateUserActionState } from './actions/createUser'
import { useActionState, useState } from 'react'
import { SubmitButton } from './components/SubmitButton'
import { MobileNumberForm } from './components/MobileNumberForm'
import { VerificationCodeForm } from './components/VerificationCodeForm'
import { checkRisk } from './actions/checkRisk'
import { RiskStatus } from './actions/RiskStatusEnum'

export default function CreateUserPage() {
  const [showMobileForm, setShowMobileForm] = useState(false)
  const [showVerificationForm, setShowVerificationForm] = useState(false)
  const [formData, setFormData] = useState<FormData | null>(null)

  const initialState: CreateUserActionState = {
    errors: {},
  }

  const [state, createUserAction, isPending] = useActionState(
    createUser,
    initialState,
  )

  const [riskState, checkRiskAction] = useActionState(
    async (prevState: CreateUserActionState, formData: FormData) => {
      setFormData(formData) // Store form data for later use

      const riskResult = await checkRisk(formData)
      if (riskResult.riskStatus === RiskStatus.VERIFY) {
        setShowMobileForm(true)
        return { ...prevState, needsVerification: true }
      } else {
        // If no verification needed, proceed with user creation
        return createUserAction(formData)
      }
    },
    initialState,
  )

  // const handleFormSubmit = async (prevState: CheckRiskActionState, formData: FormData) => {
  //   setFormData(formData)
  //
  //   const riskCheck = await checkRisk(formData)
  //   if (riskCheck.riskStatus === RiskStatus.VERIFY) {
  //     setShowMobileForm(true)
  //   } else {
  //     // If no verification needed, proceed with user creation
  //     createUserAction(formData)
  //   }
  // }

  const handleVerificationRequested = () => {
    setShowMobileForm(false)
    setShowVerificationForm(true)
  }

  const handleVerificationComplete = () => {
    setShowVerificationForm(false)
    if (formData) {
      createUserAction(formData)
    }
  }

  const handleVerificationFailure = () => {
    setShowVerificationForm(false)
    setShowMobileForm(false)
    // Reset the stored form data
    setFormData(null)
  }

  if (showMobileForm) {
    return (
      <MobileNumberForm onVerificationRequested={handleVerificationRequested} />
    )
  }

  if (showVerificationForm) {
    return (
      <VerificationCodeForm
        onVerificationComplete={handleVerificationComplete}
        onVerificationFailure={handleVerificationFailure}
      />
    )
  }

  return (
    <form
      action={checkRiskAction}
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
            defaultValue={(state.values?.firstName as string) ?? ''}
            data-click-tracker=""
            data-name="firstName"
            data-element-type="input"
            data-location="create-user-form"
            data-event-name="FieldInput"
            data-sensitive="true"
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
            defaultValue={(state.values?.lastName as string) ?? ''}
            data-click-tracker=""
            data-name="lastName"
            data-element-type="input"
            data-location="create-user-form"
            data-event-name="FieldInput"
            data-sensitive="true"
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
            defaultChecked={state.values?.shouldFail === 'on'}
            data-click-tracker=""
            data-name="shouldFail"
            data-element-type="checkbox"
            data-location="create-user-form"
            data-text="Should fail?"
            data-event-name="FieldInput"
          />
          <span className="font-medium text-gray-700">Should fail?</span>
        </label>
      </div>

      <SubmitButton
        isPending={isPending}
        clickTracker={{
          eventName: 'ElementClicked',
          name: 'signup-submit',
          text: 'Continue',
          location: 'signup-form',
          elementType: 'button',
        }}
      />
    </form>
  )
}
