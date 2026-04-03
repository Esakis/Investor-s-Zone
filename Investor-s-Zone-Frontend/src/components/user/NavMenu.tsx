import { Link, NavLink } from "react-router-dom";
import { Menu, Button, Icon } from 'semantic-ui-react';
import Clock from "../Clock";
import '../componentsCss/NavMenu.css';




const NavMenu = (props: { email: string, setEmail: (email: string) => void }) => {


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

                <div className="ui compact menu inverted">
                    <div className="ui simple dropdown item" style={{position: 'relative', cursor: 'pointer'}}>
                        <Icon name="user circle outline" />
                        {props.email}
                        <Icon name="dropdown" />
                        <div className="custom-dropdown-menu">
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
