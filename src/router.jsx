import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./pages/Login";   
import Profile from "./pages/Profile"                  
import Dashbord from "./pages/Dashbord";
import Stuff from "./pages/Stuff";
import TrashStuff from "./pages/TrashStuff";
import Inbound from "./pages/Inbound";
import User from "./pages/User"
import TrashUser from "./pages/TrashUser";
import Leading from "./pages/Lending";

export const router = createBrowserRouter([
    { path: '/', element: <App /> },
    { path: '/login', element: <Login /> },
    { path: '/profile', element: <Profile /> },
    { path: '/dashbord', element: <Dashbord /> },
    { path: '/stuffs', element: <Stuff /> },
    { path: '/stuffs/trash', element: <TrashStuff /> },
    { path: '/inbound-stuff', element: <Inbound /> },
    { path: '/user', element: <User /> },
    { path: '/users/trash', element: <TrashUser /> },
    { path: '/lendings', element: <Leading /> }
])