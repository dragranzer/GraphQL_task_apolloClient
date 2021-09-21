import { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import PassengerInput from './PassengerInput';
import ListPassenger from './ListPassenger';
import Header from './Header';
import {gql, useQuery, useLazyQuery, useMutation} from '@apollo/client';
import { useState } from 'react';
import LoadingSvg from "./LoadingSvg"

const GetData = gql`
    query MyQuery {
        anggota {
          id
          jenis_kelamin
          nama
          umur
        }
      }      
    `
const InserData = gql`
mutation MyMutation($jenis_kelamin: String!, $nama: String! $umur: Int!, $id: Int!) {
    insert_anggota(objects: {jenis_kelamin: $jenis_kelamin, nama: $nama, umur: $umur, id: $id}) {
      returning {
        jenis_kelamin
        nama
        umur
        id
      }
    }
  }
`

const DeleteData = gql`
mutation MyMutation2($id: Int!) {
    delete_anggota_by_pk(id: $id) {
      id
      jenis_kelamin
      nama
      umur
    }
  }
`
const GetDataByUserId = gql `
        query MyQuery($id: Int!) {
        anggota(where: {id: {_eq: $id}}) {
            nama
            umur
            jenis_kelamin
            id
        }
        }
    `;

    const UpdateNama = gql`
    mutation MyMutation3($id: Int!, $nama: String!) {
        update_anggota_by_pk(pk_columns: {id: $id}, _set: {nama: $nama}) {
        id
        jenis_kelamin
        nama
        umur
        }
    }
    `

function Home () {
    
    const [list, setList] = useState([])
    const [getData_qry,{data, loading, error, refetch}] = useLazyQuery(GetData)
    const [input, setInput] = useState("")
    const [inserData, {loading:loadingInsert}] = useMutation(InserData, {
        refetchQueries: [GetData]
    });
    const [deleteData, {loading : loadingDelete}] = useMutation(DeleteData,{
        refetchQueries: [GetData]
    });
    const [updateNama, {loading : loadingNama}] = useMutation(UpdateNama,{
        refetchQueries: [GetData]
    });
    
    if(loading && loadingInsert && loadingDelete && loadingNama){
        return <LoadingSvg/>
    }

    if (error){
        console.log("error ",error)
        return null
    }

    const editNama = user => {
        const newData = {
            ...user
        }
        updateNama({variables:{
            id: newData.id,
            nama: newData.nama
        }})
    }

    const hapusPengunjung = id => {
        deleteData({variables :{
            id:id
        }})
    }

    const tambahPengunjung = newUser => {
        console.log(newUser.nama)
        const newData = {
            ...newUser
        }
        // console.log(newData)
        inserData({variables :{
              id: newData.id,
              nama: newData.nama,
              umur: newData.umur,
              jenis_kelamin: newData.jenisKelamin
        }})
    }
    const onGetData = () =>{
        getData_qry({variables : {
            id : input
        }})

        console.log(data?.anggota)
        // setList(data?.anggota)
      }
    
    const onchangeInput = (e) => {
        setInput(e.target.value)
    }
    return(
        <div>
            <Header />
            
            {/* <input type="text" onChange={onchangeInput} /> */}
            <button onClick={onGetData}>Get Data</button>
            <ListPassenger data={data?.anggota} hapusPengunjung={hapusPengunjung} editNama={editNama}/>
            <PassengerInput tambahPengunjung={tambahPengunjung}/>
        </div>
    )
    
}

export default Home;