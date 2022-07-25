import React from "react";
import QuestionItem from './QuestionItem';

function QuestionList({ questions, updateQuestionList }) {
  const updateQuestion = (updatedQuestion) => {
    const updatedQuestions = questions.map( question => {
      if( question.id === updatedQuestion.id ) {
        question.currentIndex = updatedQuestion.currentIndex;
      }

      return question;
    })

    updateQuestionList( updatedQuestions )
  }

  const deleteQuestion = (questionId) => {
    const updatedQuestions = questions.filter( question => question.id !== questionId )

    fetch( `http://localhost:4000/questions/${questionId}`, {
      method: 'DELETE'
    })
      .then( res => res.json() )
      .then( updateQuestionList( updatedQuestions ) )
  }

  const renderQuestionList = () => {
    return questions.map( question => {
      return (
        <QuestionItem
          key={ question.id }
          question={ question }
          handleDeleteClick={ () => deleteQuestion( question.id ) }
          updateQuestion={ updateQuestion }
        />
      )
    })
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        { renderQuestionList() }  
      </ul>
    </section>
  );
}

export default QuestionList;
