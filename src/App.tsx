
import { useState } from 'react';

import Intro from './components/intro/Intro';
import Quiz from './components/quiz/Quiz';

import './styles/_reset.scss';
import './App.scss';


const App = () => {
  
  const [hasQuizStarted, setHasQuizStarted] = useState(false);
  
  return (
    <main>
      { hasQuizStarted ?
        <Quiz /> :
        <Intro startQuiz={() => setHasQuizStarted(true)}/>
      }
    </main>
  );
};

export default App;