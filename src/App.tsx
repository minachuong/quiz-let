import React, {useState} from 'react';
import './styles.css';
import {useGetQuizzes} from './quiz-widget/useGetQuizzes'
import { AppRouting } from './AppRouting';

export const App = () => {
  const [quizzes, isLoading] = useGetQuizzes();
  const [currentQuizPointer, setCurrentQuizPointer] = useState(0);
  const [currentQuizSelectedAnswers, setCurrentQuizSelectedAnswers] = useState<SelectedAnswer[]>([]);

  const incrementCurrentQuizPointer = () => {
    setCurrentQuizPointer(currentQuizPointer + 1);
  };

  const onSummaryNextClick = (): void => {
    clearSelectedAnswers();
    if (currentQuizPointer + 1 >= quizzes.length) {
      setCurrentQuizPointer(0);
    } else {
      incrementCurrentQuizPointer();
    }
  };

  const saveSelectedAnswer = (selectedAnswer: SelectedAnswer): void => {
    const newSelectedAnswers = [...currentQuizSelectedAnswers, selectedAnswer];
    setCurrentQuizSelectedAnswers(newSelectedAnswers);
  };

  const clearSelectedAnswers = (): void => {
    setCurrentQuizSelectedAnswers([]);
  };

  const currentQuiz = quizzes[currentQuizPointer];
  return React.createElement(AppRouting, {
    isLoading:isLoading,
    quiz: currentQuiz,
    selectedAnswers: currentQuizSelectedAnswers,
    onAnswerClick: saveSelectedAnswer,
    onNextClick: onSummaryNextClick
  });
}

export default App;

export interface Question {
  text: string;
  correctAnswer: string;
  incorrectAnswers: string[];
}

export interface Quiz {
  title: string;
  questions: Question[];
}

export interface SelectedAnswer {
  text: string;
  questionText: string; // ideally Question model would have an unique identifier
}
