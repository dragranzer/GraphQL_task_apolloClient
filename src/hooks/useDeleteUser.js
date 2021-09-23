import { useMutation } from "@apollo/client";
import { GetData } from "../graphql/query";
import { DeleteData } from "../graphql/mutation";
export default function useDeleteUser() {
  const [deleteUser, { loading: loadingDelete }] = useMutation(DeleteData, {
    refetchQueries: [GetData],
  });
  return {
    deleteUser,
    loadingDelete,
  };
}