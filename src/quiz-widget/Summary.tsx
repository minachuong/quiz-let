import { CSSProperties } from 'react';

export const Summary = (props: SummaryProps) => {
  const largeTextStyles: CSSProperties = {
    fontSize: '1.4rem',
    textAlign: 'center',
    fontWeight: 400,
  };

  const boldTextStyles: CSSProperties = {
    fontWeight: 600
  };

  return (
    <>
      <h2 style={largeTextStyles}>
        <span>You got </span>
        <span style={boldTextStyles}>
          {props.numberOfCorrectAnswers}
        </span>
        <span> of </span>
        <span style={boldTextStyles}>
          {props.numberOfTotalQuestions}
        </span>
        <span> questions right.</span>
      </h2>
      <p style={largeTextStyles}>{props.message}</p>
      <p style={largeTextStyles}>You had:</p>
      <ol type="1" style={{paddingLeft: '24%', textAlign: 'justify'}}>
      {props.answerSummaries.map(answerSummary => (
        <li key={answerSummary.question} style={{paddingLeft: '.6rem'}}>
          <span>{answerSummary.question}</span>
          <span style={{color: answerSummary.isAnswerCorrect ? 'green' : 'red', paddingLeft: '.6rem'}}>
            {answerSummary.selectedAnswer}
          </span>
        </li>
      ))}
      </ol>
    </>
  );
};

export interface SummaryProps {
  message: string;
  answerSummaries: AnswerSummary[];
  numberOfCorrectAnswers: number;
  numberOfTotalQuestions: number;
}

export interface AnswerSummary {
  question: string;
  selectedAnswer: string;
  isAnswerCorrect: boolean;
}
