import "./Home.css"
import { useState } from 'react';
import {gql, useQuery, useLazyQuery, useMutation} from '@apollo/client';



const ListItem = (props) => {

    const { id, nama, umur, jenis_kelamin } = props.data
    const [edit, setEdit] = useState(false)
    const [newNama, setNewNama] = useState("")
    
    // const clickEdit = (status) => {
    //     setEdit(!status)
    //     console.log(status)
    // }
    const onChange = (e) => {
        setNewNama(
          e.target.value
        )
        console.log(newNama)
      }

    const handleBukaInput = () => {
        const newData = {
            id:id,
            nama:newNama
        }
        props.editNama(newData)
        setEdit(false)
      }
    
      const handleTutupInput = () => {
        setEdit(true)
      }
    let viewMode = {}
    let editMode = {}

    if (edit) {
        editMode.display = "none"
    } else {
        viewMode.display = "none"
    }
    return (
        <tr>
            <td>{id}</td>
            <td>{nama}</td>
            <td>{umur}</td>
            <td>{jenis_kelamin}</td>
            <td className="removeBorder" onClick={() => props.hapusPengunjung(id)}>
            <button>Hapus</button></td>
            {/* {editMode? 
            <td className="removeBorder">
                <input type="text" /><button onClick={clickEdit(editMode)}>save</button></td>
            :<td className="removeBorder" >
                <button >Edit</button></td>}*/}
            <td className="removeBorder" style={editMode}>
                <button onClick={handleTutupInput} >Edit Nama</button>
            </td>
            <td className="removeBorder" style={viewMode}>
                <input type="text" onChange={onChange}/>
                <button onClick={handleBukaInput} >Save</button>
            </td>
        </tr>
    )
}

export default ListItem;