import { nanoid } from 'nanoid';

import { OpenTriviaDBService } from '../../api/OpenTriviaDB/OpenTriviaDBService';

import './Quiz.scss';


const Quiz = () => {

  const createAnswerButtons = (correctAnswer: string, incorrectAnswers: string[]) => {
    
    const answers = [correctAnswer, ...incorrectAnswers];

    const shuffle = (array: unknown[]) => {
      array.sort(() => Math.random() - 0.5);
    };

    // Shuffle the answers so the correct answer is randomly placed
    shuffle(answers);
    
    return answers.map(answer => {
      return (
        <li
          key={nanoid()}
          className='answer-button'
        >
          {answer}
        </li>
      );
    });
  };


  const api = new OpenTriviaDBService();
  const { data, loaded } = api.getQuestionData('multiple');

  if (!loaded) {
    return <p>Loading...</p>;
  }

  const questionElements = data?.results.map(questionData => {

    const answers = createAnswerButtons(questionData.correct_answer, questionData.incorrect_answers);

    return (
      <div
        key={nanoid()}
        className='question-container'
      >
        <h4 className='question'>{questionData.question}</h4>
        <ul className='answers'>{answers}</ul>
      </div>
    );
  });

  return (
    <div className='quiz'>
      {questionElements}
      <button>Submit answers</button>
    </div>
  );
};

export default Quiz;