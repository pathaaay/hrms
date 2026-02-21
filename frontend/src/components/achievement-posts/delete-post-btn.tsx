import { useDeletePostMutation } from "@/api/mutations/achievement-post";
import { DeleteDialog } from "@/components/common/delete-dialog";

export function DeletePostBtn({ id }: Readonly<{ id: number }>) {
  const {
    mutate: handleDelete,
    isPending,
    isSuccess,
  } = useDeletePostMutation();

  return (
    <DeleteDialog
      title="Delete Post!"
      description="Are you sure you want to delete the post?"
      isPending={isPending}
      isSuccess={isSuccess}
      onDelete={() => handleDelete({ postId: id })}
    />
  );
}
