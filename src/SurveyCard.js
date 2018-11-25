import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './SurveyCard.css';
import { Alert, Button, Card, CardTitle, CardBody } from 'reactstrap';

class SurveyCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null
    }
  }

  handleDelete = (evt) => {
    evt.preventDefault();
    this.props.deleteSurvey(this.props.survey._id);
  }

  // Displays a card about a survey and a button to edit the survey
  render() {
    let { title, description, author } = this.props.survey;
    return (
      <Card className="SurveyCard text-center">
        <CardTitle>{title}</CardTitle>
        <CardBody>
          <p>Description: {description}</p>
          <p>Author: {author}</p>
          {this.state.error ?
            <Alert>{this.state.error}</Alert> :
            ''}
          <Link
            className="btn btn-primary"
            to={this.props.editLink} >
            Edit Survey
          </Link>
          <Button onClick={this.handleDelete}>
            Delete Survey
          </Button>
        </CardBody>
      </Card>
    );
  }
}

export default SurveyCard;
