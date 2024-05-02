import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useNavigate } from 'react-router-dom';
export default function AdminNav() {
    const [details, setDetails] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();
    const url = "https://localhost:44327/api/Train";

    useEffect(() => {
        fetch(url)
            .then((res) => res.json())
            .then((details) => setDetails(details))
            .catch((error) => console.error("Error fetching data:", error));
    }, []);


    const filteredDetails = details.filter((detail) =>
        detail.id.toString().includes(searchQuery)
    );
    return (
        <>
            <Navbar style={{ padding: "0.8rem 2rem" }} expand="lg" className="bg-dark ">
                <Container fluid>
                    <Navbar.Brand className='flex items-center justify-center gap-[1rem]' href="#"><Link to='/home' className='no-underline text-[white]' >Admin Dashboard</Link></Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Nav.Link><Link to='/admin' className='no-underline text-[white]'>Train Schedule</Link></Nav.Link>
                            <Nav.Link><Link to='/data' className='no-underline text-[white]'>Reservations</Link></Nav.Link>


                        </Nav>
                        <img width={40} src="src/assets/images/Auckland_transport_train_logo.png" alt="" />
                       
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}
