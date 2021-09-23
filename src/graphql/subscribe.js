import { gql } from "@apollo/client";

export const SubscriptionUser = gql`
  subscription MySubscription {
    anggota {
      id
      nama
      umur
      jenis_kelamin
    }
  }
`;
