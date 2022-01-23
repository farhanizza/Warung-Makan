import React from 'react';
import { Nav, Navbar, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const NavbarComponent = () => {
	return (
		<Navbar variant="dark" expand="lg">
			<Container>
				<Navbar.Brand href="#home">Warung Makan</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						<Nav.Link as={Link} to={'/'}>
							Home
						</Nav.Link>
						<Nav.Link as={Link} to={'/checkout'}>
							Check Out
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default NavbarComponent;
