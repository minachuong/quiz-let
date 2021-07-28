import { Route, BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { Quiz, SelectedAnswer } from "./App";
import { QuizPageContainer } from "./quiz-widget/QuizPageContainer";
import { SummaryPageContainer } from "./quiz-widget/SummaryPageContainer";
import './App.css'

export const AppRouting = (props: AppRoutingProps) => {
  const {isLoading, quiz, selectedAnswers, onAnswerClick, onNextClick} = props;
  return (
    <>
      <Router>
        <Switch>
          <>
          {isLoading
            ? (<div>Loading Quizzes</div>)
            : (<section className="app">
                <Route path="/quiz">
                  <QuizPageContainer
                    quiz={quiz}
                    selectedAnswers={selectedAnswers}
                    onAnswerClick={onAnswerClick}/>
                </Route>
                <Route path="/summary">
                  <SummaryPageContainer
                    quiz={quiz}
                    selectedAnswers={selectedAnswers}
                    onNextClick={onNextClick}/>
                </Route>
                <Route path="/">
                  <Redirect to="/quiz"/>
                </Route>
              </section>
            )
          }
          </>
        </Switch>
      </Router>
    </>
  );
}

export interface AppRoutingProps {
  isLoading: boolean;
  quiz: Quiz;
  selectedAnswers: SelectedAnswer[];
  onAnswerClick: (selectedAnswer: SelectedAnswer) => void;
  onNextClick: () => void;
}