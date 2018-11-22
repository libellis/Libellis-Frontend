import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, ButtonGroup, Alert } from 'reactstrap';
import { Jumbotron } from 'reactstrap';
import SurveyCard from './SurveyCard';
import Choices from './Choices';
import './SurveyDetails.css'

class QuestionCreator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: false,
      title: '',
      type: '',
    }
  }

  /** Control input fields */
  handleChange = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value })
  }

  handleChoices = (choices) => {
    const choiceArray = [];
    for (const key in choices) {
      const choice = {
        title: choices[key],
        type: 'text'
      }
      choiceArray.push(choice);
    }
    const { title, type } = this.state;
    this.props.addQuestion({ title, type, choices: choiceArray }, this.props.survey_id)
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
  }

  render() {
    return (
      <Form className="QuestionCreator" onSubmit={this.handleSubmit} className="SurveyForm p-5 mt-5 rounded">
        <label className="mt-2" htmlFor="title">Question Title</label>
        <Input id="title" name="title"
          value={this.state.title}
          onChange={this.handleChange}
          type='text' />

        <label className="mt-2" htmlFor="type">Type</label>
        <Input id="type" name="type"
          value={this.state.type}
          type='type'
          onChange={this.handleChange} />
        <br />
        <label className="mt-2">Choices:</label>
        <Choices passUpChoices={this.handleChoices} />
      </Form>
    )
  }
}

export default (QuestionCreator);