# server-form-status

Extends the client-form-server-action.

- Client component form
    - useActionState
- SubmitButton component
    - now takes isPending state as a prop
    - server rendered
- Async Server action w/ result
- Success page
    - uses server side search params access
    - error.tsx support
- *New* Server action with zod schema validation
- *New* Includes a SSR-friendly implementation of tracking HOC
