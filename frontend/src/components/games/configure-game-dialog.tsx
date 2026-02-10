import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FieldGroup } from "@/components/ui/field";
import {
  ConfigureGameSchema,
  type ConfigureGameSchemaType,
} from "@/lib/schemas/game-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SettingsIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  CustomFormFields,
  type ICustomFormField,
} from "../shared/custom-form-fields";
import { ScrollArea } from "../ui/scroll-area";

export function ConfigureGameDialog() {
  const form = useForm({
    resolver: zodResolver(ConfigureGameSchema),
    defaultValues: {
      name: "",
      bookingCycleHours: 1,
      isActive: true,
      endTime: 1,
      maxPlayersPerSlot: 1,
      maxSlotDurationInMinutes: 1,
      startTime: 1,
    },
  });

  const onFormSubmit = (values: ConfigureGameSchemaType) => {
    console.log({ values });
  };

  const formFields: ICustomFormField<ConfigureGameSchemaType> = [
    {
      label: "Name",
      key: "name",
    },
    {
      label: "Booking Cycle (Hrs)",
      key: "bookingCycleHours",
      type: "number",
    },
    {
      label: "Start Time",
      key: "startTime",
      type: "number",
    },
    {
      label: "End Time",
      key: "endTime",
      type: "number",
    },
    {
      label: "Max Duration (Minutes)",
      key: "maxSlotDurationInMinutes",
      type: "number",
    },
    {
      label: "Max Duration (Minutes)",
      key: "maxSlotDurationInMinutes",
      type: "number",
    },
    {
      label: "Max Players per slot",
      key: "maxPlayersPerSlot",
      type: "number",
    },
    {
      label: "Enabled",
      key: "isActive",
      type: "switch",
    },
  ];

  return (
    <Dialog>
      <form onSubmit={form.handleSubmit(onFormSubmit)}>
        <DialogTrigger asChild>
          <Button variant="ghost" size={"sm"} className="w-full rounded-xl">
            <SettingsIcon />
            Settings
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Configure Game: {"Pool"}</DialogTitle>
          </DialogHeader>

          <ScrollArea className="max-h-[50vh] pr-1" >
            <FieldGroup className="flex items-center flex-col gap-2">
              <CustomFormFields<ConfigureGameSchemaType>
                fieldClass="flex-row items-center"
                control={form.control}
                formFields={formFields}
              />
            </FieldGroup>
          </ScrollArea>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
