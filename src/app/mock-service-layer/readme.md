# server-form-status

Extends the client-form-server-action-zod.

- *NEW Mock Service Layer*
- Client component form
    - useActionState
- SubmitButton component
    - now takes isPending state as a prop
    - server rendered
- Async Server action w/ result
- Success page
    - uses server side search params access
    - error.tsx support
- Server action with zod schema validation
- Includes a SSR-friendly implementation of tracking HOC
