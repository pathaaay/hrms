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
import { DatePicker } from "./date-picker";
import type { Matcher } from "react-day-picker";

export type ICustomFormField<T> = {
  key: Path<T>;
  label: string;
  placeholder?: string;
  type?: "multi-select" | "select" | "textarea" | "switch" | "number" | "date";
  className?: string;
  options?: MultiSelectOption[];
  disable?: Matcher;
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
        ({ label, key, placeholder, className, type, options, disable }) => (
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
                  <Select value={field.value} onValueChange={field.onChange}>
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

                {type === "date" && (
                  <DatePicker
                    label={
                      field.value
                        ? new Date(field.value).toLocaleDateString()
                        : placeholder || "Select date"
                    }
                    value={field.value}
                    disable={disable || false}
                    onChange={(date) => {
                      field.onChange(date);
                    }}
                  />
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
                    onChange={(e) =>
                      field.onChange(type === "number" ? Number(e.target.value) : e.target.value)
                    } 
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
