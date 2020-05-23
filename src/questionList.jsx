import React, { useState, useEffect }  from 'react';
import Question from './question'
import gql from "graphql-tag";
import Modal from './modal'
import { useQuery,useMutation } from "@apollo/react-hooks";
import { ANSWER_MANY, QUESTION_MANY, QUESTION_CREATE_ONE } from './queries';
export default (props) =>  {

    const [questions, setQuestions] = useState([]);
    const [isLoading, setLoading] = useState(true)
    const [rendered, setRendered]= useState(false)
    const [showModal,setShowModal]= useState(false)
    const [newQuestion, setNewQuestion] = useState({})
    
    const questionMany = useQuery(QUESTION_MANY)
    const answerMany = useQuery(ANSWER_MANY)
    useEffect(() => {
        if(!questionMany.loading && !answerMany.loading && !rendered) {
            setLoading(questionMany.loading)
            if(questionMany.data) {
                const questionsList = questionMany.data.QuestionMany.map(question => {
                    question.answers =  answerMany.data.AnswerMany.filter(answer => answer.questionId === question['_id'])
                    return question;
                })
                setQuestions(questionsList)
                setRendered(true)
                
            }
        }
    })

   function popQuestion(id) {
    setQuestions(questions.filter(x => x._id === id))
    }
    function closeButton() {
        setShowModal(false)
    }
    function updateQuestion(question) {
      let index = questions.findIndex(x => x._id === question._id)
      questions[index] = question;
      
    }
    if(isLoading) return <h1>Loading...</h1> 
   
    return (
        <div className="questionListContainer">
        <div className="questionList">
                <button onClick={e => {
                    e.preventDefault();
                    setShowModal(true);
                }}>Criar Questão </button>
        { showModal && <Modal closeButton={closeButton} addQuestion={updateQuestion}question={{description:''}}  />   }
                {questions && questions.map(element=> {
                    return (<Question updateQt={updateQuestion} removeQuestion={popQuestion} question={element} />)
                })}

            </div>
            </div>
    )
}