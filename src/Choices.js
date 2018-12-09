import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Input, Button, ButtonGroup, Alert} from 'reactstrap';
import './SurveyDetails.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class ChoiceCreator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      choices: [
        {
          title: '',
          type: 'text'
        },
        {
          title: '',
          type: 'text'
        },
      ],
    };
  }

  handleClick = evt => {
    evt.preventDefault();
    this.props.passUpChoices(this.state.choices);
    this.resetForm();
  };

  resetForm = () => {
    this.setState({
      choices: [
        {
          title: '',
          type: 'text',
        },
        {
          title: '',
          type: 'text',
        },
      ],
    });
  };

  /** Control input fields */
  handleChange = evt => {
    // Make a copy of the choices array
    const updatedChoices = [...this.state.choices];
    // Make a copy of the choice object for the choice we are updating
    const updatedChoice = {...this.state.choices[evt.target.dataset.id]};
    // Update it's choice field with the radio button just selected
    updatedChoice.title = evt.target.value;
    // reassign at our copy of choices from state
    updatedChoices[evt.target.dataset.id] = updatedChoice;
    this.setState({
      choices: updatedChoices,
    });
  };
  
  /** Handle publishing Survey When
   *  Done is clicked - still need
   *  to pass up last question and choices
   */
  handleDone = evt => {
    evt.preventDefault();
    this.props.handleFinalize(this.state.choices);
    this.resetForm();
  };

  addChoice = evt => {
    evt.preventDefault();
    const choices = [...this.state.choices];
    choices.push({title: '', type: 'text'});
    this.setState({choices});
  }

  removeChoice = evt => {
    evt.preventDefault();
    const choices = this.state.choices.slice(0,-1);
    this.setState({choices});
  }

  render() {
    return (
      <React.Fragment>
        <br />
        <FontAwesomeIcon icon='plus-circle' onClick={this.addChoice} />
        <FontAwesomeIcon icon='minus-circle' onClick={this.removeChoice} />
        {this.state.choices.map((choice, idx) => {
          return (
            <React.Fragment>
              <Input
                key={idx}
                data-id={idx}
                name={idx}
                value={this.state.choices[idx].title}
                onChange={this.handleChange}
                type="text"
              />
              <br />
            </React.Fragment>
          );
        })}
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
