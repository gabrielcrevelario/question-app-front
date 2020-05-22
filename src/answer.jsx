import React from 'react';

export default props => {
    debugger
    const {answer, onClick} = props
    return (
        <div className="answersContainer">
        <div className="answerItem">
            <div className="numberAnswerContainer">
            <div onClick={onClick} className="numberAnswer"> <p>A</p></div>
            </div>
            <div className="description">
                <p>{answer.descriptionAnswers}</p>
                <div className="btnRemoveAndUpdate">
                    <button ><span className="material-icons">
                        edit
                        </span></button>
                    <button><span className="material-icons">
                        remove_circle_outline
                        </span></button>
                </div>
            </div>
        </div>
    </div>
    )
}