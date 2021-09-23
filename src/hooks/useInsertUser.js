import { useMutation } from "@apollo/client";
import { GetData } from "../graphql/query";
import { InserData } from "../graphql/mutation";
export default function useInsertUser() {
  const [insertUser, { loading: loadingInsert }] = useMutation(InserData, {
    refetchQueries: [GetData],
  });
  return {
    insertUser,
    loadingInsert,
  };
}
