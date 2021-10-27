import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Nav, Container,  NavDropdown} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlaneDeparture, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import SwipeableTemporaryDrawer from './Task';
import "./banner.css";

export default function Header(){
    return(
        <>
            <Navbar collapseOnSelect style={{top: '0', position:'fixed', width:'100%', zIndex:'3'}} expand='sm' bg='white' variant='light'>
                <Container style={{ backgroundColor:"white", color:'black'}}>
                    <Navbar.Toggle aria-controls='responsive-navbar-nav' />
                    <Navbar.Collapse className='d-flex justify-content-around' id='responsive-navbar-nav'>
                    <Navbar.Brand href="/"><img style={{width: '150px'}} src='https://blogger.googleusercontent.com/img/a/AVvXsEibJVA-mScxxMpKCQjfTKy64oXLvI3-9cXsDfdP9wZjvDoYGU0BdwcW8Cm3dU62VCjIDWvbAMQ-fa99IDllDSz63znuZAKBJDBJeRzWfxibidojxBMrNRl8_RDTWMWB7VZ7vhDroQ3lZEcZf8vn5DVCbjAxCQH1GEieObxcwV6E15YuA8NynpuWIN0B=s320' /></Navbar.Brand>
                    <Nav>
                        <Nav.Link href='/new'> NEW IN </Nav.Link>
                        <Nav.Link href='/topsellsers'> TOP SELLERS </Nav.Link>
                        <Nav.Link href='sale'> SALE </Nav.Link>
                        <Nav.Link href='aboutus'> ABOUT US </Nav.Link>
                        <Nav.Link href='login'> JOIN&ensp; <FontAwesomeIcon icon={faSignInAlt} /> </Nav.Link>
                    </Nav>
                    <SwipeableTemporaryDrawer></SwipeableTemporaryDrawer>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}