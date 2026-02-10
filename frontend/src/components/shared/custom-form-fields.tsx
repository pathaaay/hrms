import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

export type ICustomFormField<T> = {
  key: Path<T>;
  label: string;
  placeholder?: string;
  type?: string;
  className?: string;
}[];

export interface IFormFieldProps<T extends FieldValues> {
  control: Control<T>;
  formFields: ICustomFormField<T>;
  fieldClass?: string;
}

export const CustomFormFields = <T extends FieldValues>({
  control,
  formFields,
  fieldClass,
}: IFormFieldProps<T>) => {
  return (
    <>
      {formFields.map(({ label, key, placeholder, className, type }) => (
        <Controller
          key={key}
          name={key}
          control={control}
          render={({ field, fieldState }) => (
            <Field
              data-invalid={fieldState.invalid}
              className={cn(fieldClass, className)}
            >
              <FieldLabel htmlFor={key}>{label}</FieldLabel>

              {type === "switch" ? (
                // <Switch id={key} defaultChecked />
                <></>
              ) : (
                <Input
                  {...field}
                  aria-invalid={fieldState.invalid}
                  id={key}
                  type={type}
                  placeholder={placeholder}
                />
              )}
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      ))}
    </>
  );
};
