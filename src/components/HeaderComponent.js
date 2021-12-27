import React, { Component } from "react";
import { Navbar, Nav, NavbarToggler, Collapse, NavItem, NavbarBrand } from 'reactstrap';
import { NavLink } from 'react-router-dom';

class Header extends Component {

    constructor (props) {
        super(props);
        this.state = {
            isNavOpen: false,
        };
        this.toggleNav = this.toggleNav.bind(this);
    };

    toggleNav () {
        this.setState({ isNavOpen: !this.state.isNavOpen });
    }

    render() {
        return (
            <React.Fragment>
                <Navbar dark expand="md">
                    <div className="container">
                        <NavbarToggler onClick={this.toggleNav} />
                        <NavbarBrand className='mr-auto' href="/">
                            <img src='assets/images/logo.png' height='30' width='41' alt="Ristorante Con Fusion" />
                        </NavbarBrand>
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar>
                                <NavItem>
                                    <NavLink className='nav-link' to='/staffs'><span className='fa fa-users fa-lg'></span> Nhân viên</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className='nav-link' to='/departments'><span className='fa fa-id-card-o fa-lg'></span> Phòng ban</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className='nav-link' to='/salary'><span className='fa fa-money fa-lg'></span> Bảng lương</NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                        <NavbarBrand className='mr-auto' href="/">
                            <h5>Ứng dụng quản lý nhân sự V1.0</h5>
                        </NavbarBrand>
                    </div>
                </Navbar>
            </React.Fragment>
        );
    }
}

export default Header;