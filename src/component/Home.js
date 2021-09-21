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
    
    const [list, setList] = useState([])
    const [getData_qry,{data, loading, error}] = useLazyQuery(GetDataByUserId)
    const [input, setInput] = useState("")

    if(loading){
        return <LoadingSvg/>
    }

    if (error){
        console.log("error ",error)
        return null
    }
    

    const hapusPengunjung = id => {
        setList((oldData) => [...
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
        setList((oldData) => [...oldData, newData])
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
            
            <input type="text" onChange={onchangeInput} />
            <button onClick={onGetData}>Get Data</button>
            <ListPassenger data={data?.anggota} hapusPengunjung={hapusPengunjung} />
            <PassengerInput tambahPengunjung={tambahPengunjung}/>
        </div>
    )
    
}

export default Home;