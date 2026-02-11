import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2Icon } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { Button } from "../ui/button";

interface DeleteDialogProps {
  trigger?: ReactNode;
  title: string;
  description: string;
  isPending: boolean;
  onDelete: () => void;
  isSuccess: boolean;
}

export const DeleteDialog = ({
  trigger,
  title,
  description,
  onDelete,
  isPending,
  isSuccess,
}: DeleteDialogProps) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (isSuccess) setOpen(false);
  }, [isSuccess]);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        {trigger || (
          <Button variant="destructive">
            <Trash2Icon />
          </Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            onClick={(e) => {
              e.preventDefault();
              onDelete();
            }}
            disabled={isPending}
          >
            {isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
