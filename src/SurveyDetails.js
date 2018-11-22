import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, ButtonGroup, Alert } from 'reactstrap';
import { Jumbotron } from 'reactstrap';
import SurveyCard from './SurveyCard';
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

  /** Control input fields */
  handleChange = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value })
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    const { title, description } = this.state;
    this.props.addSurveyToAPI({ title, description });
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
        <section className="SurveyCreator">
          <Form onSubmit={this.handleSubmit} className="SurveyForm p-5 mt-5 rounded">
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
            <Button color="primary">Submit</Button>
          </Form>
        </section>
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

export default connect(mapStateToProps)(Survey);