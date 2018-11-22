import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'reactstrap'
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from './actions';
import './NavBar.css';

class NavBar extends Component {

  /** prevent link from refreshing and call the logout method */
  handleClick = async (evt) => {
    evt.preventDefault();
    this.props.logout();
  }

  render() {
    /** NavLink for '/' is given 'exact' to correctly toggle .active */
    return (
      <Navbar color="dark" light className="NavBar">
        <NavLink exact id="logo" className="navbar-brand" to='/'>Libellis</NavLink>
        <Nav className="ml-auto">
          {this.props.currentUser ?
            <React.Fragment>
              <NavItem>
                <NavLink className="nav-link" to='/surveys'>Surveys</NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to='/create'>Create</NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to='/profile'>Profile</NavLink>
              </NavItem>
              <NavItem>
                <a className="nav-link" onClick={this.handleClick} href="/">Log Out</a>
              </NavItem>
            </React.Fragment> :
            <NavItem>
              <NavLink className="nav-link" to='/login'>Log In</NavLink>
            </NavItem>
          }
        </Nav>
      </Navbar>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps, { logout })(NavBar);
