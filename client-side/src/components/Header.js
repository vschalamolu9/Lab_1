import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { logout } from '../actions/userActions'
import {restaurantLogout} from "../actions/restaurantActions";

const Header = ({history}) => {
    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const restaurantLogin = useSelector(state => state.restaurantLogin)
    const { restaurantInfo } = restaurantLogin

    const logoutHandler = () => {
        dispatch(logout())
    }

    const restaurantLogoutHandler = () => {
        dispatch(restaurantLogout())
        history.push('/login')
    }

    const viewMenuItemsHandler = () => {
        history.push('/restaurant/viewitems')
    }

    return (
        <header>
            <Navbar bg='black' variant='dark' expand='lg' collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand>Uber <span style={{color: '#3e9920'}}>Eats</span></Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='ml-auto'>
                            <LinkContainer to='/cart'>
                                <Nav.Link>
                                    <i className='fas fa-shopping-cart'></i> Cart
                                </Nav.Link>
                            </LinkContainer>
                            { restaurantInfo ? (
                                <NavDropdown title={restaurantInfo.restaurant_name} id='restaurant_name'>
                                    <LinkContainer to='/restaurant/profile'>
                                        <NavDropdown.Item>Restaurant Profile</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/restaurant/viewitems'>
                                        <NavDropdown.Item>View Menu Items</NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={restaurantLogoutHandler}>
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <LinkContainer to='/restaurant/home'>
                                    <Nav.Link>
                                        <i className='fas fa-user' /> Restaurants
                                    </Nav.Link>
                                </LinkContainer>
                            ) }
                            {userInfo ? (
                                <NavDropdown title={userInfo.first_name} id='username'>
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}>
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <LinkContainer to='/login'>
                                    <Nav.Link>
                                        <i className='fas fa-user' /> Sign In
                                    </Nav.Link>
                                </LinkContainer>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header