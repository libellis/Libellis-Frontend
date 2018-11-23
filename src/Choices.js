import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Input, Button, ButtonGroup, Alert} from 'reactstrap';
import './SurveyDetails.css';

class ChoiceCreator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      a: '',
      b: '',
      c: '',
      d: '',
    };
  }

  handleClick = evt => {
    evt.preventDefault();
    this.props.passUpChoices({...this.state});
    this.resetForm();
  };

  resetForm = () => {
    this.setState({
      a: '',
      b: '',
      c: '',
      d: ''
    })
  }

  /** Control input fields */
  handleChange = evt => {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  };

  /** Handle publishing Survey When
   *  Done is clicked - still need
   *  to pass up last question and choices
   */
  handleDone = evt => {
    evt.preventDefault();
    this.props.handleFinalize({...this.state});
    this.resetForm();
  };

  render() {
    return (
      <React.Fragment>
        <Input
          id="a"
          name="a"
          value={this.state.a}
          onChange={this.handleChange}
          type="text"
        />
        <br />
        <Input
          id="b"
          name="b"
          value={this.state.b}
          onChange={this.handleChange}
          type="text"
        />
        <br />
        <Input
          id="c"
          name="c"
          value={this.state.c}
          onChange={this.handleChange}
          type="text"
        />
        <br />
        <Input
          id="d"
          name="d"
          value={this.state.d}
          onChange={this.handleChange}
          type="text"
        />
        <br />
        <Button onClick={this.handleClick} color="primary" className="mr-2">
          Next
        </Button>
        <Button onClick={this.handleDone} color="primary">
          Done
        </Button>
      </React.Fragment>
    );
  }
}

export default ChoiceCreator;
