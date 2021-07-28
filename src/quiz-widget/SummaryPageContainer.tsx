import React, {useState} from 'react';
import { Redirect } from 'react-router-dom';
import { Question, Quiz, SelectedAnswer } from '../App';
import { getMessage } from '../data/messages';
import { Page } from './Page';
import { AnswerSummary, Summary } from './Summary';

export const SummaryPageContainer = (props: SummaryPageContainerProps) => {
  const [redirect, setRedirect] = useState(false);
  const onNextClick = (): void => {
    props.onNextClick();
    setRedirect(true);
  }

  const generateAnswerSummaries = (questions: Question[], selectedAnswers: SelectedAnswer[]): AnswerSummary[] => {
    return selectedAnswers.map(selectedAnswer => {
      const correctAnswer = questions.find(question => question.text === selectedAnswer.questionText)?.correctAnswer;
      return {
        question: selectedAnswer.questionText,
        selectedAnswer: selectedAnswer.text,
        isAnswerCorrect: correctAnswer === selectedAnswer.text
      };
    })
  }

  const generatedAnswerSummaries = generateAnswerSummaries(props.quiz.questions, props.selectedAnswers);
  const numberOfCorrectAnswers = generatedAnswerSummaries.filter(summary => summary.isAnswerCorrect).length;

  const encouragingMessage = getMessage();
  
  return(
    <>
      {redirect 
        ? (<Redirect to='/quiz'/>) 
        : (
          <Page
          quiz={props.quiz}
          showNextButton={true}
          onNextClick={onNextClick}>
            <Summary 
              message={encouragingMessage}
              answerSummaries={generatedAnswerSummaries} 
              numberOfCorrectAnswers={numberOfCorrectAnswers} 
              numberOfTotalQuestions={props.quiz.questions.length}/>
        </Page>
        )
      }
    </>
  );
};

export interface SummaryPageContainerProps {
  quiz: Quiz;
  selectedAnswers: SelectedAnswer[];
  onNextClick: () => void;
}
