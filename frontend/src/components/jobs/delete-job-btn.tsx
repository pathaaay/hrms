import { useDeleteJobMutation } from "@/api/mutations/jobs/job";
import { DeleteDialog } from "@/components/common/delete-dialog";

export function DeleteJobBtn({ id }: Readonly<{ id: number }>) {
  const { mutate: handleDelete, isPending, isSuccess } = useDeleteJobMutation();

  return (
    <DeleteDialog
      title="Delete Job!"
      description="Are you sure you want to delete the job?"
      isPending={isPending}
      isSuccess={isSuccess}
      onDelete={() => handleDelete(id)}
    />
  );
}
