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
import {
  ReferFriendSchema,
  type ReferFriendSchemaType,
} from "@/lib/schemas/job-schema";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { useDocumentMutation } from "@/api/mutations/document";
import { useCreateJobReferralMutation } from "@/api/mutations/job";
import { UserPlusIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const formFields: ICustomFormField<ReferFriendSchemaType> = [
  {
    label: "Name",
    key: "name",
    placeholder: "Enter name",
  },
  {
    label: "Email (recommended)",
    key: "email",
    placeholder: "Enter email (optional)",
  },
  {
    label: "Short Note",
    key: "shortNote",
    placeholder: "Enter short note (optional)",
  },
];

export const ReferFriendDialogForm = ({ jobId }: { jobId: number }) => {
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState<FileList | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const {
    mutateAsync: referFriend,
    isPending,
    isSuccess,
  } = useCreateJobReferralMutation();
  const { mutateAsync: handlFileUpload, isPending: isFileUploading } =
    useDocumentMutation();

  const form = useForm({
    resolver: zodResolver(ReferFriendSchema),
    defaultValues: {
      jobId,
      name: "",
      email: "",
      shortNote: "",
      cvFileId: null,
    },
  });

  useEffect(() => {
    if (!isSuccess) return;
    form.reset();
    setOpen(false);
  }, [isSuccess]);

  const onFormSubmit = async (values: ReferFriendSchemaType) => {
    if (!files || files?.length < 0) {
      setFileError("CV file is required");
      return;
    }

    let data;
    if (files && files?.length > 0) data = await handlFileUpload(files);

    const newValue = {
      ...values,
      cvFileId: data.id,
    };
    const created = await referFriend(newValue);
    console.log(created);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex-1 rounded-xl">
          <UserPlusIcon />
          Refer friend
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Refer friend</DialogTitle>
          <DialogDescription hidden></DialogDescription>
        </DialogHeader>
        <form
          onSubmit={form.handleSubmit(onFormSubmit)}
          className="flex flex-col gap-2"
        >
          <ScrollArea className="max-h-[80vh] pr-1">
            <FieldGroup className="flex items-center flex-col gap-3 px-1.5">
              <CustomFormFields<ReferFriendSchemaType>
                fieldClass="gap-1"
                control={form.control}
                formFields={formFields}
              />
              <Field className={cn(`gap-1`, fileError && "text-destructive")}>
                <FieldLabel htmlFor="picture">CV Document (.pdf)</FieldLabel>
                <Input
                  onChange={(e) => {
                    setFileError("");
                    setFiles(e.target.files);
                  }}
                  className={cn(fileError && "text-destructive")}
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
                isFileUploading ||
                isPending ||
                (!form.formState.isDirty && !files)
              }
              size={"sm"}
            >
              {isFileUploading || isPending
                ? "Please wait..."
                : "Create Referral"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
