import {
  SET_USER,
  REMOVE_USER,
  LOAD_SURVEYS,
  ADD_SURVEY,
  REMOVE_SURVEY,
  UPDATE_SURVEY,
  LOAD_QUESTIONS,
  ADD_QUESTION,
  REMOVE_QUESTION,
} from './actionTypes';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import uuid from 'uuid/v4';
const BASE_URL = `http://localhost:5000`;

export function register(regData) {
  return function(dispatch) {
    axios.post(`${BASE_URL}/users`, regData).then(r => {
      let token = r.data.token;
      localStorage.setItem('token', token);
      return dispatch(setCurrentUser(r.data.token));
    });
  };
}

export function login(regData) {
  return function(dispatch) {
    axios.post(`${BASE_URL}/login`, regData).then(r => {
      let token = r.data.token;
      localStorage.setItem('token', token);
      return dispatch(setCurrentUser(r.data.token));
    });
  };
}

export function getUserFromToken() {
  return function(dispatch) {
    const token = localStorage.getItem('token');
    if (token) {
      return dispatch(setCurrentUser(token));
    }
  };
}

// issues action that adds user to state
function setCurrentUser(token) {
  const {username} = jwt.decode(token);
  return {type: SET_USER, username};
}

export function logout() {
  return function(dispatch) {
    localStorage.removeItem('token');
    return dispatch(removeUser());
  };
}

//resets user to null in redux store
function removeUser() {
  return {type: REMOVE_USER};
}

export function getSurveysFromAPI(search) {
  return function(dispatch) {
    axios
      .get(`${BASE_URL}/surveys`, {params: {search}})
      .then(r => dispatch(gotSurveys(r.data.surveys)));
  };
}

export function addSurveyToAPI(survey) {
  return function(dispatch) {
    const _token = localStorage.getItem('token');
    const data = {...survey, _token};
    axios
      .post(`${BASE_URL}/surveys`, data)
      .then(r => dispatch(addSurvey(r.data.survey)));
  };
}

export function removeSurveyFromAPI(survey_id) {
  return function(dispatch) {
    const _token = localStorage.getItem('token');
    axios
      .delete(`${BASE_URL}/surveys/${survey_id}`, {data: {_token}})
      .then(r => {
        if (r.data === 'Deleted') {
          return dispatch(removeSurvey(survey_id));
        }
      });
  };
}

export function updateSurveyInAPI(survey) {
  return function(dispatch) {
    axios
      .patch(`${BASE_URL}/surveys/${survey.id}`, survey)
      .then(r => dispatch(updateSurvey(r.data)));
  };
}

export function publishSurveyInAPI(survey_id) {
  const _token = localStorage.getItem('token');
  return function(dispatch) {
    axios
      .patch(`${BASE_URL}/surveys/${survey_id}`, {published: true, _token})
      .then(r => dispatch(updateSurvey(r.data.survey)));
  };
}

export function getQuestionFromAPI(survey_id) {
  return function(dispatch) {
    axios.get(`${BASE_URL}/surveys/${survey_id}/question`).then(r => {
      return dispatch(gotQuestion(r.data, survey_id));
    });
  };
}

function gotSurveys(surveys) {
  const newsurveys = {};
  for (const survey of surveys) {
    newsurveys[survey._id] = survey;
  }
  return {type: LOAD_SURVEYS, surveys: newsurveys};
}

function gotQuestion(question, survey_id) {
  const newQuestion = {};
  for (const question of question) {
    newQuestion[question.id] = question;
  }
  return {type: LOAD_QUESTIONS, question: newQuestion, survey_id};
}

function addSurvey(survey) {
  return {
    type: ADD_SURVEY,
    survey,
  };
}

function removeSurvey(id) {
  return {
    type: REMOVE_SURVEY,
    id,
  };
}

function updateSurvey(survey) {
  return {
    type: UPDATE_SURVEY,
    survey,
  };
}

export function addQuestionToAPI(question, survey_id) {
  const _token = localStorage.getItem('token');
  const data = {...question, _token};
  return function(dispatch) {
    axios
      .post(`${BASE_URL}/surveys/${survey_id}/questions`, data)
      .then(r => dispatch(addQuestion(r.data.question)));
  };
}

function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question,
  };
}

export function removeQuestionFromAPI(question_id, post_id) {
  return function(dispatch) {
    axios
      .delete(`${BASE_URL}/posts/${post_id}/question/${question_id}`)
      .then(r => {
        if (r.data.message === 'deleted') {
          return dispatch(removeQuestion(question_id, post_id));
        }
      });
  };
}

function removeQuestion(id, post_id) {
  return {
    type: REMOVE_QUESTION,
    id,
    post_id,
  };
}
