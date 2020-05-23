import gql from "graphql-tag";
export const ANSWER_MANY = gql`{
  AnswerMany {
      _id
      questionId
      descriptionAnswers
      questionTrue
  }
}`
export const QUESTION_MANY = gql`{
  QuestionMany {
      _id
      description
  }
}`

export const ANSWER_UPDATE_BY_ID = gql` mutation AnswerUpdateById( $_id:MongoID!, $descriptionAnswers:String!,  $questionTrue:Boolean! ){
    AnswerUpdateById( record:{  _id:$_id, descriptionAnswers:$descriptionAnswers, questionTrue:$questionTrue } ) {
      record {
        _id
        descriptionAnswers
        questionTrue
     }
   }
 
  }
`;

export const ANSWER_CREATE_ONE = gql` mutation AnswerCreateOne( $questionId:MongoID!,  $descriptionAnswers:String!,  $questionTrue:Boolean! ){
    AnswerCreateOne( record:{ questionId:$questionId,  descriptionAnswers:$descriptionAnswers , questionTrue:$questionTrue} ) {
      record {
        _id
        descriptionAnswers
        questionTrue
     }
   }
 
  }
`;
export const ANSWER_REMOVE_BY_ID = gql` mutation AnswerRemoveById( $_id:MongoID! ){
  AnswerRemoveById( _id:$_id ) {
      record {
        _id
        descriptionAnswers
     }
   }
 
  }
`;



//////////////////////////////////////// QUESTIONS ////////////////////////////////////////////////////

export const QUESTION_UPDATE_BY_ID = gql` mutation QuestionUpdateById( $_id:MongoID!, $description:String! ){
    QuestionUpdateById( record:{  _id:$_id, description:$description} ) {
      record {
        _id
        description
     }
   }
 
  }
`;

export const QUESTION_CREATE_ONE = gql` mutation QuestionCreateOne(  $description:String! ){
    QuestionCreateOne( record:{  description:$description } ) {
      record {
        _id
        description
    
     }
   }
 
  }
`;
export const QUESTION_REMOVE_BY_ID = gql` mutation QuestionRemoveById( $_id:MongoID! ){
  QuestionRemoveById( _id:$_id ) {
    record {
      _id
      description
   }
 }
 
  }
`;
