import { useMutation } from "@tanstack/react-query";

const useDocumentsMutation = () => {
  return useMutation({
    mutationFn: () => window.api.insertDocument(),
  });
};

export default useDocumentsMutation;
