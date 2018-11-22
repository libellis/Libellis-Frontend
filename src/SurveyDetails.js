import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, ButtonGroup, Alert } from 'reactstrap';
import { Jumbotron } from 'reactstrap';
import { addQuestionToAPI } from './actions';
import SurveyCard from './SurveyCard';
import QuestionCreator from './QuestionCreator';
import './SurveyDetails.css'

class Survey extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: false,
      title: '',
      type: '',
    }
  }

  // if a survey exists for that param id, then
  // load it up, otherwise throw error
  async componentDidMount() {
    if (!this.props.survey) {
      this.setState({
        error: true
      })
    } else {
      this.setState({ loading: false })
    }
  }


  // Displays a list of surveys for this survey and
  // details up top
  render() {
    if (this.state.error) return <h1>Survey could not be found</h1>
    if (this.state.loading) return <h1>Loading...</h1>
    return (
      <React.Fragment>
        <Jumbotron className="Survey text-center">
          <h1>Survey Title:{this.props.survey.title}</h1>
          <p>Survey Description:{this.props.survey.description}</p>
        </Jumbotron>
        <QuestionCreator addQuestion={this.props.addQuestionToAPI} survey_id={this.props.match.params.survey_id} />
      </React.Fragment>
    )
  }
}

function mapStateToProps(state, props) {
  const id = props.match.params.survey_id;
  return {
    survey: state.surveys[id]
  }
}

export default connect(mapStateToProps, { addQuestionToAPI })(Survey);