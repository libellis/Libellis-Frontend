import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Container, Button, ButtonGroup, ListGroup, ListGroupItem, Row, Col } from 'reactstrap';

import SurveyCard from './SurveyCard';
import {getSurveysByUserFromAPI, getUserHistoryFromAPI, removeSurveyFromAPI} from './actions';
import './UserProfile.css'

const TAB_PUB = 'PUBLISHED';
const TAB_UNPUB = 'UNPUBLISHED';
const TAB_HISTORY = 'HISTORY';
const TAB_ACCOUNT = 'ACCOUNT';

class UserProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: null,
      profile_tab: 'ACCOUNT',
    };
  }

  /** get all surveys on mount */
  async componentDidMount() {
    await this.props.getSurveysByUserFromAPI(this.props.currentUser);
    await this.props.getUserHistoryFromAPI(this.props.currentUser);
    this.setState({ loading: this.isLoading() });
  }

  isLoading() {
    return (this.props.user_history === undefined || this.props.user_surveys === undefined);
  }

  handleTabButtons = evt => {
    this.setState({profile_tab: evt.target.name})
  }

  renderAccount() {
    return (
      <React.Fragment>
        <h1>Account</h1>
        <h3>Number of surveys created: {this.props.user_surveys.length}</h3>
        <h3>Number of surveys you have voted on: {this.props.user_history.length}</h3>
      </React.Fragment>
    );
  }

  formatDate(date) {
    const d = new Date(date)
    return `${d.toDateString()} at ${d.toLocaleTimeString()}`
  }

  renderHistory() {

    return (
      <React.Fragment>
      <h1>Your Activity</h1>
      <ListGroup>
        {this.props.user_history.map(s =>
        <ListGroupItem>
          <Row>
            <Col><i>{s.title}</i></Col>
            <Col>
              <p>Created: <i>{this.formatDate(s.date_posted)}</i></p>
              <p>By: {s.author}</p>
            </Col>
          </Row>
        </ListGroupItem>
        )}
      </ListGroup>
      </React.Fragment>
    )
  }

  renderUnpub() {
    return (
      <React.Fragment>
      <h1>Your Unpublished Surveys</h1>
      {this.props.user_surveys.map(s => 
        !s.published ?
          <SurveyCard
            key={s.survey_id}
            deleteSurvey={this.props.removeSurveyFromAPI}
            survey={s}
            editLink={`/surveys/${s.survey_id}`}
          />
          : ''
      )}
      </React.Fragment>
    )
  }

  renderPub() {
    return (
      <React.Fragment>
      <h1>Your Published Surveys</h1>
        {this.props.user_surveys.map(s => 
          s.published ?
            <SurveyCard
              key={s.survey_id}
              deleteSurvey={this.props.removeSurveyFromAPI}
              survey={s}
              editLink={`/surveys/${s.survey_id}`}
            />
           : ''
        )}
      </React.Fragment>
    )
  }

  renderProfile() {
    switch(this.state.profile_tab) {
      case TAB_PUB:
          return this.renderPub();
      case TAB_UNPUB:
          return this.renderUnpub();
      case TAB_HISTORY:
          return this.renderHistory();
      default:
          return this.renderAccount();
  } 
  }

  

  render() {
    if (this.isLoading()) {
      return <div className="Surveys">
        <h1>Loading</h1>
        </div>
    }
    return (
      <Container className="Surveys">
        <h1>User Profile</h1>
        <ButtonGroup>
          <Button onClick={this.handleTabButtons} name={TAB_PUB}>Published Surveys</Button>
          <Button onClick={this.handleTabButtons} name={TAB_UNPUB}>Unpublished Surveys</Button>
          <Button onClick={this.handleTabButtons} name={TAB_HISTORY}>Vote History</Button>
          <Button onClick={this.handleTabButtons} name={TAB_ACCOUNT}>Account</Button>
        </ButtonGroup>

        {this.renderProfile()}
      </Container>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    user_surveys: state.user_surveys,
    user_history: state.user_history,
    currentUser: state.currentUser
  }
}

export default connect(
  mapStateToProps, 
  {getSurveysByUserFromAPI, getUserHistoryFromAPI}
)(UserProfile);
