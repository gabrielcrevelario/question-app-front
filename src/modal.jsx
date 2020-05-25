import React, { useState } from 'react';
import {  useMutation } from "@apollo/react-hooks";
import { ANSWER_MANY, QUESTION_MANY } from './queries';
import {ANSWER_UPDATE_BY_ID, QUESTION_UPDATE_BY_ID, ANSWER_CREATE_ONE, QUESTION_CREATE_ONE} from './queries'
const Modal = props => {
    const {answer, question, closeButton, addAnswer, addQuestion ,showModal, closeQuestionAfterUpdate, close, titleModal} = props;
    const [valueAnswer, setValueAnswer] = useState( answer && answer.descriptionAnswers)
    const [valueQuestion, setValueQuestion] = useState(question && question.description)
    const [checkAnswer, setCheckAnswer] = useState(answer ? answer.questionTrue: false)
    const [AnswerUpdateById] = useMutation(ANSWER_UPDATE_BY_ID);
    const [AnswerCreateOne] = useMutation(ANSWER_CREATE_ONE,
    {
      update(cache, { data: { AnswerCreateOne } }) {
          addAnswer(AnswerCreateOne.record, false)
        const {AnswerMany } = cache.readQuery({ query: ANSWER_MANY });
        cache.writeQuery({
          query: ANSWER_MANY,
          data: { AnswerMany: AnswerMany.concat([AnswerCreateOne]) },
        });
      }
    });
    const [QuestionCreateOne] = useMutation(QUESTION_CREATE_ONE,
        {
          update(cache, { data: { QuestionCreateOne } }) {
              showModal(false)
              closeQuestionAfterUpdate(QuestionCreateOne.record, false)
            const {QuestionMany } = cache.readQuery({ query: QUESTION_MANY });
            cache.writeQuery({
              query: ANSWER_MANY,
              data: { QuestionMany: QuestionMany.concat([QuestionCreateOne]) },
            });
          }
        });
    const [QuestionUpdateById] = useMutation(QUESTION_UPDATE_BY_ID);
    const dataUpdate =  useMutation(QUESTION_UPDATE_BY_ID);

    function changeAnswerValue(e) {
        e.preventDefault()
        setValueAnswer(e.target.value)
    } 

    function changeQuestionValue(e) {
        e.preventDefault()
        setValueQuestion(e.target.value)
        question.description = e.target.value;
    }
   
 function save(e) {
     e.preventDefault();
     if(answer._id !== '') {
        const answerUpdate ={ _id:answer._id, descriptionAnswers:valueAnswer, questionTrue:checkAnswer ? checkAnswer: false} 
         AnswerUpdateById({  variables: answerUpdate});
         addAnswer(answerUpdate, true)
         close();
        } else {
            let newAnswer = {questionId:answer.questionId, descriptionAnswers:valueAnswer, questionTrue:checkAnswer ? checkAnswer: false};
             AnswerCreateOne({variables:newAnswer})
            console.log(dataUpdate)
       
      }
 }
 function saveQuestion(e) {
     e.preventDefault();
     if(question._id && question._id !== '') {
        const questionUpdate =  { _id:question._id, description:question.description }
        QuestionUpdateById({  variables: {...questionUpdate}});
        closeQuestionAfterUpdate(questionUpdate, true)
        showModal(false)
    } else {
       const newQuestion = { description:valueQuestion};
       QuestionCreateOne({variables:newQuestion})
     }
}
        function onChange(e) {
            setCheckAnswer(e.target.checked)
        }
    if(question) {
        return (
            <div className="backgroundBlack">
                <div className="containerModal">
                    <div className="modal">
                        <div className="modalHeader">
                            <div onClick={e => {
                                showModal(false)
                            }} className="close">X</div>
                        </div>
                        <div className="modalBody">
                            <h2>{titleModal}</h2>
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
                            <div onClick={ (e) => {close()}}  className="close">X</div>
                        </div>
                        <div className="modalBody">
                           <h2>{titleModal}</h2>
                            <input  value={valueAnswer} onChange={e => changeAnswerValue(e)} type="text" name="" id=""/>
                            <div className="checkBoxContainer">
                                <label> É a resposta certa ?</label>
                                <input type="checkbox" name="isTrue" value="Boat" onClick={e => onChange(e)} checked={checkAnswer} />          
                            </div>
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