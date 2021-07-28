import {useState, useEffect} from "react";
import { Quiz } from "../App";
import { getQuizzes } from '../data/quizzes';

export const useGetQuizzes = (): [Quiz[], boolean, any] => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(undefined);

  useEffect(() => {
    getQuizzes()
      .then((quizzes) => {
        setQuizzes(quizzes);
        setIsLoading(false);
      })
      .catch((e) => {
        setError(e);
        setIsLoading(false);
      });
  }, []);

  return [quizzes, isLoading, error];
}