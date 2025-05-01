'use server'

import { addUser } from '@/app/client-form-server-action/services/users'
import { redirect } from 'next/navigation'

type Errors = {
  firstName?: string
  lastName?: string
}

export type CreateUserActionState = {
  errors: Errors
}

export async function createUser(prevState: CreateUserActionState, formData: FormData) {

  const firstName = formData.get('firstName') as string
  const lastName = formData.get('lastName') as string
  const shouldFail = formData.get('shouldFail') === 'on'

  const errors: Errors = {}

  if (!firstName) {
    errors.firstName = "First Name is required"
  }

  if (!lastName) {
    errors.lastName = "Last Name is required"
  }

  if (Object.keys(errors).length > 0) {
    return { errors }
  }

  // will save the user as a json to /data
  const confirmationId = await addUser({
    firstName,
    lastName,
    shouldFail
  })

  redirect(`/client-form-server-action/success?conf=${confirmationId}`)
}
