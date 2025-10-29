import { useMutation, useQueryClient } from "@tanstack/react-query";

const useDocumentsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => window.api.createDocument(""),

    // onSuccess: (data) => {
    //   queryClient.
    // },
  });
};

export default useDocumentsMutation;
