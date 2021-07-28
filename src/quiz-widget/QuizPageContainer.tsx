import {useEffect, useState} from 'react';
import {Page} from './Page';
import {Answers} from './Answers';
import {Question, Quiz, SelectedAnswer} from '../App';
import { Redirect } from 'react-router-dom';

export const QuizPageContainer = (props: QuizPageContainerProps) => {
  const [showNextButton, setShowNextButton] = useState(false);
  const [revealAnswers, setRevealAnswers] = useState(false);
  const [randomizedAnswers, setRandomizedAnswers] = useState<string[]>([]);
  const [currentQuestionPointer, setCurrentQuestionPointer] = useState(0);
  const currentQuestion = props.quiz.questions[currentQuestionPointer];

  const onNextClick = () => {
    setCurrentQuestionPointer(currentQuestionPointer + 1);
    setShowNextButton(false);
    setRevealAnswers(false);
  }

  const onAnswerClick = (selectedAnswerText: string) => {
    const selectedAnswer: SelectedAnswer = {
      questionText: currentQuestion.text, 
      text: selectedAnswerText
    };
    props.onAnswerClick(selectedAnswer);
    setRevealAnswers(true);
    setShowNextButton(true);
  }

  const randomizeAnswers = (question: Question): string[] => {
    let answers = [question.correctAnswer, ...question.incorrectAnswers];

    for(let i = answers.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() * i)
      const temp = answers[i];
      answers[i] = answers[j];
      answers[j] = temp;
    }
    return answers;
  }

  useEffect(() => {
    if (currentQuestionPointer < props.quiz.questions.length) {
      setRandomizedAnswers(randomizeAnswers(currentQuestion));
    }
  }, [currentQuestionPointer, currentQuestion, props.quiz.questions.length]);

  return(
    <>
      {currentQuestionPointer === props.quiz.questions.length 
        ? (<Redirect to='/summary'/>) 
        : (<Page
            quiz={props.quiz}
            showNextButton={showNextButton}
            onNextClick={onNextClick}>
              <>
                <h2 style={{ textAlign: 'center', fontWeight: 500 }}>
                  {currentQuestion.text}
                </h2>
                <Answers
                  revealAnswers={revealAnswers}
                  correctAnswer={currentQuestion.correctAnswer}
                  randomizedAnswers={randomizedAnswers}
                  onAnswerClick={onAnswerClick}
                /> 
              </> 
          </Page>)
      }
    </>
  );
};

export interface QuizPageContainerProps {
  quiz: Quiz;
  selectedAnswers: SelectedAnswer[];
  onAnswerClick: any;
}