import React, { useState, useEffect } from 'react';
import Question from './question'
import Modal from './modal'
import { useQuery } from "@apollo/react-hooks";
import { ANSWER_MANY, QUESTION_MANY } from './queries';
export default (props) => {

    const [questions, setQuestions] = useState([]);
    const [isLoading, setLoading] = useState(true)
    const [rendered, setRendered] = useState(false)
    const [showModal, setShowModal] = useState(false)

    const questionMany = useQuery(QUESTION_MANY)
    const answerMany = useQuery(ANSWER_MANY)
    useEffect(() => {
        if (!questionMany.loading && !answerMany.loading && !rendered) {
            setLoading(questionMany.loading)
            if (questionMany.data) {
                const questionsList = questionMany.data.QuestionMany.map(question => {
                    question.answers = answerMany.data.AnswerMany.filter(answer => answer.questionId === question['_id'])
                    return question;
                })
                setQuestions(questionsList)
                setRendered(true)

            }
        }
    })

    function popQuestion(id) {
        setQuestions(questions.filter(x => x._id !== id))
    }
    function closeButton(question, isUpdate) {
        debugger
        setShowModal(false)
        if (isUpdate) {
            let oldQuestion = questions.find(x => x._id === question._id);
            oldQuestion.description = question.description

        } else {
            if (question) setQuestions(questions.concat(question))
        }
    }
    function updateQuestion(question) {
        let index = questions.findIndex(x => x._id === question._id)
        questions[index] = question;

    }
    if (!isLoading)
        setTimeout(() => {
            return <div> <img src="../public/Round-Animated-Loading-Gif.gif" alt="" /> <h1>Loading...</h1> </div>
        }, 4000);
    return (
        <div className="questionListContainer">
            <div className="questionList">
                <button onClick={e => {
                    e.preventDefault();
                    setShowModal(true);
                }}>Criar Questão </button>
                {showModal && <Modal titleModal="Deseja criar uma nova questão ?" showModal={setShowModal} closeQuestion={closeButton} addQuestion={updateQuestion} question={{ description: '' }} />}
                {questions && questions.map((element, index) => {
                    return (<Question updateAnswer={closeButton} numberQuestion={index + 1} key={element._id} closeModal={closeButton} updateQt={updateQuestion} removeQuestion={popQuestion} question={element} />)
                })}

            </div>
        </div>
    )
}