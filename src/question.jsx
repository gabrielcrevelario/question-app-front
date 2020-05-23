import React, { useState } from 'react';
import Answer from './answer'
import Modal from './modal'
import {  useMutation } from "@apollo/react-hooks";
import { QUESTION_REMOVE_BY_ID } from './queries'
export default props => {
    let { description, answers } = props.question

    let {removeQuestion, updateQt} = props
    const [isCorrect, setIsCorrect] = useState(false)
    const [showButton, setshowButton] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [isCreatedAnswer, setIsCreatedAnswer] = useState(false)
    const [respClicked, setRespClicked] = useState({})
    const [QuestionRemoveById, {data}] = useMutation(QUESTION_REMOVE_BY_ID);
    function setResponse(e,resp) {
        setshowButton(false)
        e.preventDefault();
        setRespClicked(resp)
        setIsCorrect(resp.questionTrue)
    }
    function remove(e) {
        e.preventDefault()
        removeQuestion(props.question._id)
        QuestionRemoveById({variables:{_id:props.question._id}})
    }
    function showResp() {
        setshowButton(true)
    }
    
    function removeAnswerOfList(e, id) {
        e.stopPropagation();
        debugger
        props.question.answers = answers.filter(x => x._id !== id)
        answers = answers.filter(x => x._id !== id)
        updateQuestion(props.question)
    }
    function updateQuestion(e, question) {
        e.preventDefault();
        updateQt(e, question)
    }
    function addAnswerOfList(answer) {
        debugger
        props.question.answers.push(answer)
        setRespClicked({})
    }
    
    function createAnswer(e) {
        e.preventDefault()
        setIsCreatedAnswer(true)
        setShowModal(true)
        setRespClicked({})
    }
    function updateQuestion(e) {
        setShowModal(true)
        setIsCreatedAnswer(false)
        setRespClicked({})
    }
    function closeModal() {
        setShowModal(false)
    }

    function addQuestion(description) {
        props.question.description = description
    }

    return (<div className="questionContainer">
        <div className="question">
        { showModal && <Modal closeModal={closeModal} addAnswer={addAnswerOfList}
                addQuestion={addQuestion}
                question={!isCreatedAnswer && props.question}
                answer={isCreatedAnswer && {_id:'', questionId:props.question._id,descriptionAnswers:''}} closeButton={closeModal} />   }
            <div className="questionHeader">
                <div className="questionContainerNumber">
                    <p>1</p>
                </div>
                <div className="questionTitle">
                    <h3> {description} </h3>
                </div>

            </div>
            <div className="questionBody">
                <div className="answerList">
                    <div className="questionItemContainer">
                        <div className="item">
                            <div className="answersList">
                                {answers.map((answer, index) => {
                                    if(respClicked._id === answer["_id"]) {
                                        return <Answer removeElement={removeAnswerOfList} onClick={setResponse} letter={String.fromCharCode(97 + index)} answer={answer} isClicked={true} />
                                    } else {
                                        return <Answer  removeElement={removeAnswerOfList} onClick={setResponse} letter={String.fromCharCode(97 + index)}  answer={answer} isClicked={false} />
                                    }
                                })}

                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div className="containerBtn">
                <button onClick={showResp}>responder</button>
                {
                  showButton &&
                 <div className="isCorrectOrNot">
                     {
                         isCorrect ?  <p>Resposta certa! :)</p> :  <p className="respFalse">Resposta errada! :(</p>
                     }
                </div>
                }
                <div className="groupBtns">
                    <button onClick={e => createAnswer(e)}>
                        <span className="material-icons">
                            add_circle_outline
                      </span>
                    </button>
                    <button onClick={e => updateQuestion(e)}>
                        <span className="material-icons edit">
                            edit
                  </span>
                    </button>
                    <button onClick={e => remove(e)}>
                        <span className="material-icons">
                            delete_outline
                      </span>
                    </button>
                </div>
            </div>
        </div>
    </div>)
}