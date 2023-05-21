import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

export function Navigation(props) {

    return (
        <Navbar bg="dark" expand="lg">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav>
                    <NavLink className="d-inline p-2 bg dark text-white" to="/">
                        Home
                    </NavLink>
                    <NavLink className="d-inline p-2 bg dark text-white" to="/players">
                        Chess Players
                    </NavLink>
                    <NavLink className="d-inline p-2 bg dark text-white" to="/champions">
                        Chess Champions
                    </NavLink>
                    <NavLink className="d-inline p-2 bg dark text-white" to="/tournaments">
                        Chess Tournaments
                    </NavLink>
                    <NavLink className="d-inline p-2 bg dark text-white" to="/participations">
                        Chess Participations
                    </NavLink>
                    <NavLink className="d-inline p-2 bg dark text-white" to="/players/trophies">
                        Trophies Stats
                    </NavLink>
                    <NavLink className="d-inline p-2 bg dark text-white" to="/players/ratings">
                        Ratings Stats
                    </NavLink>

                    {props.username ? (
                        <>
                            <NavLink className="d-inline p-2 bg-dark text-white" to={'/chat'}>
                                Chat
                            </NavLink>

                            <NavLink className="d-inline p-2 bg-dark text-white" to={`/users/${props.userid}`}>
                                {props.username}
                            </NavLink>

                            <NavLink className="d-inline p-2 bg-dark text-white" onClick={props.handleLogout}>
                                Logout
                            </NavLink>

                        </>
                    ) : (
                        <>
                            <NavLink className="d-inline p-2 bg-dark text-white" to="/login">
                                Login
                            </NavLink>
                            <NavLink className="d-inline p-2 bg-dark text-white" to="/register">
                                Register
                            </NavLink>
                        </>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}
