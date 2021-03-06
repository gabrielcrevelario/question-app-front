import React, { useState } from 'react';
import Answer from './answer'
import Modal from './modal'
import {  useMutation } from "@apollo/react-hooks";
import { QUESTION_REMOVE_BY_ID } from './queries'
export default props => {
    let { description, answers } = props.question

    let {removeQuestion, updateQt, closeModal, numberQuestion, updateAnswer} = props
    const [isCorrect, setIsCorrect] = useState(false)
    const [showButton, setshowButton] = useState(false)
    const [openModal, setShowModal] = useState(false)
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
        props.question.answers = answers.filter(x => x._id !== id)
        updateAnswer(props.question)
    }
    function updateQuestion(e, question) {
        e.preventDefault();
        updateQt(e, question)
    }
    function addAnswerOfList(answer) {
        props.question.answers.push(answer)
        setRespClicked({})
        setShowModal(false)
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
   
    function addQuestion(description) {
        props.question.description = description
    }

    return (<div className="questionContainer">
        <div className="question">
        { openModal && <Modal close showModal={setShowModal} addAnswer={addAnswerOfList}
                addQuestion={addQuestion}
                close={setShowModal}
                closeQuestionAfterUpdate={closeModal}
                question={!isCreatedAnswer && props.question}
                titleModal={isCreatedAnswer ? 'Deseja criar uma nova alternativa ?': 'Deseja atualizar a descrição da questão ?'} 
                answer={isCreatedAnswer && {_id:'', questionId:props.question._id,descriptionAnswers:''}} closeButton={closeModal} />   }
            <div className="questionHeader">
                <div className="questionContainerNumber">
                <p>{numberQuestion}</p>
                </div>
                <div className="questionTitle">
                    <h3> {description} </h3>
                </div>

            </div>
            <div className="questionBody">
                <div onClick={e => setRespClicked({})} className="answerList">
                    <div className="questionItemContainer">
                        <div className="item">
                            <div className="answersList">
                                {answers && answers.map((answer, index) => {
                                    if(respClicked._id === answer["_id"]) {
                                        return <Answer key={answer._id} removeElement={removeAnswerOfList} onClick={setResponse} letter={String.fromCharCode(97 + index).toLocaleUpperCase()} answer={answer} isClicked={true} />
                                    } else {
                                        return <Answer  key={answer._id} removeElement={removeAnswerOfList} onClick={setResponse} letter={String.fromCharCode(97 + index).toLocaleUpperCase()}  answer={answer} isClicked={false} />
                                    }
                                })}

                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div className="containerBtn">
              {Object.keys(respClicked).length > 0 ? <button  onClick={showResp}>responder</button>:
              <button className="desabledButton" onClick={e => e.preventDefault()}>responder</button>
              }
                {
                  showButton &&
                 <div className="isCorrectOrNot">
                     {
                         isCorrect ?<> <p>Resposta certa! </p> <span class="material-icons">
                         check
                         </span> </>:<>  <p className="respFalse">Resposta errada!</p> <span  class="material-icons respFalse">
                        clear
                        </span></>
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