import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useDocumentMutation } from "@/api/mutations/document";
import { UploadIcon } from "lucide-react";
import { cn, createMultiSelectOption } from "@/lib/utils";
import {
  type TravelDocumentSchemaType,
  TravelDocumentSchema,
} from "@/lib/schemas/travel/travel-documents-schema";
import { useHasRole } from "@/hooks/user/use-has-role";
import { ROLES, type IUserProfile } from "@/lib/types/user";
import { useCreateTravelDocumentMutation } from "@/api/mutations/travel/travel-document";
import { queryClient } from "@/lib/tanstack-query/query-client";

const formFields: ICustomFormField<TravelDocumentSchemaType> = [
  {
    label: "Title",
    key: "title",
    placeholder: "Enter title",
  },
];

export const UploadDocumentDialog = ({
  travelId,
  users,
}: {
  travelId: number;
  users?: IUserProfile[];
}) => {
  const canAddAddedFor = useHasRole([ROLES.HR]);
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState<FileList | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const { mutateAsync: createTravelDocument, isPending } =
    useCreateTravelDocumentMutation();
  const { mutateAsync: handlFileUpload, isPending: isFileUploading } =
    useDocumentMutation();

  const form = useForm({
    resolver: zodResolver(TravelDocumentSchema),
    defaultValues: {
      travelId: Number(travelId),
      title: "",
      documentId: null,
      addedFor: null,
    },
  });

  const onFormSubmit = async (values: TravelDocumentSchemaType) => {
    console.log("submitted", values);
    if (!files || files?.length < 0) {
      setFileError("CV file is required");
      return;
    }

    let data;
    if (files && files?.length > 0) data = await handlFileUpload(files);

    const newValue = {
      ...values,
      documentId: data.id,
    };
    await createTravelDocument(newValue);
    queryClient.invalidateQueries({
      queryKey: [`travel-documents-${travelId}`],
    });
    setOpen(false);
    form.reset();
  };

  const options = users?.map((user) =>
    createMultiSelectOption(user.userId.toString(), user.name),
  );

  const newFields: ICustomFormField<TravelDocumentSchemaType> = canAddAddedFor
    ? [
        ...formFields,
        {
          label: "Added for",
          key: "addedFor",
          placeholder: "Select added for",
          type: "select",
          options,
        },
      ]
    : formFields;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <UploadIcon />
          Uplod Document
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload Document</DialogTitle>
          <DialogDescription hidden></DialogDescription>
        </DialogHeader>
        <form
          onSubmit={form.handleSubmit(onFormSubmit)}
          className="flex flex-col gap-2"
        >
          <ScrollArea className="max-h-[80vh] pr-1">
            <FieldGroup className="flex items-center flex-col gap-3 px-1.5">
              <CustomFormFields<TravelDocumentSchemaType>
                fieldClass="gap-1"
                control={form.control}
                formFields={newFields}
              />
              <Field className={cn(`gap-1`, fileError && "text-destructive")}>
                <FieldLabel htmlFor="picture">Document</FieldLabel>
                <Input
                  onChange={(e) => {
                    setFileError("");
                    setFiles(e.target.files);
                  }}
                  className={cn(fileError && "text-destructive")}
                  id="picture"
                  type="file"
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
                isFileUploading ||
                isPending ||
                (!form.formState.isDirty && !files)
              }
              size={"sm"}
            >
              {isFileUploading || isPending ? "Please wait..." : "Upload"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
