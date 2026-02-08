import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";

interface IFormFieldProps<T extends FieldValues> {
  control: Control<T>;
  formFields: {
    key: Path<T>;
    label: string;
    placeholder: string;
    type?: string;
  }[];
}

export const CustomFormFields = <T extends FieldValues>({
  control,
  formFields,
}: IFormFieldProps<T>) => {
  return (
    <>
      {formFields.map(({ label, key, placeholder }) => (
        <Controller
          key={key}
          name={key}
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={key}>{label}</FieldLabel>
              {
                <Input
                  readOnly
                  disabled
                  {...field}
                  aria-invalid={fieldState.invalid}
                  id={key}
                  placeholder={placeholder}
                />
              }
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      ))}
    </>
  );
};
