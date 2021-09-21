import { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import PassengerInput from './PassengerInput';
import ListPassenger from './ListPassenger';
import Header from './Header';
import {gql, useQuery, useLazyQuery} from '@apollo/client';
import { useState } from 'react';
import LoadingSvg from "./LoadingSvg"

const initialValue = [
    {
        id: uuidv4(),
        nama: "Yoga",
        umur: 22,
        jenisKelamin: "Pria",
    },
    {
        id: uuidv4(),
        nama: "Ria",
        umur: 19,
        jenisKelamin: "Wanita",
    },
    {
        id: uuidv4(),
        nama: "Fahmi",
        umur: 25,
        jenisKelamin: "Pria",
    },
]

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

function Home () {
    
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
    
    const [data, setData] = useState([])
    const [getData_qry,{data_qry, loading, error}] = useLazyQuery(GetData)

    if(loading){
        return <LoadingSvg/>
    }

    if (error){
        console.log("error ",error)
        return null
    }
    

    const hapusPengunjung = id => {
        setData((oldData) => [...
            oldData.filter(item => {
                return item.id !== id;
            })
        ])
    }

    const tambahPengunjung = newUser => {
        const newData = {
            id: uuidv4(),
            ...newUser
        }
        setData((oldData) => [...oldData, newData])
    }
    const onGetData = () =>{
        getData_qry()
        console.log(data_qry)
        // setData(data_qry)
      }
    return(
        <div>
            <Header />
            <button onClick={onGetData}>Get Data</button>
            <ListPassenger data={data} hapusPengunjung={hapusPengunjung} />
            <PassengerInput tambahPengunjung={tambahPengunjung}/>
        </div>
    )
    
}

export default Home;