import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

export default Menu => {
    return (
        <Navbar bg="dark" variant="dark" sticky="top">
            <Container>
                <Nav>
                    <Nav.Link href="/">Rooms</Nav.Link>
                    <Nav.Link href="/workspaces">Workspaces</Nav.Link>
                    <Nav.Link href="/equipments">Equipments</Nav.Link>
                    <NavDropdown title="Add">
                        <NavDropdown.Item><Link to={{pathname:"/manage" , t:"r", mode:false}}>
                            Room</Link></NavDropdown.Item>
                        <NavDropdown.Item><Link to={{pathname:"/manage" , t:"w", mode:false}}>
                            Workspace</Link></NavDropdown.Item>
                        <NavDropdown.Item><Link to={{pathname:"/manage" , t:"e", mode:false}}>
                            Equipment</Link></NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Container>
        </Navbar>
    )
}