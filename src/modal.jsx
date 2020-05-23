import React, { useState } from 'react';
import {  useMutation } from "@apollo/react-hooks";
import { ANSWER_MANY, QUESTION_MANY } from './queries';
import {ANSWER_UPDATE_BY_ID, QUESTION_UPDATE_BY_ID, ANSWER_CREATE_ONE, QUESTION_CREATE_ONE} from './queries'
const Modal = props => {
    const {answer, question, closeButton, addAnswer, addQuestion ,closeModal,closeModalAnswer} = props;
    const [valueAnswer, setValueAnswer] = useState( answer && answer.descriptionAnswers)
    const [valueQuestion, setValueQuestion] = useState(question && question.description)
    const [checkAnswer, setCheckAnswer] = useState(answer)
    const [AnswerUpdateById] = useMutation(ANSWER_UPDATE_BY_ID);
    const [AnswerCreateOne] = useMutation(ANSWER_CREATE_ONE,
    {
      update(cache, { data: { AnswerCreateOne } }) {
          debugger
          addAnswer(AnswerCreateOne.record)
        const {AnswerMany } = cache.readQuery({ query: ANSWER_MANY });
        cache.writeQuery({
          query: ANSWER_MANY,
          data: { AnswerMany: AnswerMany.concat([AnswerCreateOne]) },
        });
      }
    });
    const [QuestionUpdateById] = useMutation(QUESTION_UPDATE_BY_ID);
    const dataUpdate =  useMutation(QUESTION_UPDATE_BY_ID);
    const [QuestionCreateOne] = useMutation(QUESTION_CREATE_ONE);

    function changeAnswerValue(e) {
        e.preventDefault()
        setValueAnswer(e.target.value)
        answer.descriptionAnswers = e.target.value;
    } 

    function changeQuestionValue(e) {
        e.preventDefault()
        setValueQuestion(e.target.value)
        question.description = e.target.value;
    }
   
 function save(e) {
     e.preventDefault();
     if(answer._id !== '') {
         AnswerUpdateById({  variables: { _id:answer._id, descriptionAnswers:answer.descriptionAnswers, questionTrue:checkAnswer}});
        } else {
            let newAnswer = {questionId:answer.questionId, descriptionAnswers:valueAnswer, questionTrue:checkAnswer};
             AnswerCreateOne({variables:newAnswer})
            debugger
            console.log(dataUpdate)
       
      }
     closeButton();
 }
 function saveQuestion(e) {
     debugger
    e.preventDefault();
    if(question._id && question._id !== '') {
        QuestionUpdateById({  variables: { _id:question._id, description:question.description }});
     } else {
         debugger
       const newQuestion = { description:valueQuestion};
       QuestionCreateOne({variables:newQuestion})
       closeButton() && closeButton();
       addQuestion(newQuestion)
     }
}
        function onChange(e) {
            debugger
            setCheckAnswer(e.target.checked)
        }
    if(question) {
        return (
            <div className="backgroundBlack">
                <div className="containerModal">
                    <div className="modal">
                        <div className="modalHeader">
                            <div onClick={e => {
                                e.preventDefault();
                                closeModal()
                            }} className="close">X</div>
                        </div>
                        <div className="modalBody">
                            <input value={valueQuestion} onChange={e => changeQuestionValue(e)} type="text" name="" id=""/>
                        </div>
                        <div className="modalFooter">
                            <button onClick={(e) => saveQuestion(e)}>Salvar</button>
                        </div>
                    </div>
                </div>
        </div>)
    } else {
        return (
            <div className="backgroundBlack">
                <div className="containerModal">
                    <div className="modal">
                        <div className="modalHeader">
                            <div onClick={e => {
                         e.preventDefault()   
                         closeModalAnswer()}
                            }className="close">X</div>
                        </div>
                        <div className="modalBody">
                            <input  value={valueAnswer} onChange={e => changeAnswerValue(e)} type="text" name="" id=""/>
                            <label for="isTrue"> É a resposta certa ?</label>
                            <input type="checkbox" name="isTrue" value="Boat" onClick={e => onChange(e)} checked={answer.questionTrue} defaultChecked={answer.questionTrue} />          
                        </div>
                        <div className="modalFooter">
                            <button onClick={e => save(e)} >Salvar</button>
                        </div>
                    </div>
                </div>
        </div>)
    }
}

export default Modal;