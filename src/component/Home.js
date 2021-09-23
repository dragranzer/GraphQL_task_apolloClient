import PassengerInput from './PassengerInput';
import ListPassenger from './ListPassenger';
import Header from './Header';
import { useState } from 'react';
import LoadingSvg from "./LoadingSvg"
import useDeleteUser from "../hooks/useDeleteUser";
import useGetUser from "../hooks/useGetUser";
import useUpdateUser from "../hooks/useUpdateUser";
import useInsertUser from "../hooks/useInsertUser";

function Home () {
    
    const [input, setInput] = useState("")
    const { anggota, loading, error, subscribeUser, getData_qry } = useGetUser();
    const { updateNama, loadingUpdate } = useUpdateUser();
    const { deleteUser, loadingDelete } = useDeleteUser();
    const { insertUser, loadingInsert } = useInsertUser();
    
    if (loading && loadingDelete && loadingUpdate && loadingInsert){
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
        deleteUser({variables :{
            id:id
        }})
    }

    const tambahPengunjung = newUser => {
        console.log(newUser.nama)
        const newData = {
            ...newUser
        }
        // console.log(newData)
        insertUser({variables :{
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
      }
    
    const onchangeInput = (e) => {
        setInput(e.target.value)
    }
    return(
        <div>
            <Header />
            
            {/* <input type="text" onChange={onchangeInput} /> */}
            <button onClick={onGetData}>Get Data</button>
            <ListPassenger data={anggota} hapusPengunjung={hapusPengunjung} editNama={editNama}/>
            <PassengerInput tambahPengunjung={tambahPengunjung}/>
        </div>
    )
    
}

export default Home;