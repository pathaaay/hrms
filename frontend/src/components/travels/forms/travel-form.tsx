import { CitySelectBox } from "@/components/location/city-select-box";
import { CountrySelectBox } from "@/components/location/country-select-box";
import { StateSelectBox } from "@/components/location/state-select-box";
import {
  CustomFormFields,
  type ICustomFormField,
} from "@/components/shared/custom-form-fields";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
  TravelSchema,
  type TravelSchemaType,
} from "@/lib/schemas/travel/travel-schema";
import type { IUserProfile } from "@/lib/types/user";
import { createMultiSelectOption } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

const formFields: ICustomFormField<TravelSchemaType> = [
  {
    label: "Title",
    key: "title",
    placeholder: "Enter travel title",
  },

  {
    label: "Description",
    key: "description",
    type: "textarea",
    placeholder: "Enter travel description",
  },
  {
    label: "Max expense per day",
    key: "maxAmountPerDay",
    placeholder: "Enter max expense amount per day",
    type: "number",
  },
  {
    label: "Start Date",
    key: "startDate",
    placeholder: "Select start date",
    type: "date",
    disable: (date) => date <= new Date(),
  },
  {
    label: "End Date",
    key: "endDate",
    placeholder: "Select end date",
    type: "date",
    disable: (date) => date <= new Date(),
  },
];

interface ManageTravelFormProps {
  users: IUserProfile[];
  travelId?: number;
}

export const ManageTravelForm = ({
  users,
  travelId,
}: ManageTravelFormProps) => {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedState, setSelectedState] = useState<string | null>(null);

  const form = useForm({
    resolver: zodResolver(TravelSchema),
    defaultValues: {
      travelId: travelId || undefined,
      cityId: undefined,
      description: "",
      endDate: undefined,
      maxAmountPerDay: "0",
      startDate: undefined,
      title: "",
      userIds: [],
    },
  });

  const onFormSubmit = (values: TravelSchemaType) => {
    console.log({ values });
  };

  const options = users?.map((user) =>
    createMultiSelectOption(user.userId.toString(), user.name),
  );

  return (
    <div className="w-full max-w-md mx-auto gap-4 flex flex-col justify-center ">
      <div className="font-bold text-xl text-center">Create Travel</div>
      <form
        onSubmit={form.handleSubmit(onFormSubmit)}
        className="flex flex-col gap-2"
      >
        <FieldGroup className="flex items-center flex-col gap-3 px-1.5">
          <CustomFormFields<TravelSchemaType>
            fieldClass="gap-1"
            control={form.control}
            formFields={[
              ...formFields,
              {
                label: "Select Users",
                key: "userIds",
                type: "multi-select",
                options,
              },
            ]}
          />
          <Field className="gap-1">
            <FieldLabel>Country</FieldLabel>
            <CountrySelectBox
              value={selectedCountry}
              setSelectedValue={setSelectedCountry}
            />
          </Field>
          {selectedCountry && (
            <Field className="gap-1">
              <FieldLabel>State</FieldLabel>
              <StateSelectBox
                countryId={Number(selectedCountry)}
                value={selectedState}
                setSelectedValue={setSelectedState}
              />
            </Field>
          )}
          {selectedState && (
            <Controller
              control={form.control}
              name={"cityId"}
              render={({ field }) => (
                <Field className="gap-1">
                  <FieldLabel>City</FieldLabel>
                  <CitySelectBox
                    stateId={Number(selectedState)}
                    value={field.value}
                    setSelectedValue={(data) => field.onChange(data)}
                  />
                </Field>
              )}
            />
          )}
        </FieldGroup>
        <Button
          variant="outline"
          size={"sm"}
          type="submit"
          onClick={() => console.log(form)}
        >
          Cancel
        </Button>
        {/* <Button
            type="submit"
            disabled={

            }
            size={"sm"}
          >
            {
              ? "Please wait..."
              : "Save changes"}
          </Button> */}
      </form>
    </div>
  );
};
