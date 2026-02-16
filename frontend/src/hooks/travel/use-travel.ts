import type { RootState } from "@/store/root-reducer";
import { useSelector } from "react-redux";

export const useTravel = () => useSelector((state: RootState) => state.travel);
