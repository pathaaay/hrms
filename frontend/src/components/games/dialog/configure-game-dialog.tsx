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
} from "../../shared/custom-form-fields";
import { ScrollArea } from "../../ui/scroll-area";
import { useGame } from "@/hooks/game/use-game";
import { useConfigureGameMutation } from "@/api/mutations/game";
import { useEffect, useState } from "react";

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
    label: "Max Players per slot",
    key: "maxPlayersPerSlot",
    type: "number",
  },
  {
    label: "Active",
    key: "isActive",
    type: "switch",
    className: "border my-1 p-2 rounded-md",
  },
];

export function ConfigureGameDialog({ gameId }: { readonly gameId: number }) {
  const [open, setOpen] = useState(false);
  const {
    mutate: updateGameConfig,
    isPending,
    isSuccess,
  } = useConfigureGameMutation();

  const { games } = useGame();
  const singleGame = games.find(({ id }) => gameId === id);

  const form = useForm({
    resolver: zodResolver(ConfigureGameSchema),
    defaultValues: {
      id: singleGame?.id.toString(),
      name: singleGame?.name || "",
      endTime: singleGame?.endTime.toString() || "",
      startTime: singleGame?.startTime.toString() || "",
      bookingCycleHours: singleGame?.bookingCycleHours.toString() || "",
      maxPlayersPerSlot: singleGame?.maxPlayersPerSlot.toString() || "",
      maxSlotDurationInMinutes:
        singleGame?.maxSlotDurationInMinutes.toString() || "",
    },
  });

  useEffect(() => {
    if (isSuccess) setOpen(false);
    form.reset(form.getValues());
  }, [isSuccess]);

  useEffect(() => {
    if (singleGame?.isActive) form.setValue("isActive", true);
  }, [singleGame]);

  const onFormSubmit = (values: ConfigureGameSchemaType) => {
    updateGameConfig(values);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen} modal={true}>
      <form onSubmit={form.handleSubmit(onFormSubmit)}>
        <DialogTrigger asChild>
          <Button variant="outline" className="flex-1 rounded-xl">
            <SettingsIcon />
            Settings
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Configure Game: {singleGame?.name}</DialogTitle>
            <DialogDescription hidden></DialogDescription>
          </DialogHeader>

          <ScrollArea className="max-h-[50vh] pr-1">
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
              {isPending ? "Please wait..." : "Save changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
