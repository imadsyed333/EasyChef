import {Link, Outlet} from "react-router-dom";

import {useContext, useEffect, useState} from "react";
import AccountContext from "../../contexts/AccountContext";
import NavBar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import {Navbar} from "react-bootstrap";

const MenuBar = () => {

    const {token, setToken} = useContext(AccountContext)
    const [user, setUser] = useState({})

    useEffect(() => {
        if (token.length > 0) { //get rid of token == null
            fetch("http://localhost:8000/accounts/profile/view/", {
                headers: {
                    "Authorization": "Bearer " + token
                }
            }).then(response => response.json()).then(json => setUser(json))
        }
    }, [token])

    const logout = () => {
        localStorage.setItem("token", "")
        const formData = new FormData()
        formData.append("refresh", localStorage.getItem("refresh"))
        fetch("http://localhost:8000/accounts/logout/", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + token
            },
            body: formData
        }).then(response => response.json()).then(json => console.log(json))
        setToken("")
        localStorage.setItem("refresh", "")
    }

    const authLinks = () => {
        if (token) {
            return (
                <Navbar.Collapse className={"justify-content-end"}>
                    <NavBar.Text style={{marginRight: ".5rem"}}>
                        Hello {user.first_name}!
                    </NavBar.Text>
                    <Nav.Link as={Link} to={"/"} onClick={logout}>Log Out</Nav.Link>
                </Navbar.Collapse>

            )
        } else {
            return (
                <>
                    <Navbar.Collapse className={"justify-content-end"}>
                        <Nav.Link as={Link} to={"/login/"} style={{marginRight: ".5rem"}}> Login </Nav.Link>
                        <Nav.Link as={Link} to={"/signup/"}> Sign Up </Nav.Link>
                    </Navbar.Collapse>
                </>
            )
        }
    }

    return (
        <>
            <Navbar bg="light" variant="light">
                <Container>
                    <Navbar.Brand as={Link} to={"/"}>
                        <img src="logo192.png" alt={""}/>
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/myrecipes">My Recipes</Nav.Link>
                        <Nav.Link as={Link} to={"/cart"}>Shopping Cart</Nav.Link>
                    </Nav>
                    {authLinks()}
                </Container>
            </Navbar>
            <Outlet/>
        </>
    )
}

export default MenuBar
