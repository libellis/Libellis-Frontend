import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Form, Input, Button, ButtonGroup, Alert} from 'reactstrap';
import {Jumbotron} from 'reactstrap';
import {
  addQuestionToAPI,
  publishSurveyInAPI,
  getQuestionsFromAPI,
  clearSurvey,
} from './actions';
import SurveyCard from './SurveyCard';
import QuestionCreator from './QuestionCreator';
import TakeSurveyForm from './TakeSurveyForm';
import './SurveyDetails.css';

class Survey extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: false,
      title: '',
      type: '',
    };
  }

  // if a survey exists for that param id, then
  // load it up, otherwise throw error
  async componentDidMount() {
    if (!this.props.survey) {
      this.setState({
        error: true,
      });
    } else {
      // survey exists, lets load up it's questions and choices
      this.props.getQuestionsFromAPI(this.props.survey._id);
      this.setState({loading: false});
    }
  }

  // Displays a list of surveys for this survey and
  // details up top
  render() {
    if (this.state.error) return <h1>Survey could not be found</h1>;
    if (this.state.loading) return <h1>Loading...</h1>;
    return (
      <React.Fragment>
        <Jumbotron className="Survey text-center">
          <h1>Survey Title:{this.props.survey.title}</h1>
          <p>Survey Description:{this.props.survey.description}</p>
        </Jumbotron>
        {this.props.survey.published ? (
          this.props.questions ? (
            <TakeSurveyForm
              survey={this.props.survey}
              questions={this.props.questions}
            />
          ) : null
        ) : (
          <QuestionCreator
            addQuestion={this.props.addQuestionToAPI}
            clearSurvey={this.props.clearSurvey}
            survey={this.props.survey}
            survey_id={this.props.match.params.survey_id}
            publishSurvey={this.props.publishSurveyInAPI}
          />
        )}
      </React.Fragment>
    );
  }
}

function mapStateToProps(state, props) {
  const id = props.match.params.survey_id;
  return {
    survey: state.surveys[id],
    questions: state.questions[id],
  };
}

export default connect(
  mapStateToProps,
  {addQuestionToAPI, publishSurveyInAPI, getQuestionsFromAPI, clearSurvey},
)(Survey);
