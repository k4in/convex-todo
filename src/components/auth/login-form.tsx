import { useState } from "react";
import { revalidateLogic, useForm } from "@tanstack/react-form";
import { useConvex } from "convex/react";
import { LogInIcon } from "lucide-react";

import { api } from "@convex/_generated/api.ts";

import { normalizeUserKey } from "@/lib/utils/user-key.ts";
import { showErrorToast } from "@/lib/features/show-error-toast.ts";
import { loginSchema } from "@/schemas/user-key.ts";
import { useUserKey } from "@/hooks/useUserKey.tsx";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/shadcn/field.tsx";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/shadcn/input-group.tsx";

export function LoginForm() {
  const convex = useConvex();
  const { saveUserKey } = useUserKey();
  const [isUnknownKey, setIsUnknownKey] = useState(false);

  const form = useForm({
    defaultValues: { key: "" },
    validationLogic: revalidateLogic(),
    validators: { onDynamic: loginSchema },
    onSubmit: async ({ value }) => {
      const key = normalizeUserKey(value.key);

      try {
        const user = await convex.query(api.users.me, { key });

        if (user) {
          saveUserKey(key);
        } else {
          setIsUnknownKey(true);
        }
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
        <form.Field name="key">
          {(field) => {
            const isInvalid = !field.state.meta.isValid || isUnknownKey;

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Already have a code?</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => {
                      setIsUnknownKey(false);
                      field.handleChange(event.target.value);
                    }}
                    placeholder="XXXX-XXXX-XXXX-XXXX-XXXX"
                    autoComplete="off"
                    spellCheck={false}
                    className="font-mono"
                    aria-invalid={isInvalid}
                  />
                  <InputGroupAddon align="inline-end">
                    <form.Subscribe selector={(state) => state.isSubmitting}>
                      {(isSubmitting) => (
                        <InputGroupButton type="submit" disabled={isSubmitting}>
                          <LogInIcon data-icon="inline-start" />
                          Log in
                        </InputGroupButton>
                      )}
                    </form.Subscribe>
                  </InputGroupAddon>
                </InputGroup>
                {!field.state.meta.isValid && <FieldError errors={field.state.meta.errors} />}
                {isUnknownKey && <FieldError>This code is unknown.</FieldError>}
              </Field>
            );
          }}
        </form.Field>
      </FieldGroup>
    </form>
  );
}
