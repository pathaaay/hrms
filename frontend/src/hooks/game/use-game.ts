import type { RootState } from "@/store/root-reducer";
import { useSelector } from "react-redux";

export const useGame = () => useSelector((state: RootState) => state.game);
