// mock-service-layer/actions/checkVerification.ts
'use server'

export type CheckVerificationState = {
  success?: boolean
  errors: {
    code?: string
  }
  values?: {
    code?: string
  }
}

export async function checkVerification(prevState: CheckVerificationState, formData: FormData): Promise<CheckVerificationState> {
  const code = formData.get('code') as string

  // Validate verification code
  if (!code || code.trim() === '') {
    return {
      errors: {
        code: 'Verification code is required'
      },
      values: { code }
    }
  }

  // Mock verification check
  return {
    success: true,
    errors: {},
    values: { code }
  }
}