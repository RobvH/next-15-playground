'use server'

import { addUser } from '@/app/client-form-server-action/services/users'
import { redirect } from 'next/navigation'
import { z } from 'zod'

type Errors = {
  firstName?: string
  lastName?: string
}

export type CreateUserActionState = {
  errors: Errors
  values?: {
    firstName?: string
    lastName?: string
    shouldFail?: boolean
  }
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
) {
  const formDataObject = Object.fromEntries(formData.entries())

  const parseResult = userSchema.safeParse(formDataObject)

  if (!parseResult.success) {
    const errors = parseResult.error.flatten().fieldErrors
    return {
      errors: {
        firstName: errors.firstName?.[0],
        lastName: errors.lastName?.[0],
      },
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

  redirect(`/client-form-server-action/success?conf=${confirmationId}`)
}
