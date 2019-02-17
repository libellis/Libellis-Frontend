import React, { Component } from 'react';
import { Form, Input, Button, ButtonGroup, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import { addSurveyToAPI } from './actions';
import './SurveyCreator.css';

class SurveyCreator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      errors: [],
      category: ''
    };
  }

  /** Control input fields */
  handleChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    const { title, description, category } = this.state;
    this.props.addSurveyToAPI({ title, description, category });
  };

  render() {
    if (this.props.survey_id)
      this.props.history.push(`/surveys/${this.props.survey_id}`);
    return (
      <section className="SurveyCreator">
        <Form
          onSubmit={this.handleSubmit}
          className="SurveyForm p-5 mt-5 rounded"
        >
          <label className="mt-2" htmlFor="title">
            Survey Title
          </label>
          <Input
            id="title"
            name="title"
            value={this.state.title}
            onChange={this.handleChange}
            type="text"
          />

          <label className="mt-2" htmlFor="description">
            Description
          </label>
          <Input
            id="description"
            name="description"
            value={this.state.description}
            type="text"
            onChange={this.handleChange}
          />
          <label className="mt-2" htmlFor="category">
            Category
          </label>
          <Input
            id="category"
            name="category"
            value={this.state.category}
            type="text"
            onChange={this.handleChange}
          />
          <br />
          {this.state.errors.map(error => (
            <Alert key={error} color="warning">
              {error}
            </Alert>
          ))}
          <Button color="primary">Submit</Button>
        </Form>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    survey_id: state.newSurvey._id
  };
}

export default connect(
  mapStateToProps,
  { addSurveyToAPI }
)(SurveyCreator);
