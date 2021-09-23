import { useSubscription } from "@apollo/client";

import { SubscriptionUser } from "../graphql/subscribe";
export default function useSubscribeUser() {
  const { data, loading, error } = useSubscription(SubscriptionUser, {});
  return {
    data,
    loading,
    error,
  };
}