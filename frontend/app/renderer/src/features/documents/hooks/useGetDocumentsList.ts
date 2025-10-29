import { useQuery } from "@tanstack/react-query";

const useGetDocumentsList = () => {
  return useQuery({
    queryKey: ["documents-list"],
    queryFn: window.api.getDocumentsList,
  });
};

export { useGetDocumentsList };
