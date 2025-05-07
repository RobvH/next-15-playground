type SubmitButtonProps = {
  isPending: boolean
  /** Click tracking attributes */
  clickTracker?: {
    eventName?: string
    name?: string
    text?: string
    location?: string
    elementType?: string
    sensitive?: boolean
  }
}

export function SubmitButton({ isPending, clickTracker }: SubmitButtonProps) {
  const trackingProps = clickTracker
    ? {
        'data-click-tracker': true,
        'data-event-name': clickTracker.eventName || 'ElementClicked',
        'data-name': clickTracker.name,
        'data-text': clickTracker.text,
        'data-location': clickTracker.location,
        'data-element-type': clickTracker.elementType || 'button',
      }
    : {}

  return (
    <button
      type="submit"
      disabled={isPending}
      className={`w-full ${
        isPending ? 'bg-blue-400' : 'bg-blue-500 hover:bg-blue-600'
      } flex items-center justify-center rounded-md px-4 py-2 text-white transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none`}
      {...trackingProps}
    >
      {isPending ? (
        <>
          <svg
            className="mr-3 -ml-1 h-5 w-5 animate-spin text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Processing...
        </>
      ) : (
        'Continue'
      )}
    </button>
  )
}
