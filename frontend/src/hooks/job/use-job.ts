import type { RootState } from "@/store/root-reducer";
import { useSelector } from "react-redux";

export const useJob = () => useSelector((state: RootState) => state.job);
