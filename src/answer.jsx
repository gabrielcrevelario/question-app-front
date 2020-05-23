import React, { useState } from 'react';
import Modal from './modal'
import {ANSWER_REMOVE_BY_ID} from './queries'
import { useMutation } from "@apollo/react-hooks";
export default props => {
    
    const {answer, onClick, isClicked, removeElement, letter} = props
    const [showModal, setShowModal] = useState(false)

    const [answerRemoveById, { data }] = useMutation(ANSWER_REMOVE_BY_ID);
    
    function remove(e) {
        e.preventDefault()
        removeElement(e,answer._id)
        answerRemoveById({variables:{_id:answer._id}})
    }

    function selectButton(e) {
        onClick(e, answer)
    }

    function openModal(e) {
        e.preventDefault()
        setShowModal(true)
    }

    function openModal() {
        setShowModal(true)
    }
    function closeModal() {
        setShowModal(false)
    }
    return (
        <div className="answersContainer">
        <div className="answerItem">
            { showModal && <Modal answer={answer} closeModalAnswer={closeModal} closeButton={closeModal} />   }
            <div className="numberAnswerContainer">
    <div onClick={e => selectButton(e, answer)} className={`numberAnswer ${isClicked ? "isSelect":""}`} > <p>{letter}</p></div>
            </div>
            <div className="description">
                <p>{answer.descriptionAnswers}</p>
                <div className="btnRemoveAndUpdate">
                    <button onClick={e => openModal(e) } >
                        <span className="material-icons">
                        edit
                        </span>
                        </button>
                    <button onClick={remove}><span className="material-icons">
                        remove_circle_outline
                        </span></button>
                </div>
            </div>
        </div>
    </div>
    )
}