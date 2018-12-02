import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getSurveysByUserFromAPI, getUserHistoryFromAPI} from './actions';
import './UserProfile.css'

class UserProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: null,
    };
  }

  /** get all surveys on mount */
  async componentDidMount() {
    console.log("component mounted")
    this.props.getSurveysByUserFromAPI(this.props.currentUser);
    this.props.getUserHistoryFromAPI(this.props.currentUser);
    this.setState({ loading: false });
  }

  render() {
    console.log('render ran with props', this.props)
    if (!this.props.user_surveys  || !this.props.user_history) {
      return <div className="Surveys">
        <h1>Loading</h1>
        </div>
    }
    return (
      <div className="Surveys">
        <h1>User Profile</h1>
        <p>Hello {this.props.currentUser}</p>
        <h3>Number of surveys created: {this.props.user_surveys.length}</h3>
        <h3>Number of surveys you have voted on: {this.props.user_history.length}</h3>
        <p>Your Activity</p>
        <ul>
          {this.props.user_history.map(s =>
            <li><i>{s.title}</i></li>
          )}
        </ul>
        <p>Here's a list of surveys you have created</p>
        <ul> 
          {this.props.user_surveys.map(s => 
            <li key={s.survey_id}>
              <h1>{s.title}</h1>
              <h5>{s.description}</h5>
              <p><i>{s.date_posted}</i></p>
              <p>author: {s.author}</p>
              <p>published: {s.published ? "Yes" : "No"}</p>
            </li>
          )}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  console.log("map state to props ran", state)
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
