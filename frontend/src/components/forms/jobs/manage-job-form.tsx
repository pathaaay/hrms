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
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { JobSchema, type JobSchemaType } from "@/lib/schemas/job-schema";
import { useFetchAllUsers } from "@/hooks/user/use-fetch-all-users";
import { useEffect, useState } from "react";
import { createMultiSelectOption } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { useDocumentMutation } from "@/api/mutations/document";
import {
  useCreateJobMutation,
  useUpdateJobMutation,
} from "@/api/mutations/job";
import { emitGoBack } from "@/lib/helpers/events/go-back-event";
import { useJob } from "@/hooks/job/use-job";

const formFields: ICustomFormField<JobSchemaType> = [
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

export const ManageJobForm = ({ jobId }: { jobId?: string }) => {
  const { users, isPending } = useFetchAllUsers();
  const { jobs, isLoading } = useJob();
  const [fields, setFields] = useState(formFields);
  const [files, setFiles] = useState<FileList | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const { mutateAsync: handleUploadAsync, isPending: isDocumentCreating } =
    useDocumentMutation();
  const {
    mutate: handleCreateJob,
    isPending: isJobCreating,
    isSuccess,
  } = useCreateJobMutation();

  const {
    mutate: handleUpdateJob,
    isPending: isJobUpdating,
    isSuccess: isUpdateSuccess,
  } = useUpdateJobMutation();

  const form = useForm({
    resolver: zodResolver(JobSchema),
    defaultValues: {
      title: "",
      defaultHrEmail: "",
      description: "",
      jdFileId: null,
      reviewerIds: [],
    },
  });

  useEffect(() => {
    if (!isSuccess) return;
    handleGoBack();
  }, [isSuccess]);

  useEffect(() => {
    if (!isUpdateSuccess) return;
    handleGoBack();
  }, [isUpdateSuccess]);

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

  useEffect(() => {
    if (jobId && !isLoading) {
      const singleJob = jobs.find(({ id }) => id === Number(jobId));
      if (!singleJob) handleGoBack();

      form.reset({
        defaultHrEmail: singleJob?.defaultHrEmail,
        description: singleJob?.description,
        reviewerIds: singleJob?.jobReviewers?.map(({ id }) => String(id)) || [],
        title: singleJob?.title,
        jdFileId: null,
      });
    }
  }, [jobId, jobs, isLoading]);

  const handleGoBack = () => {
    setTimeout(() => {
      emitGoBack("/jobs");
    }, 200);
  };

  const onFormSubmit = async (values: JobSchemaType) => {
    if (!jobId) {
      if (!files || files?.length < 0) {
        setFileError("File is required");
        return;
      }
    }

    let data;
    if (!jobId || (files && files?.length > 0))
      data = await handleUploadAsync(files);

    if (jobId) {
      const newValue = {
        ...values,
        jobId: jobId,
      };

      if (data?.id) newValue.jdFileId = data.id;
      handleUpdateJob(newValue);
    } else {
      const newValue = {
        ...values,
        jdFileId: data.id,
      };
      handleCreateJob(newValue);
    }
  };

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Create Job</DialogTitle>
        <DialogDescription hidden></DialogDescription>
      </DialogHeader>
      <form
        onSubmit={form.handleSubmit(onFormSubmit)}
        className="flex flex-col gap-2"
      >
        <ScrollArea className="max-h-[80vh] pr-1">
          <FieldGroup className="flex items-center flex-col gap-3 px-1.5">
            <CustomFormFields<JobSchemaType>
              fieldClass="gap-1"
              control={form.control}
              formFields={fields}
            />
            <Field data-invalid={fileError} className="gap-1">
              <FieldLabel htmlFor="picture">JD Document (.pdf)</FieldLabel>
              <Input
                onChange={(e) => {
                  setFileError("");
                  setFiles(e.target.files);
                }}
                id="picture"
                type="file"
                accept=".pdf"
              />
              {fileError && <FieldError>{fileError}</FieldError>}
            </Field>
          </FieldGroup>
        </ScrollArea>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" size={"sm"}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="submit"
            disabled={
              isDocumentCreating ||
              isJobCreating ||
              isJobUpdating ||
              (!form.formState.isDirty && !files?.length)
            }
            size={"sm"}
          >
            {isDocumentCreating || isJobCreating || isJobUpdating
              ? "Please wait..."
              : "Save changes"}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};
