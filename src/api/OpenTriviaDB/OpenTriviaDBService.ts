import useAxios from '../useAxios';
import { QuestionCategory } from './QuestionCategory';

export class OpenTriviaDBService {

  private readonly BASE_URL = 'https://opentdb.com/api.php';
  private readonly QUESTION_AMOUNT = 5;

  // TODO these should come from user selection
  // TODO maybe I type the 'any' option and handle it here to send no param
  public getQuestionData = (
    questionType?: 'multiple' | 'boolean',
    category?: QuestionCategory,
    difficulty?: 'easy' | 'medium' | 'hard') => {

    const response = useAxios(
      this.BASE_URL,
      'GET',
      {
        amount: this.QUESTION_AMOUNT,
        category: category,
        difficulty: difficulty,
        type: questionType
      }
    );

    const questionData = response.data as {
        response_code: number,
        results: [
          {
            category: string,
            type: 'multiple' | 'boolean', // TODO type this with the parameters to this function
            difficulty: 'easy' | 'medium' | 'hard', // TODO type this with the parameters to this function
            question: string,
            correct_answer: string,
            incorrect_answers: string[]
          }
        ]
      };

    return {
      ...response,
      data: questionData
    };
  };
}