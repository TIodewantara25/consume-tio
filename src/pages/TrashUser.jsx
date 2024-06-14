import React, { useEffect, useState } from 'react';
import Case from '../components/Case';
import axios from 'axios';
import Table from '../components/Table';


export default function TrashUser() {
  const [usersTrash, setUsersTrash] = useState([])

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/user/trash`, {
      headers:{
        'Authorization': 'Bearer' + localStorage.getItem('access_token'),
      }
    })
    .then(res =>{
      setUsersTrash(res.data.data);
    })
    .catch(err => {
      console.log(err)
      if (err.response.status == 401) {
        navigate('/login?message=' + encodeURIComponent('Anda Belum Login!'))
      }
    })
  },[])

  const headers =[
    "#",
    "username",
    "email",
    "role",
  ]

  const endpointModal ={
    "restore": "http://localhost:8000/user/restore/{id}",
    "delete_permanent": "http://localhost:8000/user/Permanent/{id}"
  }

  const inputData ={}

  const title = 'User'

  const columnIdentitasDelete = 'name'

  const buttons =[
    "restore",
    "permanentDeletes",
  ]

  const tdColumn ={
    "username":null,
    "email":null,
    "role":null,


  }

  

  return (
    <>
    <Case>
      <Table
         headers={headers} 
         data={usersTrash} 
         endpoint={endpointModal}
         inputData={inputData} 
         titleModal={title}
         identitasColumn={columnIdentitasDelete}
         opsiButton={buttons}
         columnForTd={tdColumn}>
      </Table>
    </Case>
    </> 
  )
}
