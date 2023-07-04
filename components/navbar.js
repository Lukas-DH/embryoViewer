import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Image from "next/image";
import bioBrand from "../public/logo_mobile-retina.png";
import Link from "next/link";

function NaviBarBioG() {
  return (
    <>
      <Navbar bg="light" expand="md">
        <Container>
          <Navbar.Brand>
            <Link href="/">
              <Image
                src={bioBrand}
                height={94}
                alt="me"
                className="d-inline-block align-top"
              />
            </Link>{" "}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/createQR" style={{ fontSize: "25px" }}>
                Create barcode
              </Nav.Link>
              {/* <Nav.Link href="#features">Search</Nav.Link> */}
            </Nav>
            <Nav>
              {/* <Nav.Link href="#deets">Lukas Stojanov</Nav.Link>
              <Nav.Link eventKey={2} href="#memes"> */}
              {/* Sign-in */}
              {/* </Nav.Link>{" "} */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NaviBarBioG;
