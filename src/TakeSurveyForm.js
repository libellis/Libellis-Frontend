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
  ListGroup,
  ListGroupItem,
} from 'reactstrap';
import {Jumbotron} from 'reactstrap';
import {submitVotesToAPI} from './actions';
import SurveyCard from './SurveyCard';
import DisplayChoices from './DisplayChoices';
import './SurveyDetails.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

class TakeSurveyForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [{title: '', id: '', type: '', votes: [], choices: []}],
    };
  }

  componentDidMount() {
    const questions = Object.values(this.props.questions).map(question => {
      return {
        title: question.title,
        id: question._id,
        type: question.type,
        votes: [],
        choices: question.choices,
      };
    });
    this.setState({questions});
  }

  /** Control input fields */
  handleChange = evt => {
    // Make a copy of the questions array
    const updatedQuestions = [...this.state.questions];
    // Make a copy of the question object for the question we are updating
    const updatedQuestion = {...this.state.questions[evt.target.dataset.id]};
    // Update it's choice field with the radio button just selected
    updatedQuestion.votes.push(+evt.target.value);
    // reassign at our copy of questions from state
    updatedQuestions[evt.target.dataset.id] = updatedQuestion;
    // update state
    this.setState({
      questions: updatedQuestions,
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

  voteUp = evt => {
    // Make a copy of the questions array
    let updatedQuestions = [...this.state.questions];
    // Make a copy of the question object for the question we are updating
    const updatedQuestion = {
      ...this.state.questions[+evt.currentTarget.dataset.id],
    };
    // swap current choice with previous choice
    let choices = updatedQuestion.choices;
    let id = +evt.currentTarget.id;
    if (id - 1 >= 0) {
      [choices[id - 1], choices[id]] = [choices[id], choices[id - 1]];
      updatedQuestion.choices = choices;
      updatedQuestion.votes = choices;
      updatedQuestions[+evt.currentTarget.dataset.id] = updatedQuestion;
      this.setState({
        questions: updatedQuestions,
      });
    }
  };

  voteDown = evt => {
    // Make a copy of the questions array
    let updatedQuestions = [...this.state.questions];
    // Make a copy of the question object for the question we are updating
    const updatedQuestion = {
      ...this.state.questions[+evt.currentTarget.dataset.id],
    };
    // swap current choice with previous choice
    let choices = updatedQuestion.choices;
    let id = +evt.currentTarget.id;
    if (id + 1 < choices.length) {
      [choices[id], choices[id + 1]] = [choices[id + 1], choices[id]];
      updatedQuestion.choices = choices;
      updatedQuestion.votes = choices;
      updatedQuestions[+evt.currentTarget.dataset.id] = updatedQuestion;
      this.setState({
        questions: updatedQuestions,
      });
    }
  };

  render() {
    return (
      <Form
        className="TakeSurveyForm"
        onSubmit={this.handleSubmit}
        className="SurveyForm p-5 mt-5 rounded">
        {this.props.questions
          ? this.state.questions.map((question, idx) => {
              return (
                <FormGroup>
                  <Label for={question._id}>{question.title}</Label>
                  <br />
                  {question.type === 'multiple' ? (
                    question.choices.map(choice => {
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
                    })
                  ) : (
                    <React.Fragment>
                      <p>Must interact with poll to submit vote</p>
                      <ListGroup>
                        {question.choices.map((choice, i) => {
                          return (
                            <ListGroupItem
                              key={choice._id}
                              id={i}
                              data-id={idx}>
                              <div className="d-flex flex-row justify-content-between">
                                {choice.title}
                                <div>
                                  <FontAwesomeIcon
                                    className="mx-2"
                                    icon="chevron-circle-up"
                                    data-id={idx}
                                    id={i}
                                    onClick={this.voteUp}
                                  />
                                  <FontAwesomeIcon
                                    className="mx-2"
                                    icon="chevron-circle-down"
                                    data-id={idx}
                                    id={i}
                                    onClick={this.voteDown}
                                  />
                                </div>
                              </div>
                            </ListGroupItem>
                          );
                        })}
                      </ListGroup>
                    </React.Fragment>
                  )}
                </FormGroup>
              );
            })
          : null}
        <Button>Submit</Button>
      </Form>
    );
  }
}

export default connect(
  null,
  {submitVotesToAPI},
)(TakeSurveyForm);
