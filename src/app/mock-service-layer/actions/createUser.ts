'use server'

import { addUser } from '../services/users'
import { redirect } from 'next/navigation'
import { z } from 'zod'

type Errors = {
  firstName?: string
  lastName?: string
}

export type CreateUserActionState = {
  errors: Errors
  values?: Record<string, FormDataEntryValue>
}

const userSchema = z.object({
  firstName: z.string().nonempty('First name is required.'),
  lastName: z.string().nonempty('Last name is required.'),
  shouldFail: z
    .literal('on')
    .optional()
    .transform((val) => val === 'on'),
})

export async function createUser(
  prevState: CreateUserActionState,
  formData: FormData,
): Promise<CreateUserActionState> {
  const formDataObject = Object.fromEntries(formData.entries())

  const parseResult = userSchema.safeParse(formDataObject)

  if (!parseResult.success) {
    const errors = parseResult.error.flatten().fieldErrors
    const errorResult: Errors = {}

    if (errors.firstName?.[0]) {
      errorResult.firstName = errors.firstName[0]
    }
    if (errors.lastName?.[0]) {
      errorResult.lastName = errors.lastName[0]
    }

    return {
      errors: errorResult,
      values: formDataObject,
    }
  }

  const { firstName, lastName, shouldFail } = parseResult.data

  // will save the user as a json to /data
  const confirmationId = await addUser({
    firstName,
    lastName,
    shouldFail,
  })

  redirect(`/mock-service-layer/success?conf=${confirmationId}`)
}
