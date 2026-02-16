import { useFetchAllCities } from "@/hooks/location/use-fetch-city";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export const CitySelectBox = ({
  stateId,
  value,
  setSelectedValue,
}: {
  stateId: number;
  value: string | null;
  setSelectedValue: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const { cities } = useFetchAllCities(stateId);
  return (
    <Select
      value={value || ""}
      onValueChange={(data) => setSelectedValue(data)}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select city" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Cities</SelectLabel>
          {cities?.map((city) => (
            <SelectItem key={city.id} value={city.id.toString()}>
              {city.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
