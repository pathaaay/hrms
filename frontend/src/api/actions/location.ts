import { apiService } from "@/lib/axios";

const LOCATIONS_ENDPOINT = "/locations";

export const getAllCountries = async () => {
  const res = await apiService.get(`${LOCATIONS_ENDPOINT}/countries`);
  return res.data;
};

export const getAllStates = async (countryId: number) => {
  const res = await apiService.get(`${LOCATIONS_ENDPOINT}/${countryId}/states`);
  return res.data;
};

export const getAllCities = async (stateId: number) => {
  const res = await apiService.get(`${LOCATIONS_ENDPOINT}/${stateId}/cities`);
  return res.data;
};
