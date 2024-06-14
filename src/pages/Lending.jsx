import React, {useEffect, useState} from 'react'
import Case from '../components/Case'
import Table from '../components/Table';

import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Leading() {
    const [lendings, setlendings] = useState([]);

    const navigate = useNavigate();

    useEffect (() => {
        getlendings()
    }, []);

    function getlendings() {
        axios.get(`${import.meta.env.VITE_API_URL}/lending/data`, {
            headers: {
                'Authorization' : 'Bearer' + localStorage.getItem('access_token'),
            }
        })
        .then(res =>{
            setlendings(res.data.data);
        })
        .catch(err => {
            console.log(err)
            if (err.response.status == 401) {
                navigate('/login?message=' + encodeURIComponent('Anda Belum Login!'));
            }
        })
    }

    const headers =[
        "#",
        "Name",
        "Stuff_id",
        "Date_time",
        "User_id",
        "Notes",
        "Total_stuff"
    ]

    const endpointModal ={
        "data_detail" :"http://localhost:8000/lending{id}",
        "delete" :"http://localhost:8000/lending/{id}",
        "update" :"http://localhost:8000/lending{id}",
        "store" :"http://localhost:8000/lending/store"
    }
    const columnIdentitasDelete = 'name'; 

    const inputData={
        "name" :{
            "tag" :"input",
            "type" :"text",
            "option" :null
        },
        "category" : {
            "tag" :"select",
            "type" :"select",
            "option" : ["HTL","KLN","Teknisi/Sarpras"]

        },
    }
    
    const title = 'Lending'

    const buttons = [
        "create",
        "trash",
        "edit",
        "delete",
    ]

    const tdColumn ={
        "name":null,
        "stuff_id":null,
        "date_time":null,
        "user_id":null,
        "notes":null,
        "total_stuff":null,

    }
  return (
    
    <Case>
        <Table
         headers={headers} 
         data={lendings} 
         endpoint={endpointModal}
         identitasColumn={columnIdentitasDelete}
         inputData={inputData} 
         titleModal={title}
         opsiButton={buttons}
         columnForTd={tdColumn}>
         </Table>
    </Case>
  );
}
