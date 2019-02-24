import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import './SurveyCard.css';
import {Alert, Button, Card, CardTitle, CardBody} from 'reactstrap';

class SurveyCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
    };
  }

  handleDelete = evt => {
    evt.preventDefault();
    this.props.deleteSurvey(this.props.survey._id);
  };

  // Displays a card about a survey and a button to edit the survey
  render() {
    let {title, description, author} = this.props.survey;
    return (
      <Card className="SurveyCard text-center">
        <CardTitle>{title}</CardTitle>
        <CardBody>
          <p>Description: {description}</p>
          <p>Author: {author}</p>
          {this.state.error ? <Alert>{this.state.error}</Alert> : ''}
          {this.props.survey.published ? (
            <Link className="btn btn-primary" to={this.props.editLink}>
              Take Survey
            </Link>
          ) : (
            <Link className="btn btn-primary" to={this.props.editLink}>
              Edit Survey
            </Link>
          )}
          { author === this.props.username ? <Button onClick={this.handleDelete}>Delete Survey</Button>: ''}
        </CardBody>
      </Card>
    );
  }
}

function mapStateToProps(state) {
      return {
        username: state.currentUser
      }
}

export default connect(mapStateToProps)(SurveyCard);
