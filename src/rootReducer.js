import { SET_USER, REMOVE_USER, LOAD_SURVEYS, ADD_SURVEY, REMOVE_SURVEY, UPDATE_SURVEY, LOAD_QUESTIONS, ADD_QUESTION, REMOVE_QUESTION } from './actionTypes';

function rootReducer(state = { surveys: {}, questions: {}, currentUser: null }, action) {
  console.log("reducer ran; state & action:", state, action);

  switch (action.type) {
    case SET_USER:
      return { ...state, currentUser: action.username }

    case REMOVE_USER:
      return { ...state, currentUser: null }

    case LOAD_SURVEYS:
      return { ...state, surveys: { ...action.surveys } }

    case ADD_SURVEY:
      let survey = { ...action.survey }
      return { ...state, surveys: { ...state.surveys, [survey.id.toString()]: survey } };

    case REMOVE_SURVEY:
      const surveys = { ...state.surveys };
      delete surveys[action.id.toString()];
      return { ...state, surveys };

    case UPDATE_SURVEY:
      return {
        ...state,
        surveys: {
          ...state.surveys,
          [action.survey.id]: action.survey
        }
      };

    case LOAD_QUESTIONS:
      return {
        ...state,
        questions: {
          ...state.questions,
          [action.post_id]: {
            ...action.questions
          }
        }
      }

    case ADD_QUESTION:
      let question = { ...action.question };
      console.log({ ...state, questions: { ...state.questions } });
      console.log(question.id);
      return ({
        ...state,
        questions: {
          ...state.questions,
          [action.post_id]: {
            ...state.questions[action.post_id],
            [question.id]: question
          }
        }
      });

    case REMOVE_QUESTION:
      const questions = { ...state.questions };
      delete questions[action.post_id][action.id];
      return { ...state, questions };

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