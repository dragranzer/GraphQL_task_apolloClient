import "./Home.css"
import { useState } from 'react';
const ListItem = (props) => {

    const { id, nama, umur, jenis_kelamin } = props.data
    const [editMode, setEdit] = useState(false)
    const clickEdit = (status) => {
        setEdit(!status)
        console.log(status)
    }
    return (
        <tr>
            <td>{id}</td>
            <td>{nama}</td>
            <td>{umur}</td>
            <td>{jenis_kelamin}</td>
            <td className="removeBorder" onClick={() => props.hapusPengunjung(id)}>
            <button>Hapus</button></td>
            {editMode? 
            <td className="removeBorder">
                <input type="text" /><button onClick={clickEdit(editMode)}>save</button></td>
            :<td className="removeBorder" >
                <button >Edit</button></td>}            
        </tr>
    )
}

export default ListItem;