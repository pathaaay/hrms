import { LoaderIcon } from "react-hot-toast";

export const CustomLoader = () => {
  return (
    <div className="flex items-center justify-center h-50">
      <LoaderIcon className="size-10! animate-spin" />
    </div>
  );
};
