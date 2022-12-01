import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Image from "next/image";
import bioBrand from "../public/logo_mobile-retina.png";

function TextLinkExample() {
  return (
    <>
      {/* <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">
            <Image
              src={bioBrand}
              height={30}
              alt="me"
              className="d-inline-block align-top"
            />{" "}
          </Navbar.Brand>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Create barcode</Nav.Link>
              <Nav.Link href="#features">Search</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="#deets">Lukas Stojanov</Nav.Link>
              <Nav.Link eventKey={2} href="#memes">
                Sign-in
              </Nav.Link>
            </Nav>{" "}
          </Navbar.Collapse>
        </Container>
      </Navbar> */}

      <Navbar bg="light" expand="md">
        <Container>
          <Navbar.Brand href="#home">
            {" "}
            <Image
              src={bioBrand}
              height={30}
              alt="me"
              className="d-inline-block align-top"
            />{" "}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Create barcode</Nav.Link>
              <Nav.Link href="#features">Search</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="#deets">Lukas Stojanov</Nav.Link>
              <Nav.Link eventKey={2} href="#memes">
                Sign-in
              </Nav.Link>{" "}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default TextLinkExample;
