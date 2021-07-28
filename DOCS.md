# Documentation

Hi there! 


Thank you for taking the time to review my code sample. As someone who has primarily worked on Angular apps, this was a delightful way to learn about some common React patterns.

The Delighters I chose were:
- C. displaying a list of the quiz's questions with user's answers styled to indicate correctness
- D. tests - didn't have time to finish all tests but I've provided some in `Answers.test.js`

## Component Architecture
This app is composed of two pages: 
1) displays a question and answer
2) summary of answers indicating which were answered correctly and incorrectly by the user

`react-router-dom` is used to navigate between the pages

Using the router to navigate between made implementing the transition between the pages easy. This however allows clever users to navigate directly to the summary without answering questions by manually manipulating the browser URL. There would be more work to protecting the summary route.

Component architecture is as follows:
`App` - manages app state
-`AppPresentation` - manages page routing and passing down event handlers
--`QuizPageContainer` - manages quiz page behavior
---`Page` - presentational component (quiz title and button)
----`Answers` - presents answers
--`SummaryPageContainer` - manages summary page behavior
---`Page` - presentational component (quiz title and button)
----`Summary` - presents summary


`QuizPageContainer` and `SummaryPageContainer` are Higher-Order Components and own the state/data needed for child components. `PageComponent` has the leaky behavior of accepting an event handler for the Next button and also being able to hide the button based on external state. The benefit of doing it this way is we get to enforce presentational consistency across pages so that child components don't have to own the Next button. From my understanding, this situation can be improved with the use of Redux.


With a little more time,
- Complete all tests
- I'd refactor styles into files