import {
  useCreateTravelMutation,
  useUpdateTravelMutation,
} from "@/api/mutations/travel/travel";
import { CitySelectBox } from "@/components/location/city-select-box";
import { CountrySelectBox } from "@/components/location/country-select-box";
import { StateSelectBox } from "@/components/location/state-select-box";
import {
  CustomFormFields,
  type ICustomFormField,
} from "@/components/shared/custom-form-fields";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { emitGoBack } from "@/lib/helpers/events/go-back-event";
import {
  TravelSchema,
  type TravelSchemaType,
} from "@/lib/schemas/travel/travel-schema";
import type { ITravel } from "@/lib/types/travel";
import type { IUserProfile } from "@/lib/types/user";
import { createMultiSelectOption } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { NavLink } from "react-router";

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
  singleTravel?: ITravel;
}

export const ManageTravelForm = ({
  users,
  singleTravel,
}: ManageTravelFormProps) => {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(
    singleTravel?.countryId.toString() || null,
  );
  const [selectedState, setSelectedState] = useState<string | null>(
    singleTravel?.stateId.toString() || null,
  );
  const {
    mutateAsync: createTravel,
    isPending: isCreating,
    isSuccess: isCreated,
  } = useCreateTravelMutation();
  const {
    mutateAsync: updateTravel,
    isPending: isUpdating,
    isSuccess: isUpdated,
  } = useUpdateTravelMutation();

  const form = useForm({
    resolver: zodResolver(TravelSchema),
    defaultValues: {
      travelId: singleTravel?.id || undefined,
      cityId: singleTravel?.cityId.toString() || "",
      description: singleTravel?.description || "",
      endDate: singleTravel?.endDate
        ? new Date(singleTravel?.endDate)
        : undefined,
      maxAmountPerDay: singleTravel?.maxAmountPerDay.toString() || "",
      startDate: singleTravel?.startDate
        ? new Date(singleTravel?.startDate)
        : undefined,
      title: singleTravel?.title || "",
      userIds: singleTravel?.travelMembers.map(({ id }) => id.toString()),
    },
  });

  useEffect(() => {
    if (isCreated || isUpdated) {
      emitGoBack("/travels");
    }
  }, [isCreated, isUpdated]);

  const onFormSubmit = async (values: TravelSchemaType) => {
    if (values.travelId) await updateTravel(values);
    else await createTravel(values);
  };

  const options = users?.map((user) =>
    createMultiSelectOption(user.userId.toString(), user.name),
  );

  return (
    <div className="w-full max-w-md mx-auto gap-4 flex flex-col justify-center py-10">
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
            {form.formState.isSubmitted && !selectedCountry && (
              <FieldError>Country is required</FieldError>
            )}
          </Field>
          {selectedCountry && (
            <Field className="gap-1">
              <FieldLabel>State</FieldLabel>
              <StateSelectBox
                countryId={Number(selectedCountry)}
                value={selectedState}
                setSelectedValue={setSelectedState}
              />
              {form.formState.isSubmitted && !selectedState && (
                <FieldError>State is required</FieldError>
              )}
            </Field>
          )}
          {selectedState && (
            <Controller
              control={form.control}
              name={"cityId"}
              render={({ field, fieldState }) => (
                <Field className="gap-1">
                  <FieldLabel>City</FieldLabel>
                  <CitySelectBox
                    stateId={Number(selectedState)}
                    value={field.value}
                    setSelectedValue={(data) => field.onChange(data)}
                  />
                  {fieldState?.error && (
                    <FieldError>{fieldState?.error.message}</FieldError>
                  )}
                </Field>
              )}
            />
          )}
        </FieldGroup>
        <div className="flex items-center gap-2 mt-5">
          <Button variant="outline" size={"sm"} type="button" asChild>
            <NavLink to={"/travels"}>Cancel</NavLink>
          </Button>
          <Button
            type="submit"
            disabled={isCreating || isUpdating || !form.formState.isDirty}
            size={"sm"}
          >
            {isCreating || isUpdating ? "Please wait..." : "Save changes"}
          </Button>
        </div>
      </form>
    </div>
  );
};
