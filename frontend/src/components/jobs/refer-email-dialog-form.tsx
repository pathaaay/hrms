import { useReferFriendByEmailsMutation } from "@/api/mutations/jobs/job";
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
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import {
  ReferFriendByEmailsSchema,
  type ReferFriendByEmailsSchemaType,
} from "@/lib/schemas/job-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, type ClipboardEvent } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { MailIcon, XIcon } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "../ui/input-group";

export const ReferByEmailsDialogForm = ({ jobId }: { jobId: number }) => {
  const [open, setOpen] = useState(false);

  const {
    mutate: referFriend,
    isPending,
    isSuccess,
  } = useReferFriendByEmailsMutation();

  const form = useForm({
    resolver: zodResolver(ReferFriendByEmailsSchema),
    defaultValues: {
      emails: [],
      jobId,
    },
  });


  useEffect(() => {
    if (open) {
      form.reset();
      [1, 2, 3].forEach(() => {
        append({ email: "" });
      });
    }
  }, [open]);

  useEffect(() => {
    if (!isSuccess) return;
    setOpen(false);
    form.reset();
  }, [isSuccess]);

  const onFormSubmit = (values: ReferFriendByEmailsSchemaType) => {
    referFriend(values);
  };

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "emails",
  });

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    const value = e.nativeEvent.clipboardData?.getData("text");
    const commaSeparatedValues = value?.split(",");

    const newLineValues = commaSeparatedValues
      ?.filter((ele) => ele.includes("\n"))
      .map((ele) => ele.trim().split("\n"));

    const commaWithoutLines = commaSeparatedValues
      ?.filter((ele) => !ele.includes("\n"))
      .map((ele) => ele.trim());

    let finalValues: string[] = form
      .getValues()
      .emails.filter(({ email }) => email)
      .map(({ email }) => email.trim());
    if (newLineValues?.length) {
      finalValues = newLineValues.flat();
    }

    if (commaWithoutLines?.length) {
      finalValues = [...new Set([...finalValues, ...commaWithoutLines])];
    }

    form.setValue(
      "emails",
      finalValues.map((ele) => ({ email: ele.trim() })),
    );
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <form onSubmit={form.handleSubmit(onFormSubmit)}>
          <DialogTrigger asChild>
            <Button variant="outline" className="flex-1 rounded-xl">
              <MailIcon />
              Share
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-sm">
            <DialogHeader>
              <DialogTitle>Refer by email</DialogTitle>
              <DialogDescription hidden></DialogDescription>
            </DialogHeader>

            <ScrollArea className="max-h-72 min-h-72 pr-1">
              <FieldSet className="gap-4">
                <FieldLegend variant="label">Email Addresses</FieldLegend>
                <FieldDescription>
                  You can add single emails or paste multiple email address
                  separated by new line or comma.
                </FieldDescription>
                <FieldGroup className="flex items-center flex-col gap-2">
                  {fields.map((field, index) => (
                    <Controller
                      key={field.id}
                      name={`emails.${index}.email`}
                      control={form.control}
                      render={({ field: controllerField, fieldState }) => (
                        <Field
                          orientation="horizontal"
                          data-invalid={fieldState.invalid}
                        >
                          <FieldContent>
                            <InputGroup>
                              <InputGroupInput
                                onPaste={(e) => handlePaste(e)}
                                {...controllerField}
                                id={`form-rhf-array-email-${index}`}
                                aria-invalid={fieldState.invalid}
                                placeholder="name@example.com"
                                type="email"
                                autoComplete="email"
                              />
                              {fields.length > 1 && (
                                <InputGroupAddon align="inline-end">
                                  <InputGroupButton
                                    type="button"
                                    variant="ghost"
                                    size="icon-xs"
                                    onClick={() => remove(index)}
                                    aria-label={`Remove email ${index + 1}`}
                                  >
                                    <XIcon />
                                  </InputGroupButton>
                                </InputGroupAddon>
                              )}
                            </InputGroup>
                            {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </FieldContent>
                        </Field>
                      )}
                    />
                  ))}
                </FieldGroup>
              </FieldSet>
            </ScrollArea>
            <DialogFooter>
              <Button
                type="button"
                variant="secondary"
                className="mr-auto"
                size="sm"
                onClick={() => append({ email: "" })}
              >
                Add Email
              </Button>
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
                {isPending ? "Please wait..." : "Send"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
};
