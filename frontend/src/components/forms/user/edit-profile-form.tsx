import { useEditProfileMutation } from "@/api/mutations/user";
import { CustomFormFields } from "@/components/shared/custom-form-fields";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldSet } from "@/components/ui/field";

import {
  EditProfileSchema,
  type EditProfileSchemaType,
} from "@/lib/schemas/profile-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const EditProfile = () => {
  const { mutate: handleEditProfile, isPending } = useEditProfileMutation();

  const form = useForm({
    resolver: zodResolver(EditProfileSchema),
    defaultValues: {
      email: "",
      name: "",
      timezone: "",
    },
  });

  const onFormSubmit = (values: EditProfileSchemaType) => {
    handleEditProfile(values);
  };

  const editProfileFormFields: {
    label: string;
    key: keyof EditProfileSchemaType;
    placeholder: string;
  }[] = [
    {
      label: "Email",
      key: "email",
      placeholder: "email",
    },
    {
      label: "name",
      key: "name",
      placeholder: "name",
    },
    {
      label: "Timezone",
      key: "timezone",
      placeholder: "Select Timezone",
    },
  ];

  return (
    <form onSubmit={form.handleSubmit(onFormSubmit)}>
      <FieldSet className="w-full">
        <FieldGroup>
          <CustomFormFields<EditProfileSchemaType>
            control={form.control}
            formFields={editProfileFormFields}
          />
          <Field>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Please wait..." : "Update Profile"}
            </Button>
          </Field>
        </FieldGroup>
      </FieldSet>
    </form>
  );
};
