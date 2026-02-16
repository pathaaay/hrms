import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useFetchAllStates } from "@/hooks/location/use-fetch-state";

export const StateSelectBox = ({
  countryId,
  value,
  setSelectedValue,
}: {
  countryId: number;
  value: string | null;
  setSelectedValue: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const { states } = useFetchAllStates(countryId);
  return (
    <Select
      value={value || ""}
      onValueChange={(data) => setSelectedValue(data)}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select country" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Countries</SelectLabel>
          {states?.map((state) => (
            <SelectItem key={state.id} value={state.id.toString()}>
              {state.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
