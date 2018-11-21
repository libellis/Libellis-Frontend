import React, { Component } from 'react';
import NavBar from './NavBar';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserFromToken, logout } from './actions';

class Auth extends Component {

  componentDidMount() {
    this.props.getUserFromToken();
  }

  render() {
    return (
      <React.Fragment>
        <NavBar
          currentUser={this.props.currentUser}
          logout={this.props.logout}
        />
        {!this.props.currentUser ?
          <Redirect to="/login" /> :
          null
        }
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps, { getUserFromToken, logout })(Auth);
