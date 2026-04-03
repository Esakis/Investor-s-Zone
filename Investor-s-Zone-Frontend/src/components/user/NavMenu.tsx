import { Link, NavLink } from "react-router-dom";
import { Menu, Button, Icon } from 'semantic-ui-react';
import Clock from "../Clock";
import "./NavMenu.css";
import { useState, useEffect, useRef } from 'react';




const NavMenu = (props: { email: string, setEmail: (email: string) => void }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);


    const logout = async () => {
        try {
            await fetch('https://localhost:44349/api/account/logout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json; charset=UTF-8' },
                credentials: "include",
            });
        } catch (_e) {
            // backend not available
        }
        props.setEmail('');
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    let menu;

    if (props.email === '') {

        menu = (
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
              <li className="nav-item">
                    <Menu.Item>
                        <Button as='a' basic inverted href="/login">Login</Button>
                    </Menu.Item>
                </li>
             <li className="nav-item">
                    <Menu.Item>
                        <Button as='a' basic inverted href="/register">Sign up</Button>
                    </Menu.Item>
                </li>
            </ul>
        )

    }
    else {

        menu = (
            <div className="d-flex align-items-center gap-3">
                <Link to="/forum" className="nav-link text-white">
                    <Icon name="comment alternate outline" />Forum
                </Link>

                <div className="custom-dropdown" ref={dropdownRef} onMouseEnter={() => setIsDropdownOpen(true)} onMouseLeave={() => setIsDropdownOpen(false)}>
                    <div className={`custom-dropdown-toggle ${isDropdownOpen ? 'active' : ''}`} style={{display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', borderRadius: '4px'}}>
                        <Icon name="user circle outline" />
                        {props.email}
                        <Icon name="dropdown" />
                        <div className="custom-dropdown-menu" style={{position: 'absolute', top: '100%', left: '0', background: 'white', border: '1px solid #ddd', borderRadius: '4px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', zIndex: '1000', minWidth: '200px', display: isDropdownOpen ? 'block' : 'none', padding: '8px 0', margin: '0'}}>
                            <NavLink to="/profile" className="custom-nav-link"><Icon name="bell outline" />Profile</NavLink>
                            <NavLink to={"/account/" + props.email} className="custom-nav-link"><Icon name="edit outline" />Edit</NavLink>
                            <NavLink to={"/account/topup/" + props.email} className="custom-nav-link"><Icon name="upload" />Top Up</NavLink>
                            <NavLink to={"/account/exchange/" + props.email} className="custom-nav-link"><Icon name="money bill alternate outline" />Exchange</NavLink>
                            <NavLink to="/" onClick={logout} className="custom-nav-link logout-link"><Icon name="power off" />Logout</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        )

    }

    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
            <div className="container-fluid">

            <Menu.Item as={NavLink} to="/" style={{color: '#fff'}}>
                    <Icon name="balance scale" />Investor's Zone
                </Menu.Item>
                <Menu.Item style={{color: '#fff'}}>
                    <Clock />
                </Menu.Item>

                <div className="ms-auto">
                    {menu}
                </div>

            </div>
        </nav>
    );
}


export default NavMenu;
