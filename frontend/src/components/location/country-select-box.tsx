import { useFetchAllCountries } from "@/hooks/location/use-fetch-country";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export const CountrySelectBox = ({
  value,
  setSelectedValue,
}: {
  value: string | null;
  setSelectedValue: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const { countries } = useFetchAllCountries();
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
          {countries?.map((country) => (
            <SelectItem key={country.id} value={country.id.toString()}>
              {country.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
