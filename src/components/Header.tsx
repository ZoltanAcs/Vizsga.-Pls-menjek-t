import { Container, Nav, Navbar } from "react-bootstrap"

const Header = () => {
    return(
        <Navbar className="bg-dark container">
            <Container>
                <Nav className="navbar">
                    <Nav.Link className="text-light" href="/">
                        Filmek
                    </Nav.Link>
                    <Nav.Link className="text-light" href="/kosar">
                        Kosár
                    </Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default Header