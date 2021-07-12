import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const Navbar = (props) => {

    if (props.loggedIn) {
        return (
            <div>
                <h1>Hello {props.user.name}</h1>
                <br />
                <NavLink to="/" className="home" >
                    <button>Home</button>

                </NavLink>
            
                <button onClick={props.logoutUser}>Logout</button>
              
            </div>
        )

    } else {
        return (
            <div>
                <br />
                <NavLink to="/signup">
                    <button>Signup</button>
                </NavLink>
                <br />
                <NavLink to="/login">
                    <button>Login</button>
                </NavLink>
            </div>
        )

    }

}

export default Navbar
