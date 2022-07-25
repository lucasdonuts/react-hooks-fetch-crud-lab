import React from "react";

function QuestionItem({ question, handleDeleteClick, updateQuestion }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  const handleUpdateClick = (e) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        correctIndex: parseInt(e.target.value)
      })
    })
      .then( res => res.json() )
      .then( updatedQuestion => updateQuestion( updatedQuestion ) )
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select
          onChange={ handleUpdateClick }
          defaultValue={ correctIndex }
        >{options}</select>
      </label>
      <button
        onClick={ () => handleDeleteClick( id ) }
      >
        Delete Question
      </button>
    </li>
  );
}

export default QuestionItem;
