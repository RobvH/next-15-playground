# server-form-status

Extends on server-form-status, handling status with the React
useActionState hook, instead. This requires the form to change to
a client component. The hook provides the bridge between the client form
and server action; tracking state and returns. This allows us to add
server form validation with client messages.

- Client component form
  - useActionState
- SubmitButton component
  - now takes isPending state as a prop
  - server rendered
- Async Server action w/ result
- Success page
  - uses server side search params access
  - error.tsx support
