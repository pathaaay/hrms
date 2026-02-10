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
  const { games } = useGame();
  const singleGame = games.find(({ id }) => gameId === id);

  const form = useForm({
    resolver: zodResolver(ConfigureGameSchema),
    defaultValues: {
      name: singleGame?.name || "",
      endTime: singleGame?.endTime || 0,
      isActive: singleGame?.active || true,
      startTime: singleGame?.startTime || 0,
      bookingCycleHours: singleGame?.bookingCycleHours || 0,
      maxPlayersPerSlot: singleGame?.maxPlayersPerSlot || 0,
      maxSlotDurationInMinutes: singleGame?.maxSlotDurationInMinutes || 0,
    },
  });

  const onFormSubmit = (values: ConfigureGameSchemaType) => {
    console.log({ values });
  };

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="ghost" size={"sm"} className="w-full rounded-xl">
            <SettingsIcon />
            Settings
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Configure Game: {"Pool"}</DialogTitle>
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
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={form.handleSubmit(onFormSubmit)} type="submit">
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
