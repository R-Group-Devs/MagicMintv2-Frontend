import react from "react";
import "./Nav.css"
import { Navbar, Container, Nav, NavDropdown} from "react-bootstrap"


function Header(){
    
  const navPadding ={
    marginLeft: "10px",
    marginRight: "10px"
  }
    return(
        <div>

        <div className={navPadding}>

          <Navbar bg="light" expand="lg">
              <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link href="#home">Home</Nav.Link>
                  <Nav.Link href="#link">Link</Nav.Link>
                  <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                  </NavDropdown>
                </Nav>
                <Nav>
                  <Nav.Link eventKey={2} href="#memes">
                    Profile
                  </Nav.Link>
                  </Nav>
              </Navbar.Collapse>
          </Navbar>
          </div>




            
        </div>
    )
}


export default Header;