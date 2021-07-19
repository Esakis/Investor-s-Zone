import * as React from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './componentsCss/NavMenu.css';

export default class NavMenu extends React.PureComponent<{}, { isOpen: boolean }> {
    public state = {
        isOpen: false
    };

    public render() {
        return (
            <header>
                <Navbar className="navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow mb-3" light>
                    <Container>
                        <NavbarBrand tag={Link} to="/">Strefa Inwestora</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} className="mr-2"/>
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={this.state.isOpen} navbar>
                            <ul className="navbar-nav flex-grow">
                               
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/counter">Counter</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/logowanie">Logowanie</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/wymiana">Wymiana</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/exchange">Exchange Chart</NavLink>
                                </NavItem>
                            </ul>
                        </Collapse>
                    </Container>
                </Navbar>
            </header>
        );
    }


const NavMenu = () => {

    
          
    let menu;

    
  



        menu = (

            <ul className="navbar-nav me-auto mb-2 mb-md-0">
                <li className="nav-item">
                    <Link to="/login" className="nav-link active" >Login</Link>
                </li>
                <li className="nav-item">
                    <Link to="/register" className="nav-link active" href="#" >Register</Link>
                </li>


                <li className="nav-item">
                    <Link to="/logout" className="nav-link active" href="#">Logout</Link>
                </li>
            </ul>

        )
    
  

    return( 
            <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
                <div className="container-fluid">
                    <Link  to="/" className="navbar-brand">Strefa Inwestora</Link>

                    <div >
                    {menu} 
                </div>
                 
                </div>
            </nav>
        );
}


    
    

export default NavMenu;
