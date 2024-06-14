import React, {useEffect, useState} from 'react'
import Case from '../components/Case'
import Table from '../components/Table';

import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Stuff() {
    const [stuffs, setStuffs] = useState([]);

    const navigate = useNavigate();

    useEffect (() => {
        getStuffs()
    }, []);

    function getStuffs() {
        axios.get(`${import.meta.env.VITE_API_URL}/stuff/data`, {
            headers: {
                'Authorization' : 'Bearer' + localStorage.getItem('access_token'),
            }
        })
        .then(res =>{
            setStuffs(res.data.data);
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
        "Category",
        "Total Available",
        "Total Defac"
    ]

    const endpointModal ={
        "data_detail" :"http://localhost:8000/stuff{id}",
        "delete" :"http://localhost:8000/stuff/{id}",
        "update" :"http://localhost:8000/stuff/{id}",
        "store" :"http://localhost:8000/stuff/store"
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
    
    const title = 'Stuff'

    const buttons = [
        "create",
        "trash",
        "edit",
        "delete",
    ]

    const tdColumn ={
        "name":null,
        "category":null,
        "stuff_stock" : "total_available",
        "stuff_stock*" : "total_defec"

    }
  return (
    
    <Case>
        <Table
         headers={headers} 
         data={stuffs} 
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
