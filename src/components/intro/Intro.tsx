
import './Intro.scss';

type IntroProps = {
  startQuiz: () => void;
}

const Intro = ({ startQuiz }: IntroProps) => {
  return (
    <div className='intro'>
      <h2>Quizzical</h2>
      <p>Quiz App created using React</p>
      <button
        onClick={startQuiz}
      >
        Start quiz
      </button>
    </div>
  );
};

export default Intro;