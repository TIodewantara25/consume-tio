import React, { useState } from 'react';
import Case from './Case';
import ModalDelete from './ModalDelete';
import ModalEdit from './ModalEdit';
import ModalAdd from './ModalAdd';
import TrashStuff from '../pages/TrashStuff';
import TrashUser from '../pages/TrashUser';
import { Link } from 'react-router-dom';
import axios from 'axios';


export default function Table({headers, data, endpoint, identitasColumn, inputData, titleModal, opsiButton, columnForTd}) {
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [endpointTosend, setEndpointTosend] = useState([]);
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);
    const [isModalAddOpen, setIsModalAddOpen] = useState(false);
    
    function handleModalDelete(id) {
        const endpointDelete =endpoint['delete'];
        const endpointDetail =endpoint['data_detail'];
        const replaceUrlDelete = endpointDelete.replace ("{id}", id );
        const replaceUrlDetail = endpointDetail.replace ("{id}", id );
        const endpointReplaced ={
            "data_detail" : replaceUrlDetail,
            "delete" : replaceUrlDelete,
        }
        setEndpointTosend(endpointReplaced);
        setIsModalDeleteOpen(true);
    }

    function handleModalEdit(id) {
        const endpointUpdate = endpoint['update'];
        const endpointDetail = endpoint['data_detail'];
        const replaceUrlEdit = endpointUpdate.replace ("{id}", id );
        const replaceUrlDetail = endpointDetail.replace ("{id}", id );
        const endpointReplaced ={
            "data_detail":replaceUrlDetail,
            "update": replaceUrlEdit,
        }
        setEndpointTosend(endpointReplaced);
        setIsModalEditOpen(true)
    }
    
    function handleModalAdd() {
        const endpointReplaced =
        {
            "store" : endpoint['store'],
        }
        setEndpointTosend(endpointReplaced);
        setIsModalAddOpen(true)
    }

    function handleRestore(id) {
        const endpointRestore = endpoint['restore'].replace("{id}", id);
        axios.get(endpointRestore, {
            headers: {
                'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
            }
        })
        .then(res =>{
            window.location.reload();
        })
        .catch(err =>{
            console.log(err)
            if (err.response.status == 401) {
                navigate('/login?message=' + encodeURIComponent('Anda Belum Login!'));
            }
        })
    }

    function handlePermanentDelete(id) {
        const endpointPermanentDeleted = endpoint['delete_permanent'].replace("{id}", id);
        axios.delete(endpointPermanentDeleted, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
            }
        })
        .then(res => {
            window.location.reload();
        })
        .catch(err => {
            console.log(err)
            if (err.response.status == 401) {
                navigate('/login?message=' + encodeURIComponent('Anda belum login'));
            }
        })
    }


  return (
    <>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg px-20 py-10">
        <div className="flex justify-end">
            {
        opsiButton.includes("create") ? (
            <button type="button" onClick={handleModalAdd} class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 mb-5">Create</button>
                    ) : ''
                }
                {
        opsiButton.includes("trash") && location.pathname.includes('/stuffs') && (
                <Link to={'/stuffs/trash'} className="inline-flex items-center px-4 py-2 text-sm ml-3 font-medium text-center text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800 mb-5" >Trash</Link>
                )
                } 
                {
                opsiButton.includes("trash") && location.pathname.includes('/user') && (
                <Link to={'/users/trash'} className="inline-flex items-center px-4 py-2 text-sm ml-3 font-medium text-center text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800 mb-5" >Trash</Link>
                )}   
        </div>


    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                {headers.map((header, index)=> (

                    <th scope="col" class="px-6 py-3"key={index}>{header}</th>
                ))}
                <th scope="col" class="px-6 py-3"></th>

            </tr>
        </thead>
        <tbody>
            {
                Object.entries(data).map(([index, item]) => (
                    <>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{parseInt(index)+1}</td>
                    {
                        Object.entries(columnForTd).map(([key, value]) => (
                            <td class= "px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {!value ? item[key] : item[key.replace(/[!&*;:]/g, '')] ?  item[key.replace(/[!&*;:]/g, '')] [value] : '0'}</td>
                        ))
                    }

                    {/* <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.name}</td>
                    <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.category}</td>
                    <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.stuff_stock ? item.stuff_stock.total_available : '0'}</td>
                    <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.stuff_stock ? item.stuff_stock.total_defec : '0'}</td> */}
                    <td class="px-6 py-4 text-right">
                        {
                            opsiButton.includes("edit") ? (
                             <button type="button" onClick={() => handleModalEdit(item.id)} class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</button>
                            ) : ''
                        }
                        {
                            opsiButton.includes("delete") ? (
                                <button  type= "button" onClick={() => handleModalDelete(item.id)}  class="inline-flex items-center px-4 py-2 text-sm ml-3 font-medium text-center text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 mb-5">Delete</button>
                            ) : ''
                        }
                        {
                            opsiButton.includes("restore") ? (
                                <button onClick={() => handleRestore(item.id)} type= "button" class="font-medium text-green-600 dark:text-green-500 hover:underline ml-3">Restore</button>
                            ) : ''
                        }
                        {
                            opsiButton.includes("permanentDeletes") ? (
                                <button onClick={() => handlePermanentDelete(item.id)} type= "button" class="font-medium text-blue-600 dark:text-red-500 hover:underline ml-3">Delete Permanent</button>
                            ) : ''
                        }
                        
                    </td>
                </tr>


                </>
                ))
            }    
        </tbody>
    </table>
</div>

    <ModalDelete isOpen={isModalDeleteOpen} onClose={() => setIsModalDeleteOpen(false)} endpoint={endpointTosend} identitasColumn={identitasColumn} ></ModalDelete>
    <ModalEdit isOpen={isModalEditOpen} onClose={() => setIsModalEditOpen(false)} endpoint={endpointTosend}  inputData={inputData} titleModal={titleModal}></ModalEdit>
    <ModalAdd isOpen={isModalAddOpen} onClose={() => setIsModalAddOpen(false)} endpoint={endpointTosend}  inputData={inputData} titleModal={titleModal}></ModalAdd>
    </>
  )
}
