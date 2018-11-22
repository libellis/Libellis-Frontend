import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, ButtonGroup, Alert } from 'reactstrap';
import { Jumbotron } from 'reactstrap';
import './SurveyDetails.css'

class ChoiceCreator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      a: '',
      b: '',
      c: '',
      d: ''
    }
  }

  handleClick = (evt) => {
    evt.preventDefault();
    this.props.passUpChoices(this.state);
  }

  /** Control input fields */
  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  render() {
    return (
      <React.Fragment>
        <Input id="a" name="a"
          value={this.state.a}
          onChange={this.handleChange}
          type='text' />
        <br />
        <Input id="b" name="b"
          value={this.state.b}
          onChange={this.handleChange}
          type='text' />
        <br />
        <Input id="c" name="c"
          value={this.state.c}
          onChange={this.handleChange}
          type='text' />
        <br />
        <Input id="d" name="d"
          value={this.state.d}
          onChange={this.handleChange}
          type='text' />
        <br />
        <Button color="primary" className="mr-2">Next</Button>
        <Button onClick={this.handleClick} color="primary">Done</Button>
      </React.Fragment>
    )
  }
}

export default (ChoiceCreator);