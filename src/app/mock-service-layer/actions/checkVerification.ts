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

export async function checkVerification(
  prevState: CheckVerificationState,
  formData: FormData,
): Promise<CheckVerificationState> {
  const code = formData.get('code') as string
  // @todo debug that this gets called
  // Validate verification code
  if (!code || code.trim() === '') {
    return {
      errors: {
        code: 'Verification code is required',
      },
      values: { code },
    }
  }

  if (code === '999999') {
    return {
      success: false,
      errors: {},
      values: { code },
    }
  }

  // Mock verification check
  return {
    success: true,
    errors: {},
    values: { code },
  }
}
