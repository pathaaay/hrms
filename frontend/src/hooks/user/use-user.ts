import type { RootState } from "@/store/root-reducer";
import { useSelector } from "react-redux";

export const useUser = () => useSelector((state: RootState) => state.user);
