import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { FolderX, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface CustomEmptyProps {
  title: string | ReactNode;
  description: string | ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  Icon?: LucideIcon;
}

export const CustomEmpty = ({
  title,
  description,
  children,
  Icon,
  footer,
}: Readonly<CustomEmptyProps>) => {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">{Icon ? <Icon /> : <FolderX />}</EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
      <EmptyContent className="flex-row justify-center gap-2">
        {children}
      </EmptyContent>
      {footer}
    </Empty>
  );
};
