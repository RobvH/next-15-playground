# server-form-status

Extends the features of server-form:

- Server component form
- Async Server action w/ result
- Search Params to server component (success page)
- error.tsx support

And adds:

- Extracts the submit button a separate component
- It can be a client component, without making the whole form client
- Can use the `useFormStatus` hook
- Disables and adds spinner to button while status is pending
