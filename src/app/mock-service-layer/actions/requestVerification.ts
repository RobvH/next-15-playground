// mock-service-layer/actions/requestVerification.ts
'use server'

export type RequestVerificationState = {
  success?: boolean
  errors: {
    mobileNumber?: string
  }
  values?: {
    mobileNumber?: string
  }
}

export async function requestVerification(
  prevState: RequestVerificationState,
  formData: FormData,
): Promise<RequestVerificationState> {
  const mobileNumber = formData.get('mobileNumber') as string

  // Validate mobile number here
  if (!mobileNumber || mobileNumber.trim() === '') {
    return {
      errors: {
        mobileNumber: 'Mobile number is required',
      },
      values: { mobileNumber },
    }
  }

  // Mock successful verification request
  return {
    success: true,
    errors: {},
    values: { mobileNumber },
  }
}
