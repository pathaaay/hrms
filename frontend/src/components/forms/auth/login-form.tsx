import { useLoginMutation } from "@/api/mutations/auth";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { LoginSchema, type LoginSchemaType } from "@/lib/schemas/login-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

export const LoginForm = () => {
  const { mutate: login, data: response, isPending } = useLoginMutation();

  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onFormSubmit = (values: LoginSchemaType) => {
    login(values);
    const token = response?.data?.token;
    if (response?.data?.token && response?.data?.token != null) {
      localStorage.setItem("access_token", token);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onFormSubmit)}>
      <FieldSet className="w-full max-w-xs">
        <FieldGroup>
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  {...field}
                  aria-invalid={fieldState.invalid}
                  id="email"
                  placeholder="Enter email"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  {...field}
                  aria-invalid={fieldState.invalid}
                  id="password"
                  placeholder="Enter password"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Field>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Login" : "Please wait..."}
            </Button>
          </Field>
        </FieldGroup>
      </FieldSet>
    </form>
  );
};
