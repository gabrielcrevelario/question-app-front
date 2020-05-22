import React, { useState } from 'react';
import Answer from './answer'
export default props => {
    debugger
    const { description, answers } = props.question
    const [isCorrect, setIsCorrect] = useState(false)
    const [showButton, setshowButton] = useState(false)
    const [respClicked, setRespClicked] = useState({})
    const id = props['_id']

    function setResponse(e,resp) {
        setshowButton(false)
        debugger
        e.preventDefault();
        setRespClicked(resp)
        setIsCorrect(resp.questionTrue)
    }
    function showResp() {
        setshowButton(true)
    }
    return (<div className="questionContainer">
        <div className="question">
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
                                {answers.map(answer => {
                                    debugger
                                    return <Answer onClick={e => setResponse(e, answer)} answer={answer} />
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
                    <button>
                        <span className="material-icons">
                            add_circle_outline
                      </span>
                    </button>
                    <button>
                        <span className="material-icons edit">
                            edit
                  </span>
                    </button>
                    <button>
                        <span className="material-icons">
                            delete_outline
                      </span>
                    </button>
                </div>
            </div>
        </div>
    </div>)
}