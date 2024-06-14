import React, {useEffect, useState} from 'react'
import Case from '../components/Case'
import Table from '../components/Table';

import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function User() {
    const [users, setUsers] = useState([]);

    const navigate = useNavigate();

    useEffect (() => {
        getUsers()
    }, []);

    function getUsers() {
        axios.get(`${import.meta.env.VITE_API_URL}/user/data`, {
            headers: {
                'Authorization' : 'Bearer' + localStorage.getItem('access_token'),
            }
        })
        .then(res =>{
            setUsers(res.data.data);
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
        "Username",
        "Email",
        "Role",
        
    ]

    const endpointModal ={
        "data_detail" :"http://localhost:8000/user{id}",
        "delete" :"http://localhost:8000/user/{id}",
        "update" :"http://localhost:8000/user/{id}",
        "store" :"http://localhost:8000/user/store"
    }
    const columnIdentitasDelete = 'name'; 

    const inputData={
        "username" :{
            "tag" :"text",
            "type" :"text",
            "option" :null
        },
        "email" : {
            "tag" :"select",
            "type" :"select",
            "option" : null

        },
    }
    
    const title = 'User'

    const buttons = [
        "create",
        "trash",
        "delete"
    ]

    const tdColumn ={
        "username":null,
        "email":null,
        "role":null,

    }
  return (
    
    <Case>
        <Table
         headers={headers} 
         data={users} 
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
