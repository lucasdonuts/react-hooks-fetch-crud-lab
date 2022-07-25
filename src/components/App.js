import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/questions')
      .then( res => res.json() )
      .then( setQuestions )
  }, [])

  const addNewQuestion = (newQuestion) => {
    setQuestions( [ ...questions, newQuestion ] )
  }

  const updateQuestionList = ( updatedQuestions ) => {
    setQuestions( updatedQuestions )
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {
        page === "Form"
          ? <QuestionForm addNewQuestion={ addNewQuestion } />
          : <QuestionList
              questions={ questions }
              updateQuestionList={ updateQuestionList }
            />
      }
    </main>
  );
}

export default App;
