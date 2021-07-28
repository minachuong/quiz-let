import React, { CSSProperties, useState } from 'react';

export const Answers = (props: AnswersProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | undefined>(undefined);
  const {correctAnswer, randomizedAnswers, revealAnswers} = props;
  const handleAnswer = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    selectedAnswer: string,
  ) => {
    setSelectedAnswer(selectedAnswer);
    props.onAnswerClick(selectedAnswer);
  };

  const plainAnswerStyles: CSSProperties = {
    fontSize: '1.2rem',
    fontFamily: 'monospace',
    color: 'black',
    background: 'none',
    border: 'none',
  };

  const plainListAnswerStyles: CSSProperties = {
    padding: '.4rem',
    margin: '.4rem'
  };

  const getRevealedAnswerStyles = (answer: string, correctAnswer: string, selectedAnswerText?: string): CSSProperties => {
    const isSelectedAnswer = answer === selectedAnswerText;
    const isCorrectAnswer = answer === correctAnswer;

    if (isSelectedAnswer || isCorrectAnswer) {
      const borderColor = answer === correctAnswer ? 'green' : 'red';
      const textDecoration = isCorrectAnswer ? 'none' : 'line-through';

      return {
        ...plainListAnswerStyles,
        border: `2px solid ${borderColor}`,
        textDecoration: textDecoration,
      };
    }

    return plainListAnswerStyles;
  }
  return (
    <>
      <ol type="A" style={{ padding: '0 20% 0 40%', fontWeight: 500, fontSize: '1.2rem', textAlign: 'justify' }}>
        {randomizedAnswers.map((answer) => (
          <li key={answer} style={
            revealAnswers
              ? getRevealedAnswerStyles(answer, correctAnswer, selectedAnswer)
              : plainListAnswerStyles
          }>
            <button
              disabled={revealAnswers}
              onClick={(e) => handleAnswer(e, answer)}
              style={plainAnswerStyles}>
              {answer}
            </button>
          </li>
        ))}
      </ol>
      {revealAnswers && (
        <p style={{ textAlign: 'center', padding: '1rem' }}>
          {selectedAnswer === correctAnswer ? 'Correct!' : 'Incorrect...'}
        </p>
      )}
    </>
  );
};

export interface AnswersProps {
  revealAnswers: boolean;
  correctAnswer: string;
  randomizedAnswers: string[];
  onAnswerClick: (selectedAnswerText: string) => void;
}


