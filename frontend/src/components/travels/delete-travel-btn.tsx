import { useDeleteTravelMutation } from "@/api/mutations/travel/travel";
import { DeleteDialog } from "@/components/common/delete-dialog";

export function DeleteTravelBtn({ id }: Readonly<{ id: number }>) {
  const {
    mutate: handleDelete,
    isPending,
    isSuccess,
  } = useDeleteTravelMutation();

  return (
    <DeleteDialog
      title="Delete Travel!"
      description="Are you sure you want to delete the travel?"
      isPending={isPending}
      isSuccess={isSuccess}
      onDelete={() => handleDelete(id)}
    />
  );
}
