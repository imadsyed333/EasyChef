import {Link} from "react-router-dom";

import {Container, Nav, Navbar} from "react-bootstrap";

const MenuBar = () => {

    const getAccountInfo = () => {
        // pass
    }

    return (
        <div>
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
                </Container>
            </Navbar>
        </div>
    )
}

export default MenuBar