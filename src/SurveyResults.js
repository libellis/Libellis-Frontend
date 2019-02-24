import React, {Component} from 'react';
import {Jumbotron} from 'reactstrap';
import './SurveyDetails.css';

class SurveyResults extends Component {
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
        {}
      </React.Fragment>
    );
  }
}

export default SurveyResults;