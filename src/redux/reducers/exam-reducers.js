
import {
    GETDETAILEXAM,
    GETEXAMQUESTIONSPG,
    GETEXAMQUESTIONSESSAY,
    GETEXAMBASEONTYPE,
    GETDETAILQUESTION,
    GETEXAMRESULTS,
    GETEXAMRESULTSANSWER,
    GETSTUDENTSCORE,
    GET_STUDENT_SCORE_DETAIL,
    CORRECT_STUDENT_ANSWER,
    DETAIL_SCORE,
    DETAIL_ANSWER,
} from "../types/exam";

const initialState = {
    load_exam: true,
    exam_pg: [],
    detail_exam: [],
    exam_essay: [],
    exam_base_on_type: [],
    detail_question: [],
    exam_results: [],
    exam_results_answer: [],
    student_score: [],
    student_score_detail: [],
    correct_student_answer: [],
    detail_score: [],
    detail_answer: [],
}

const examReducer = (state = initialState, action) => {
    switch(action.type){
        case GETDETAILEXAM:
            return {
                ...state,
                load_exam: false,
                detail_exam: action.payload
            }
        case GETEXAMQUESTIONSPG:
            return {
                ...state,
                load_exam: false,
                exam_pg: action.payload
            }
        case GETEXAMQUESTIONSESSAY:
            return {
                ...state,
                load_exam: false,
                exam_essay: action.payload
            }
        case GETEXAMBASEONTYPE:
            return {
                ...state,
                load_exam: false,
                exam_base_on_type: action.payload
            }
        case GETDETAILQUESTION:
            return {
                ...state,
                load_exam: false,
                detail_question: action.payload
            }
        case GETEXAMRESULTS:
            return {
                ...state,
                load_exam: false,
                exam_results: action.payload
            }
        case GETEXAMRESULTSANSWER:
            return {
                ...state,
                load_exam: false,
                exam_results_answer: action.payload
            }
        case GETSTUDENTSCORE:
            return {
                ...state,
                load_exam: false,
                student_score: action.payload
            }
        case GET_STUDENT_SCORE_DETAIL:
            return {
                ...state,
                load_exam: false,
                student_score_detail: action.payload
            }
        case CORRECT_STUDENT_ANSWER:
            return {
                ...state,
                load_exam: false,
                correct_student_answer: action.payload
            }
        case DETAIL_SCORE:
            return {
                ...state,
                load_exam: false,
                detail_score: action.payload
            }
        case DETAIL_ANSWER:
            return {
                ...state,
                load_exam: false,
                detail_answer: action.payload
            }
        default: 
            return state;
    }
}

export default examReducer;