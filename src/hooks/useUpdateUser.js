import { useMutation } from "@apollo/client";
import { GetData } from "../graphql/query";
import { UpdateNama } from "../graphql/mutation";
export default function useUpdateUser() {
  const [updateNama, { loading: loadingUpdate }] = useMutation(UpdateNama, {
    refetchQueries: [GetData],
  });
  return {
    updateNama,
    loadingUpdate,
  };
}