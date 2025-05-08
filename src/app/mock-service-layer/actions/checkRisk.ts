'use server'

import { z } from 'zod'
import { RiskStatus } from './RiskStatusEnum'
import { assessRisk } from '../services/risk'

type Errors = {
  firstName?: string
}

export type CheckRiskActionState = {
  errors: Errors
  values?: Record<string, FormDataEntryValue>
  riskStatus?: RiskStatus
}

const riskCheckSchema = z.object({
  firstName: z.string().nonempty('First name is required.'),
})

export async function checkRisk(
  prevState: CheckRiskActionState,
  formData: FormData,
): Promise<CheckRiskActionState> {
  const formDataObject = Object.fromEntries(formData.entries())

  const parseResult = riskCheckSchema.safeParse(formDataObject)

  if (!parseResult.success) {
    const errors = parseResult.error.flatten().fieldErrors
    const errorResult: Errors = {}

    if (errors.firstName?.[0]) {
      errorResult.firstName = errors.firstName[0]
    }

    return {
      errors: errorResult,
      values: formDataObject,
    }
  }
  const { firstName } = parseResult.data

  const riskStatus = await assessRisk({
    firstName,
  })

  return {
    errors: {},
    values: formDataObject,
    riskStatus,
  }
}
