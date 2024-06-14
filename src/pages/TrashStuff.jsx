import React, { useEffect, useState } from 'react';
import Case from '../components/Case';
import axios from 'axios';
import Table from '../components/Table';


export default function TrashStuff() {
  const [stuffsTrash, setStuffsTrash] = useState([])

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/stuff/trash`, {
      headers:{
        'Authorization': 'Bearer' + localStorage.getItem('access_token'),
      }
    })
    .then(res =>{
      setStuffsTrash(res.data.data);
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
    "name",
    "category"
  ]

  const endpointModal ={
    "restore": "http://localhost:8000/stuff/restore/{id}",
    "delete_permanent": "http://localhost:8000/stuff/Permanent/{id}"
  }

  const inputData ={}

  const title = 'Stuff'

  const columnIdentitasDelete = 'name'

  const buttons =[
    "restore",
    "permanentDeletes",
  ]

  const tdColumn ={
    "name": null,
    "category": null,
  }

  

  return (
    <>
    <Case>
      <Table
         headers={headers} 
         data={stuffsTrash} 
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
