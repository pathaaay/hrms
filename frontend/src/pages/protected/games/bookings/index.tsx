import DataTableWithColumnFilterDemo from "@/components/common/data-table";
import { GoBackBtn } from "@/components/shared/go-back-btn";

export const UserGameBookingPage = () => {
  return (
    <div className="flex flex-col items-center gap-2 relative">
      <GoBackBtn to={"/games"} />
      <div className="mt-20 w-full">
        <DataTableWithColumnFilterDemo />
      </div>
    </div>
  );
};
