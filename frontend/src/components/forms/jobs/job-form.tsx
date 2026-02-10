import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  CustomFormFields,
  type ICustomFormField,
} from "@/components/shared/custom-form-fields";
import { FieldGroup } from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  CreateJobSchema,
  type CreateJobSchemaType,
} from "@/lib/schemas/job-schema";
import { useFetchAllUsers } from "@/hooks/user/use-fetch-all-users";
import { useEffect, useState } from "react";
import { createMultiSelectOption } from "@/lib/utils";

const formFields: ICustomFormField<CreateJobSchemaType> = [
  {
    label: "Job Title",
    key: "title",
    placeholder: "Enter job title",
  },

  {
    label: "Description",
    key: "description",
    type: "textarea",
    placeholder: "Enter job description",
  },
  {
    label: "Default HR email",
    key: "defaultHrEmail",
    placeholder: "Enter job default HR email",
  },
  {
    label: "Select Reviewers",
    key: "reviewerIds",
    type: "multi-select",
    options: [],
  },
];

export const JobForm = ({ jobId }: { jobId?: string }) => {
  console.log({ jobId });
  const { users, isPending } = useFetchAllUsers();
  const [fields, setFields] = useState(formFields);

  const form = useForm({
    resolver: zodResolver(CreateJobSchema),
    defaultValues: {
      title: "",
      defaultHrEmail: "",
      description: "",
      jdFileId: null,
      reviewerIds: [],
    },
  });

  useEffect(() => {
    if (!isPending && users && users?.length > 0) {
      const options = users?.map((user) =>
        createMultiSelectOption(user.userId.toString(), user.name),
      );
      const newFields = fields.map((field) => {
        if (field.key === "reviewerIds") {
          return {
            ...field,
            options,
          };
        }
        return field;
      });

      setFields(newFields);
    }
  }, [users]);

  const onFormSubmit = (values: CreateJobSchemaType) => {
    console.log({ values });
  };

  return (
    <DialogContent className="sm:max-w-sm">
      <DialogHeader>
        <DialogTitle>Create Job</DialogTitle>
        <DialogDescription hidden></DialogDescription>
      </DialogHeader>

      <ScrollArea className="max-h-[80vh] pr-1">
        <FieldGroup className="flex items-center flex-col gap-3">
          <CustomFormFields<CreateJobSchemaType>
            fieldClass="gap-1"
            control={form.control}
            formFields={fields}
          />
        </FieldGroup>
      </ScrollArea>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline" size={"sm"}>
            Cancel
          </Button>
        </DialogClose>
        <Button
          onClick={form.handleSubmit(onFormSubmit)}
          type="submit"
          disabled={isPending || !form.formState.isDirty}
          size={"sm"}
        >
          {/* {isPending ? "Please wait..." : "Save changes"} */}
          submit
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};
