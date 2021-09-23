import { useLazyQuery, useQuery } from "@apollo/client";
import { GetData } from "../graphql/query";
import { SubscriptionUser } from "../graphql/subscribe";

export default function useGetData() {
    const [getData_qry, { data, loading, error, subscribeToMore }] = useLazyQuery(GetData);
    const subscribeUser = () => {
      subscribeToMore({
        document: SubscriptionUser,
        updateQuery: (prev, { subscriptionData: { data } }) => {
          console.log(data);
          return data;
        },
      });
    };
    return {
      anggota: data ? data.anggota : [],
      loading,
      error,
      subscribeUser,
      getData_qry
    };
  }