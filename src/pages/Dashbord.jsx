import React, { useEffect, useState } from 'react';
import Case from '../components/Case';
import axios from 'axios';
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';

export default function Dashboard() {
  const [stuffs, setStuffs] = useState([]);
  const [users, setUsers] = useState([]);

  const [sarprasStuffs, setSarpras] = useState([]);
  const [HTLStuffs, setHTL] = useState([]);
  const [KLNStuffs, setKLN] = useState([]);

  const [checkProses, setCheckProses] = useState(false);
  const [lendingGrouped, setLendingGrouped] = useState([]);
  
  const[isLogin, setIsLogin] = useState(false);
  const[authUser, setAuthUser] = useState([]);

  


    useEffect (() => {
      axios.get(`${import.meta.env.VITE_API_URL}/profile`, {
          headers: {
              'Authorization' : 'Bearer ' + localStorage.getItem('access_token'),
          }
      })
      .then(res => {
          setIsLogin(true);
          setAuthUser(res.data.data);   
        })
      .catch(err =>{
          setIsLogin(false);
      })
        getDataStuffs();
        getDataUsers();
        getDataLendings();  
  }, [checkProses]);

  function getDataStuffs() {
    axios
      .get(`${import.meta.env.VITE_API_URL}/stuff/data`, {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
          },
        })
        .then((res) => {
          const allStuffs = res.data.data;
          setStuffs(allStuffs);

            const sarprasStuffs = allStuffs.filter(stuff => stuff.category === 'Teknisi/Sarpras');
            setSarpras(sarprasStuffs.length);

          const HTLStuffs = allStuffs.filter(stuff => stuff.category === 'HTL');
          setHTL(HTLStuffs.length);

          const KLNStuffs = allStuffs.filter(stuff => stuff.category === 'KLN');
          setKLN(KLNStuffs.length);

        })
        .catch((err) => {
          if (err.response.status === 401) {
            navigate('/login?message=' + encodeURIComponent('Anda belum login!'));
          }
        });
    }

    function getDataUsers() {
      axios
        .get(`${import.meta.env.VITE_API_URL}/user/data`, {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
          },
        })
        .then((res) => {
          setUsers(res.data.data);
        })
        .catch((err) => {
          if (err.response.status === 401) {
            navigate('/login?message=' + encodeURIComponent('Anda belum login!'));
          }
        });
    }

    function getDataLendings() {
      axios
        .get(`${import.meta.env.VITE_API_URL}/lending`, {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
          },
        })
        .then((res) => {
          const data = res.data.data;
          const groupedData = {};

          data.forEach((entry) => {
            const date = new Date(entry.date_time);
            const FormattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
            if (!groupedData[FormattedDate]) {
              groupedData[FormattedDate] = [];
            }
            groupedData[FormattedDate].push(entry);
          });

          const processedData = Object.keys(groupedData).map((date) => ({
            date,
            totalStuff: groupedData[date].reduce((acc, entry) => acc + entry.total_stuff, 0),
          }));

          setLendingGrouped(processedData);
          setCheckProses(true);
        })
        .catch((err) => {
          if (err.response.status === 401) {
            navigate('/login?message=' + encodeURIComponent('Anda belum login!'));
          }
        });
    }


    return (
      <Case>
        <div className="flex flex-wrap justify-center m-10">

        <div className="p-4 w-1/2">
          <div className="flex rounded-lg h-full dark:bg-gray-800 bg-teal-400 p-8 flex-col">
            <div className="flex items-center mb-3">
              <div
                className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full dark:bg-indigo-500 bg-indigo-500 text-white flex-shrink-0">
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                  strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                </svg>
              </div>
              <h2 className="text-white dark:text-white text-lg font-medium">Data Stuff</h2>
            </div>
            <div className="flex flex-col justify-between flex-grow">
              <h1 className="text-white dark:text-white text-lg font-medium">{stuffs.length}</h1>
            </div>
          </div>
        </div>    
          {
      //cek status login ? cek role admin ? statement  admin : statement staff : statemnt belum login 
      
      isLogin ? authUser['role'] === 'staff' ? (
          <>
  <div className="p-4 w-1/2">
            <div className="flex rounded-lg h-full dark:bg-gray-800 bg-teal-400 p-8 flex-col">
              <div className="flex items-center mb-3">
                <div
                  className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full dark:bg-indigo-500 bg-indigo-500 text-white flex-shrink-0">
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                    strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                  </svg>
                </div>
                <h2 className="text-white dark:text-white text-lg font-medium">Teknisi/Sarpras</h2>
              </div>
              <div className="flex flex-col justify-between flex-grow">
                <h1 className="text-white dark:text-white text-lg font-medium">{sarprasStuffs}</h1>
              </div>
            </div>
          </div>
          
          <div className="p-4 w-1/2">
            <div className="flex rounded-lg h-full dark:bg-gray-800 bg-teal-400 p-8 flex-col">
              <div className="flex items-center mb-3">
                <div
                  className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full dark:bg-indigo-500 bg-indigo-500 text-white flex-shrink-0">
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                    strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                  </svg>
                </div>
                <h2 className="text-white dark:text-white text-lg font-medium">KLN</h2>
              </div>
              <div className="flex flex-col justify-between flex-grow">
                <h1 className="text-white dark:text-white text-lg font-medium">{KLNStuffs}</h1>
              </div>
            </div>
          </div>

          <div className="p-4 w-1/2">
            <div className="flex rounded-lg h-full dark:bg-gray-800 bg-teal-400 p-8 flex-col">
              <div className="flex items-center mb-3">
                <div
                  className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full dark:bg-indigo-500 bg-indigo-500 text-white flex-shrink-0">
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                    strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                  </svg>
                </div>
                <h2 className="text-white dark:text-white text-lg font-medium">HTL</h2>
              </div>
              <div className="flex flex-col justify-between flex-grow">
                <h1 className="text-white dark:text-white text-lg font-medium">{HTLStuffs}</h1>
              </div>
            </div>
          </div>

        </>
        
    ) : (
      
      <>
            <div className="p-4 w-1/2">
              <div className="flex rounded-lg h-full dark:bg-gray-800 bg-teal-400 p-8 flex-col">
                <div className="flex items-center mb-3">
                  <div
                    className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full dark:bg-indigo-500 bg-indigo-500 text-white flex-shrink-0">
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                      strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                    </svg>
                  </div>
                  <h2 className="text-white dark:text-white text-lg font-medium">Data User</h2>
                </div>
                <div className="flex flex-col justify-between flex-grow">
                  <h1 className="text-white dark:text-white text-lg font-medium">{users.length}</h1>
                </div>
              </div>
            </div>
            <BarChart
              width={500}
              height={300}
              data={lendingGrouped}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="totalStuff" fill="#8884d8" />
            </BarChart>
          </>  
    ) : ''
}         
      </div>
    </Case>
  );
}
