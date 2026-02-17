import { getAllDocumentsByTravelId } from "@/api/actions/travels/travel-document";
import type { ITravelDocument } from "@/lib/types/travel";
import { useQuery } from "@tanstack/react-query";

interface ReturnType {
  isPending: boolean;
  documents: ITravelDocument[] | undefined;
}

export const useFetchAllTravelDocuments = (
  travelId: string = "",
): ReturnType => {
  const { data: documents, isPending } = useQuery<ITravelDocument[]>({
    queryKey: [`travel-documents-${travelId}`],
    queryFn: () => getAllDocumentsByTravelId(travelId),
  });

  return { documents, isPending };
};
