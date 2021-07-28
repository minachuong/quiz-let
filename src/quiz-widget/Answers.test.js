import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Answers } from './Answers' 

const mockAnswers = [
  'incorrect1', 
  'incorrect2', 
  'correct'
];

describe('When Answers renders', () => {
  afterEach(cleanup);

  it('displays all provided answers in a list', () => {
    render(<Answers
      revealAnswers={false}
      correctAnswer='correct'
      randomizedAnswers={mockAnswers}
      onAnswerClick={()=>{}} />);

    const list = screen.getByRole('list');
    expect(list).toHaveProperty('type', 'A');

    mockAnswers.forEach(answer => {
      const renderedAnswerItem = screen.getByRole('button', {name: answer});
      expect(renderedAnswerItem).toBeInTheDocument();
      expect(renderedAnswerItem.style.fontSize).toBe('1.2rem');
      expect(renderedAnswerItem.style.fontFamily).toBe('monospace');
      expect(renderedAnswerItem.style.color).toBe('black');
      expect(renderedAnswerItem.style.background).toBe('none');
    });
  });
});

describe('And when an incorrect answer is selected', () => {
  let revealAnswers = false;
  beforeEach(() => {
    const { rerender } = render(<Answers
      revealAnswers={revealAnswers}
      correctAnswer='correct'
      randomizedAnswers={mockAnswers}
      onAnswerClick={()=> {
        revealAnswers = true;
      }} />);

    const incorrectAnswerItem = screen.getByRole('button', {name: 'incorrect1'});
    userEvent.click(incorrectAnswerItem);

    rerender(<Answers
      revealAnswers={revealAnswers}
      correctAnswer='correct'
      randomizedAnswers={mockAnswers}
      onAnswerClick={()=> {
        revealAnswers = true;
      }} />);
  });

  afterEach(cleanup);

  it('reveals the incorrect selected answer and the correct answer', () => {
    const renderedSelectedIncorrectAnswerItem1 = screen.getByRole('button', {name: 'incorrect1'});
    expect(renderedSelectedIncorrectAnswerItem1.style.borderColor).toBe('red');
    expect(renderedSelectedIncorrectAnswerItem1).toBeDisabled();

    const renderedSelectedIncorrectAnswerItem2 = screen.getByRole('button', {name: 'incorrect2'});
    expect(renderedSelectedIncorrectAnswerItem2).toBeDisabled();

    const renderedCorrectAnswerItem = screen.getByRole('button', {name: 'correct'});
    expect(renderedCorrectAnswerItem).toBeInTheDocument();
    expect(renderedCorrectAnswerItem.style.borderColor).toBe('green');
    expect(renderedCorrectAnswerItem).toBeDisabled();

    const answerIndication = screen.getByText('Incorrect...');
    expect(answerIndication).toBeInTheDocument();
  });
});

describe('And when an correct answer is selected', () => {
  let revealAnswers = false;
  beforeEach(() => {
    const { rerender } = render(<Answers
      revealAnswers={revealAnswers}
      correctAnswer='correct'
      randomizedAnswers={mockAnswers}
      onAnswerClick={()=> {
        revealAnswers = true;
      }} />);

    const correctAnswerItem = screen.getByRole('button', {name: 'correct'});
    userEvent.click(correctAnswerItem);

    rerender(<Answers
      revealAnswers={revealAnswers}
      correctAnswer='correct'
      randomizedAnswers={mockAnswers}
      onAnswerClick={()=> {
        revealAnswers = true;
      }} />);
  });

  afterEach(cleanup);

  it('reveals the correct answer', () => {
    const renderedSelectedIncorrectAnswerItem1 = screen.getByRole('listitem', {name: 'incorrect1'});
    expect(renderedSelectedIncorrectAnswerItem1.style.borderColor).toBe('red');
    expect(renderedSelectedIncorrectAnswerItem1).toBeDisabled();

    const renderedSelectedIncorrectAnswerItem2 = screen.getByRole('button', {name: 'incorrect2'});
    expect(renderedSelectedIncorrectAnswerItem2).toBeDisabled();

    const renderedCorrectAnswerItem = screen.getByRole('button', {name: 'correct'});
    expect(renderedCorrectAnswerItem).toBeInTheDocument();
    expect(renderedCorrectAnswerItem.style.borderColor).toBe('green');
    expect(renderedCorrectAnswerItem).toBeDisabled();

    const answerIndication = screen.getByText('Correct!');
    expect(answerIndication).toBeInTheDocument();
  });
});