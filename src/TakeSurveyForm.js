import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  Form,
  FormGroup,
  Label,
  Input,
  CustomInput,
  Button,
  ButtonGroup,
  Alert,
} from 'reactstrap';
import {Jumbotron} from 'reactstrap';
import { submitVotesToAPI } from './actions';
import SurveyCard from './SurveyCard';
import DisplayChoices from './DisplayChoices';
import './SurveyDetails.css';

class TakeSurveyForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [{title: '', id: '', choice: null}]
    }
  }

  componentDidMount() {
    const questions = Object.values(this.props.questions).map(question => {
      return {title: question.title, id: question._id, choice: null}
    });
    this.setState({ questions });
  }

  /** Control input fields */
  handleChange = evt => {
    // Make a copy of the questions array
    const updatedQuestions = [...this.state.questions];
    // Make a copy of the question object for the question we are updating
    const updatedQuestion = {...this.state.questions[evt.target.dataset.id]};
    // Update it's choice field with the radio button just selected
    updatedQuestion.choice = +evt.target.value;
    // reassign at our copy of questions from state
    updatedQuestions[evt.target.dataset.id] = updatedQuestion;
    // update state
    this.setState({
      questions: updatedQuestions 
    });
  };

  resetForm = () => {
    this.setState({});
  };

  handleSubmit = evt => {
    evt.preventDefault();
    this.props.submitVotesToAPI(this.state.questions, this.props.survey._id);
    this.props.history.push('/surveys');
  };

  render() {
    return (
      <Form
        className="TakeSurveyForm"
        onSubmit={this.handleSubmit}
        className="SurveyForm p-5 mt-5 rounded">
        {this.props.questions
          ? Object.values(this.props.questions).map((question, idx) => {
              return (
                <FormGroup>
                  <Label for={question._id}>{question.title}</Label>
                  <br />
                  {question.choices.map(choice => {
                    return (
                      <CustomInput
                        type="radio"
                        key={choice._id}
                        id={choice._id}
                        data-id={idx}
                        onChange={this.handleChange}
                        value={choice._id}
                        name={question._id}
                        label={choice.title}
                      />
                    );
                  })}
                </FormGroup>
              );
            })
          : null}
        <Button>Submit</Button>
      </Form>
    );
  }
}

export default connect(null, { submitVotesToAPI })(TakeSurveyForm);
