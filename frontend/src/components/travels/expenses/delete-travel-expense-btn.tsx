import { useDeleteTravelExpenseMutation } from "@/api/mutations/travel/travel-expense";
import { DeleteDialog } from "@/components/common/delete-dialog";
import { queryClient } from "@/lib/tanstack-query/query-client";
import { useEffect } from "react";
import { useParams } from "react-router";

export function DeleteTravelExpenseBtn({ id }: Readonly<{ id: number }>) {
  const { travelId } = useParams();
  const {
    mutate: handleDelete,
    isPending,
    isSuccess,
  } = useDeleteTravelExpenseMutation();

  useEffect(() => {
    if (isSuccess)
      queryClient.invalidateQueries({ queryKey: [`travel-expenses-${travelId}`] });
  }, [isSuccess]);

  return (
    <DeleteDialog
      title="Delete Travel expense!"
      description="Are you sure you want to delete the travel expense?"
      isPending={isPending}
      isSuccess={isSuccess}
      onDelete={() =>
        handleDelete({ travelExpenseId: id, travelId: Number(travelId) })
      }
    />
  );
}
