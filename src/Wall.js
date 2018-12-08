import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {getSurveysFromAPI, removeSurveyFromAPI} from './actions';
import SurveyCard from './SurveyCard';
import Search from './Search';
import './Wall.css';

class Wall extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: null,
    };
  }

  /** get all surveys on mount */
  async componentDidMount() {
    this.props.getSurveysFromAPI('');
    this.setState({loading: false});
  }

  /** get list of filtered surveys and update state */
  searchSurveys = async search => {
    this.props.getSurveysFromAPI(search);
  };

  render() {
    if (this.props.currentUser === null) return <Redirect to="/login" />;
    if (this.state.error) return <h1>{this.state.error}</h1>;
    if (this.state.loading)
      return (
        <div>
          <Search handleSearch={this.searchSurveys} />
          <h3>Loading...</h3>
        </div>
      );
    return (
      <div className="Surveys">
        <Search handleSearch={this.searchSurveys} />
        {this.props.surveys.map(survey => {
          return survey.published ? (
            <SurveyCard
              key={survey._id}
              deleteSurvey={this.props.removeSurveyFromAPI}
              survey={survey}
              editLink={`/surveys/${survey._id}`}
            />
          ) : null;
        })}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    surveys: Object.values(state.surveys),
    currentUser: state.currentUser,
  };
}

export default connect(
  mapStateToProps,
  {getSurveysFromAPI, removeSurveyFromAPI},
)(Wall);
