import { gql } from "@apollo/client";

export const InserData = gql`
    mutation MyMutation($jenis_kelamin: String!, $nama: String! $umur: Int!, $id: Int!) {
        insert_anggota(objects: {jenis_kelamin: $jenis_kelamin, nama: $nama, umur: $umur, id: $id}) {
            returning {
                jenis_kelamin
                nama
                umur
                id
            }
        }
    }`;

export const DeleteData = gql`
    mutation MyMutation2($id: Int!) {
        delete_anggota_by_pk(id: $id) {
            id
            jenis_kelamin
            nama
            umur
        }
    }`;

export const UpdateNama = gql`
    mutation MyMutation3($id: Int!, $nama: String!) {
        update_anggota_by_pk(pk_columns: {id: $id}, _set: {nama: $nama}) {
            id
            jenis_kelamin
            nama
            umur
        }
    }`;