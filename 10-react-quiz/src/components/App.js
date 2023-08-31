import { useEffect, useReducer } from 'react';
import { Loader } from './Loader';
import Header from './Header';
import Main from './Main';
import Error from './Error';
import StartScreen from './StartScreen';
import Question from './Question';
import FinishScreen from './FinishScreen';

const initialState = {
  questions: [],
  status: 'loading',
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  secondsRemaining: null,
}

const SECS_PER_QUESTION = 30;
//loading, error, ready, active, finished
function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready"
      }
    case "dataFailed":
      return {
        ...state,
        status: "error"
      }
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION
      }
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points: action.payload === question.correctOption
          ? state.points + question.points
          : state.points,
      }
    case "newQuestion":
      return { ...state, index: state.index + 1, answer: null }
    case "finish":
      return {
        ...state, status: "finished", highScore: state.points > state.highScore ? state.points : state.highScore
      }
    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready"
      }
    case "ticktack":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1
        , status: state.secondsRemaining === 0
          ? "finished"
          : state.status
      }


    default: throw new Error("Unexpected action");
  }
}

function App() {

  const [{ questions, status, index, answer, points, highScore, secondsRemaining }, dispatch] = useReducer(reducer, initialState);

  const maxPossiblePoints = questions.reduce((prev, cur) => prev + cur.points, 0)

  useEffect(function () {
    fetch('http://localhost:8000/questions')
      .then(res => res.json())
      .then((data) => dispatch({ type: 'dataReceived', payload: data }))
      .catch((err) => dispatch({ type: 'dataFailed' }));
  }, [])

  return <div className='app'>
    <Header />

    <Main>
      {status === "loading" && <Loader />}
      {status === "error" && <Error />}
      {status === "ready" && <StartScreen length={questions.length} dispatch={dispatch} />}
      {status === "active" &&
        <Question
          maxPossiblePoints={maxPossiblePoints}
          length={questions.length}
          question={questions[index]}
          dispatch={dispatch}
          answer={answer}
          points={points}
          index={index}
          secondsRemaining={secondsRemaining}
        />}
      {status === "finished" &&
        <FinishScreen
          maxPossiblePoints={maxPossiblePoints}
          points={points}
          highScore={highScore}
          dispatch={dispatch}
        />}

    </Main>
  </div>
}



export default App;
