import {Link, Outlet} from "react-router-dom";

import {useContext, useEffect, useState} from "react";
import AccountContext from "../../contexts/AccountContext";
import NavBar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import {Navbar} from "react-bootstrap";

const MenuBar = () => {
    const {username, token, setToken, setUsername} = useContext(AccountContext)

    useEffect(() => {
        if (token.length > 0) { //get rid of token == null
            fetch("http://localhost:8000/accounts/profile/view/", {
                headers: {
                    "Authorization": "Bearer " + token
                }
            }).then(response => {
                if (response.status === 200) {
                    response.json().then(json => {
                        setUsername(json.first_name)
                    })
                } else {
                    logout()
                }
            }).catch(errors => console.log(errors))
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
        }).then(response => {
            if (response.status === 200) {
                setToken("")
                localStorage.setItem("refresh", "")
            } else {
                console.log(response.json())
            }
        }).catch(errors => console.log(errors))
    }

    const authLinks = () => {
        if (token) {
            return (
                <Navbar.Collapse className={"justify-content-end"}>
                    <NavBar.Text style={{marginRight: ".5rem"}}>
                        Hello {username}!
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

    const userLinks = () => {
        if (token) {
            return (
                <>
                    <Nav.Link as={Link} to={"/myrecipes/"}>My Recipes</Nav.Link>
                    <Nav.Link as={Link} to={"/recipe/add/"}>Add Recipe</Nav.Link>
                    <Nav.Link as={Link} to={"/cart"}>Shopping Cart</Nav.Link>
                </>
            )
        }
    }

    return (
        <>
            <Navbar bg="light" variant="light" sticky={"top"}>
                <Container>
                    <Navbar.Brand>
                        <img src={require('./logo.png')} alt={""} style={{height: 50, width: 50}}/>
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to={"/popular/"}>Popular Recipes</Nav.Link>
                        {userLinks()}
                    </Nav>
                    {authLinks()}
                </Container>
            </Navbar>
            <div>
                <Outlet/>
            </div>
        </>
    )
}

export default MenuBar
