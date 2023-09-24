import { useEffect } from 'react';
import { Loader } from './Loader';
import Header from './Header';
import Error from './Error';
import StartScreen from './StartScreen';
import Question from './Question';
import FinishScreen from './FinishScreen';
import { useQuiz } from '../contexts/QuizContext';

//loading, error, ready, active, finished

function App() {
  const { status } = useQuiz();

  return <div className='app'>
    <Header />

    <main>
      {status === "loading" && <Loader />}
      {status === "error" && <Error />}
      {status === "ready" && <StartScreen />}
      {status === "active" &&
        <Question/>}
      {status === "finished" &&
        <FinishScreen/>}

    </main>
  </div>
}



export default App;
