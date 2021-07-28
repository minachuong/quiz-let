import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {Page} from './Page'; 

const mockQuestions = [
  {
    text: 'Question 1',
    correctAnswer: 'Correct Answer',
    incorrectAnswers: ['Incorrect1', 'Incorrect2']
  }
];

const mockQuiz = {
  title: 'Mock Quiz',
  questions: mockQuestions
};

describe('When Page renders', () => {
  it('displays the quiz title', () => {
    render(<Page
      quiz={mockQuiz}
      showNextButton={false}
      onNextClick={()=>{}}/>);
    const title = screen.getByRole('heading', {name: 'Mock Quiz'});

    expect(title).toBeInTheDocument();
    cleanup();
  });

  it('displays a Next button', () => {
    render(<Page
      quiz={mockQuiz}
      showNextButton={true}
      onNextClick={()=>{}}/>);
    const button = screen.getByRole('button', {name: 'Next'});
    expect(button).toBeInTheDocument();

    cleanup();
  });

  describe('And when the user clicks the Next button', () => {
    let onNextClickCalled = false;
    const onNextClick = () => {
      onNextClickCalled = true;
    }

    render(<Page
      quiz={mockQuiz}
      showNextButton={true}
      onNextClick={(onNextClick)}/>);
    const button = screen.getByRole('button', {name: 'Next'});
    expect(button).toBeInTheDocument();

    userEvent.click(button);

    it('calls the provided event handler', () => {
      expect(onNextClickCalled).toBeTruthy();
    });

    cleanup();
  });


});