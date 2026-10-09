import { revalidateLogic, useForm } from "@tanstack/react-form";
import { useMutation } from "convex/react";
import { PlusIcon } from "lucide-react";

import { api } from "@convex/_generated/api.ts";

import { showErrorToast } from "@/lib/features/show-error-toast.ts";
import { createTodoSchema } from "@/schemas/todo.ts";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/shadcn/field.tsx";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/shadcn/input-group.tsx";

export function TodoForm() {
  const createTodo = useMutation(api.todos.create);

  const form = useForm({
    defaultValues: { text: "" },
    validationLogic: revalidateLogic(),
    validators: { onDynamic: createTodoSchema },
    onSubmit: async ({ value, formApi }) => {
      try {
        await createTodo({ text: value.text });
        formApi.reset();
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
        <form.Field name="text">
          {(field) => {
            const isInvalid = !field.state.meta.isValid;

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name} className="sr-only">
                  New todo
                </FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    placeholder="What needs to be done?"
                    autoComplete="off"
                    aria-invalid={isInvalid}
                  />
                  <InputGroupAddon align="inline-end">
                    <form.Subscribe selector={(state) => state.isSubmitting}>
                      {(isSubmitting) => (
                        <InputGroupButton type="submit" disabled={isSubmitting}>
                          <PlusIcon data-icon="inline-start" />
                          Add
                        </InputGroupButton>
                      )}
                    </form.Subscribe>
                  </InputGroupAddon>
                </InputGroup>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>
      </FieldGroup>
    </form>
  );
}
