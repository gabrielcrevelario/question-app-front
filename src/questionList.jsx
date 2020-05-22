import React, { useState, useEffect }  from 'react';
import Question from './question'
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
export default (props) =>  {

    const [questions, setQuestions] = useState([]);
    const [isLoading, setLoading] = useState(true)
    const [rendered, setRendered]= useState(false)
    
    let answerMany = useQuery(gql`{
        AnswerMany {
            _id
            userId
            descriptionAnswers
            questionTrue
        }
    }`)
    const {loading, error, data} = useQuery(gql`{
        QuestionMany {
            _id
            description
        }
    }`)
    useEffect(() => {
        if(!loading && !answerMany.loading && !rendered) {
            setLoading(loading)
            console.log(data)
            if(data) {
                const questionsList = data.QuestionMany.map(question => {
                    question.answers =  answerMany.data.AnswerMany.filter(answer => answer.userId === question['_id'])
                    return question;
                })
                setQuestions(questionsList)
                setRendered(true)
                
            }
        }
    })


    if(isLoading) return <h1>Loading...</h1> 
   
    return (
        <div className="questionListContainer">
        <div className="questionList">
                {questions && questions.map(element=> {
                    return (<Question question={element} />)
                })}

            </div>
            </div>
    )
}