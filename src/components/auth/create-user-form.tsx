import { revalidateLogic, useForm } from "@tanstack/react-form";
import { useMutation } from "convex/react";
import { KeyRoundIcon } from "lucide-react";

import { api } from "@convex/_generated/api.ts";

import { generateUserKey } from "@/lib/features/generate-user-key.ts";
import { showErrorToast } from "@/lib/features/show-error-toast.ts";
import { createUserSchema } from "@/schemas/user.ts";
import { useUserKey } from "@/hooks/useUserKey.tsx";
import { Button } from "@/components/shadcn/button.tsx";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/shadcn/field.tsx";
import { Input } from "@/components/shadcn/input.tsx";

export function CreateUserForm() {
  const { saveUserKey } = useUserKey();
  const createUser = useMutation(api.users.create);

  const form = useForm({
    defaultValues: { name: "" },
    validationLogic: revalidateLogic(),
    validators: { onDynamic: createUserSchema },
    onSubmit: async ({ value }) => {
      const key = generateUserKey();

      try {
        await createUser({ key, name: value.name });
        saveUserKey(key, true);
      } catch (error) {
        showErrorToast(error);
      }
    },
  });

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        void form.handleSubmit();
      }}
    >
      <FieldGroup>
        <form.Field name="name">
          {(field) => {
            const isInvalid = !field.state.meta.isValid;

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Your name</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                  placeholder="e.g. Herbert"
                  autoComplete="nickname"
                  aria-invalid={isInvalid}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>
        <form.Subscribe selector={(state) => ({ name: state.values.name, isSubmitting: state.isSubmitting })}>
          {({ name, isSubmitting }) => (
            <Button type="submit" disabled={name.trim().length < 3 || isSubmitting}>
              <KeyRoundIcon data-icon="inline-start" />
              Generate new code
            </Button>
          )}
        </form.Subscribe>
      </FieldGroup>
    </form>
  );
}
