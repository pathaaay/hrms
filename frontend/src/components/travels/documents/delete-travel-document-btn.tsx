import { useDeleteTravelDocumentMutation } from "@/api/mutations/travel/travel-document";
import { DeleteDialog } from "@/components/common/delete-dialog";
import { queryClient } from "@/lib/tanstack-query/query-client";
import { useEffect } from "react";

export function DeleteTravelDocumentBtn({
  travelId,
  id,
}: Readonly<{ travelId: number; id: number }>) {
  const {
    mutate: handleDelete,
    isPending,
    isSuccess,
  } = useDeleteTravelDocumentMutation();

  useEffect(() => {
    if (!isSuccess) return;

    queryClient.invalidateQueries({
      queryKey: [`travel-documents-${travelId}`],
    });
  }, [isSuccess]);

  return (
    <DeleteDialog
      title="Delete Travel Documet!"
      description="Are you sure you want to delete the document?"
      isPending={isPending}
      isSuccess={isSuccess}
      onDelete={() => handleDelete({ travelId, documentId: id })}
    />
  );
}
