import {Link, Outlet} from "react-router-dom";

import {Container, Nav, Navbar} from "react-bootstrap";
import {useContext, useEffect} from "react";
import AccountContext from "../../contexts/AccountContext";
import 'bootstrap/dist/css/bootstrap.min.css';

const MenuBar = () => {

    const {token} = useContext(AccountContext)

    useEffect(() => {
        if (token.length > 0) {
            fetch("http://localhost:8000/accounts/profile/view/", {
                headers: {
                    "Authorization": "Bearer " + token
                }
            }).then(response => response.json()).then(json => console.log("account:", json))
        }
    }, [token])

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
                      <Nav className={"justify-content-end"}>
                        <Nav.Link as={Link} to={"/login/"}>Login</Nav.Link>
                      </Nav>
                  </Nav>
                </Container>
            </Navbar>
            <Outlet/>
        </>
    )
}

export default MenuBar