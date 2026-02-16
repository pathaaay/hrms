import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { Switch } from "../ui/switch";
import { Textarea } from "../ui/textarea";
import { MultiSelect, type MultiSelectOption } from "../common/multi-select";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export type ICustomFormField<T> = {
  key: Path<T>;
  label: string;
  placeholder?: string;
  type?: "multi-select" | "select" | "textarea" | "switch" | "number";
  className?: string;
  options?: MultiSelectOption[];
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
      {formFields.map(
        ({ label, key, placeholder, className, type, options }) => (
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

                {type === "multi-select" && (
                  <MultiSelect
                    options={options || []}
                    defaultValue={field.value}
                    className="dark:bg-input/30"
                    onValueChange={(value) => {
                      field.onChange(value);
                    }}
                  />
                )}

                {type === "select" && (
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder={placeholder} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {options?.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}

                {type === "textarea" && (
                  <Textarea {...field} id={key} placeholder={placeholder} />
                )}

                {type === "switch" && (
                  <Switch
                    id={key}
                    onCheckedChange={field.onChange}
                    defaultChecked={field.value}
                  />
                )}

                {(!type || type === "number") && (
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    id={key}
                    type={type}
                    placeholder={placeholder}
                  />
                )}

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        ),
      )}
    </>
  );
};
