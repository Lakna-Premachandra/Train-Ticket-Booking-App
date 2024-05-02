
import { Route, Routes, Outlet, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/SignIn";
import Header from "./header";
import './style.scss'
import Footer from "./footer";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import React, { useEffect, useRef, useState } from 'react'
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useForm } from "react-hook-form"
import { Link } from 'react-router-dom';
import Add from "../Admin/Add";
import Admin from "../Admin";
import Edit from "../Admin/Edit";
import Proceed from "./pages/Proceed";
import Gallery from "./pages/Gallery";
import Swal from 'sweetalert2';
import BookData from "../Admin/BookData";
import Offers from "./pages/Offers";
import AdminHome from "../Admin/AdminHome";





const Main = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const storedLoginStatus = localStorage.getItem('isLoggedIn');
        if (storedLoginStatus === 'true') {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogin = () => {
        setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', 'true');
    };
    const handleLogout = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You will be logged out.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, log out"
        }).then((result) => {
            if (result.isConfirmed) {
                setIsLoggedIn(false);
                localStorage.removeItem('isLoggedIn');
                Swal.fire({
                    title: "Logged Out!",
                    text: "You have been logged out.",
                    icon: "success"
                });
                navigate("/")
            }
        });
    };


    const Layout = () => {
        return (
            <>
                <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
                <Outlet />
                <Footer />
            </>
        )
    }

    return (
        <>

            <Routes>

                <Route path="/" element={<Layout />}>
                    <Route path='/' element={<Home />} />
                    <Route element={<About />} path="/about" />
                    <Route element={<Gallery />} path="/gallery" />
                    <Route element={<Proceed />} path="/proceed" />
                    <Route element={<Offers />} path="/offers" />

                    
                </Route>

                <Route path="/signin" element={<SignIn onLogin={handleLogin} />} />
                <Route element={<SignUp />} path="/signup" />
                <Route path="/admin" element={<Admin />} />
                <Route path="admin/add" element={<Add />} />
                <Route path="admin/edit/:id" element={<Edit />} />
                <Route path='/data' element={<BookData />} />
                <Route path='/home' element={<AdminHome/>} />
                

            </Routes>

        </>
    )
}

export default Main;