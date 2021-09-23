import { gql } from "@apollo/client";

export const GetData = gql`
    query MyQuery {
        anggota {
        id
        jenis_kelamin
        nama
        umur
        }
    }`;

export const GetDataByUserId = gql `
    query MyQuery($id: Int!) {
        anggota(where: {id: {_eq: $id}}) {
            nama
            umur
            jenis_kelamin
            id
        }
    }`;