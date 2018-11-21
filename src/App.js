import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Container } from 'reactstrap';
import NavBar from './NavBar';
import Wall from './Wall';
import Auth from './Auth';
import SurveyCreator from './SurveyCreator';
import LoginSignupForm from './LoginSignupForm';
import { connect } from 'react-redux';
import { getUserFromToken } from './actions';


class App extends Component {

  render() {
    return (
      <React.Fragment>
        <Auth />
        <Container className="App">
          <Switch>
            <Route
              exact path="/"
              render={() => <Wall />}
            />
            <Route
              exact path="/create"
              render={() => <SurveyCreator />}
            />
            <Route
              exact path="/login"
              render={() => <LoginSignupForm />}
            />
          </Switch>
        </Container>
      </React.Fragment>
    );
  }
}

export default App;
