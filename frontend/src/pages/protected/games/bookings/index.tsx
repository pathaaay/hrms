import { GoBackBtn } from "@/components/shared/go-back-btn";

export const UserGameBookingPage = () => {
  return (
    <div className="flex flex-col items-center gap-2 relative">
      <GoBackBtn to={"/games"} />
    </div>
  );
};
