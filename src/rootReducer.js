import {
  SET_USER,
  REMOVE_USER,
  LOAD_SURVEYS,
  LOAD_USER_HISTORY,
  LOAD_USER_SURVEYS,
  ADD_SURVEY,
  REMOVE_SURVEY,
  UPDATE_SURVEY,
  LOAD_QUESTIONS,
  ADD_QUESTION,
  REMOVE_QUESTION,
  SURVEY_TAKEN,
  CLEAR_SURVEY,
} from './actionTypes';

const testState = {
  surveys: {
    '3': {
      _id: 3,
      author: 'testuser',
      title: 'xxSuperCoolTestSurveyxx',
      description: '9999ThisIsDescriptive9999',
      date_posted: '2018-06-13',
      anonymous: true,
    },
  },
  questions: {},
  currentUser: null,
};

function rootReducer(
  state = {
    surveys: {},
    questions: {},
    newSurvey: {},
    currentUser: null,
    taken: false,
  },
  action,
) {
  console.log('reducer ran; state & action:', state, action);
  let survey;

  switch (action.type) {
    case SET_USER:
      return {...state, currentUser: action.username};

    case REMOVE_USER:
      return {...state, currentUser: null};

    case LOAD_SURVEYS:
      return {...state, surveys: {...action.surveys}};

    case LOAD_USER_HISTORY:
      return {...state, user_history: action.user_history};

    case LOAD_USER_SURVEYS:
      return {...state, user_surveys: action.user_surveys};

    // must use _id as that's what we get back from API
    // always overwrrite newSurvey with newest survey created
    // just used for getting the id so we can forward user
    // to page to add questions/choices to survey
    case ADD_SURVEY:
      survey = {...action.survey};
      return {
        ...state,
        newSurvey: survey,
        surveys: {...state.surveys, [survey._id]: survey},
      };

    case REMOVE_SURVEY:
      const surveys = {...state.surveys};
      delete surveys[action.id];
      return {...state, surveys};

    case UPDATE_SURVEY:
      survey = {...action.survey};
      return {
        ...state,
        surveys: {
          ...state.surveys,
          [survey._id]: survey,
        },
      };

    case CLEAR_SURVEY:
      return {...state, newSurvey: {}};

    case LOAD_QUESTIONS:
      return {
        ...state,
        questions: {
          ...state.questions,
          [action.survey_id]: {
            ...action.questions,
          },
        },
      };

    case ADD_QUESTION:
      let question = {...action.question};
      console.log('question object: ', question);
      return {
        ...state,
        questions: {
          ...state.questions,
          [question._survey_id]: {
            ...state.questions[question._survey_id],
            [question._id]: question,
          },
        },
      };

    case REMOVE_QUESTION:
      const questions = {...state.questions};
      delete questions[action.post_id][action.id];
      return {...state, questions};

    // TEST FOR NOW JUST TO UPDATE REDUX STATE TO SHOW VOTES WERE COUNTED
    case SURVEY_TAKEN:
      return {...state, taken: action.data};

    default:
      return state;
  }
}

// addquestion = (question) => {
//   console.log('received a new question:', question);
//   const id = uuid();
//   question.id = id;
//   let post_id = question.post_id;
//   console.log('Post ID:', post_id)
//   this.setState(st => ({
//     posts: {
//       ...st.posts,
//       [post_id]: {
//         ...st.posts[post_id],
//         questions: {
//           ...st.posts[post_id].questions,
//           question
//         }
//       }
//     }
//   }))

export default rootReducer;
