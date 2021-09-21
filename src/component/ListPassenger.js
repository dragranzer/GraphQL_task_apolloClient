import ListItem from './ListItem';
import {gql, useQuery, useLazyQuery} from '@apollo/client'
import LoadingSvg from "./LoadingSvg"
import PassengerInput from './PassengerInput';
import { useState } from 'react';

const ListPassenger = props => {
    console.log(props.data)
        
    return (
        <div>
            <table cellPadding="5px" cellSpacing="0" style={{margin: "auto"}}>
                <thead bgcolor="red">
                    <td>ID</td>
                    <td>Nama</td>
                    <td>Umur</td>
                    <td>Jenis Kelamin</td>
                    <td bgcolor="white" className="removeBorder"></td>
                </thead>
                {props.data?.map(item => (
                    <ListItem
                        key={item.id}
                        data={item}
                        hapusPengunjung={props.hapusPengunjung}
                        editNama={props.editNama}
                    />
                ))}
            </table>
        </div>
    )
  }

export default ListPassenger;