import { useFieldArray, useForm } from "react-hook-form";
import {
  CustomFormFields,
  type ICustomFormField,
} from "../shared/custom-form-fields";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Field, FieldGroup } from "../ui/field";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  PostSchema,
  type PostSchemaType,
} from "@/lib/schemas/achievement-post-schema";
import { createMultiSelectOption } from "@/lib/utils";
import { useFetchAllUsers } from "@/hooks/user/use-fetch-all-users";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useEffect, useState } from "react";
import { Badge } from "../ui/badge";
import { XIcon } from "lucide-react";
import { useCreatePostMutation } from "@/api/mutations/achievement-post";

const formFields: ICustomFormField<PostSchemaType> = [
  {
    label: "Title",
    key: "title",
    placeholder: "Enter title",
  },

  {
    label: "Description",
    key: "description",
    type: "textarea",
    placeholder: "Enter description",
  },
  {
    label: "Public",
    key: "isPublic",
    type: "switch",
    className: "border my-1 p-2 rounded-md flex! flex-row! dark:bg-input/30",
  },
];

export const AchievementPostForm = () => {
  const { users } = useFetchAllUsers();
  const {
    mutateAsync: createPost,
    isPending,
    isSuccess,
  } = useCreatePostMutation();
  const [tagValue, setTagValue] = useState("");

  const form = useForm({
    resolver: zodResolver(PostSchema),
    defaultValues: {
      title: "",
      description: "",
      visibleToUserIds: [],
      isPublic: true,
      newTags: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "newTags",
  });

  useEffect(() => {
    if (!isSuccess) return;
    form.reset();
  }, [isSuccess]);

  const onFormSubmit = (values: PostSchemaType) => {
    const body = { ...values, newTags: values.newTags.map(({ tag }) => tag) };
    createPost({ body });
  };

  const isPublic = form.watch("isPublic");
  const options = users?.map((user) =>
    createMultiSelectOption(user.userId.toString(), user.name),
  );
  return (
    <Card>
      <form
        onSubmit={form.handleSubmit(onFormSubmit)}
        className="flex flex-col gap-2"
      >
        <CardContent>
          <CardHeader>
            <CardTitle className="text-center">Write Something</CardTitle>
          </CardHeader>
          <FieldGroup className="flex items-center flex-col gap-3 px-1.5">
            <CustomFormFields<PostSchemaType>
              fieldClass="gap-1"
              control={form.control}
              formFields={
                isPublic
                  ? formFields
                  : [
                      ...formFields,
                      {
                        key: "visibleToUserIds",
                        type: "multi-select",
                        options,
                        label: "Select Users",
                        placeholder: "",
                      },
                    ]
              }
            />
            <Field className="flex items-center! flex-row justify-start gap-2">
              <Label htmlFor="tags" className="w-max!">
                Tags:
              </Label>
              <Input
                contentEditable
                id="tags"
                value={tagValue}
                onChange={(e) => setTagValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.nativeEvent.key === "Enter") {
                    e.preventDefault();
                    append({ tag: tagValue });
                    setTagValue("");
                  }
                }}
                className="w-full"
              />
            </Field>
            <div className="flex items-center justify-start w-full gap-1 flex-wrap">
              {fields.map((field, i) => (
                <Badge key={field.id} variant={"secondary"}>
                  {field.tag}{" "}
                  <XIcon
                    className="cursor-pointer pointer-events-auto!"
                    onClick={() => {
                      remove(i);
                    }}
                  />
                </Badge>
              ))}
            </div>
          </FieldGroup>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Please wait..." : "Create Post"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};
