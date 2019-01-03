import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import {Container} from 'reactstrap';
import NavBar from './NavBar';
import Wall from './Wall';
import Auth from './Auth';
import SurveyDetails from './SurveyDetails';
import UserProfile from './UserProfile';
import SurveyCreator from './SurveyCreator';
import LoginSignupForm from './LoginSignupForm';
import {connect} from 'react-redux';
import {getUserFromToken} from './actions';

//import font awesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import { faChevronCircleUp } from '@fortawesome/free-solid-svg-icons';
import { faChevronCircleDown } from '@fortawesome/free-solid-svg-icons';

library.add(faPlusCircle, faMinusCircle, faChevronCircleUp, faChevronCircleDown);

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Auth />
        <Container className="App">
          <Switch>
            <Route
              exact
              path="/surveys/:survey_id"
              render={props => <SurveyDetails {...props} />}
            />
            <Route path="/surveys" render={props => <Wall {...props} />} />
            <Route
              exact
              path="/create"
              render={props => <SurveyCreator {...props} />}
            />
            <Route
              exact
              path="/profile"
              render={props => <UserProfile {...props} />}
            />
            <Route exact path="/login" render={() => <LoginSignupForm />} />
          </Switch>
        </Container>
      </React.Fragment>
    );
  }
}

export default App;
