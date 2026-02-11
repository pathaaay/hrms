import { useDeleteGameSlotMutation } from "@/api/mutations/game";
import { DeleteDialog } from "@/components/common/delete-dialog";

export function DeleteBookingBtn({ id }: Readonly<{ id: number }>) {
  const {
    mutate: handleDelete,
    isPending,
    isSuccess,
  } = useDeleteGameSlotMutation();

  return (
    <DeleteDialog
      description="Delete Booking!"
      title="Are you sure you want to delete the booking?"
      isPending={isPending}
      isSuccess={isSuccess}
      onDelete={() => handleDelete(id)}
    />
  );
}
