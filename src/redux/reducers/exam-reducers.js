
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
    GET_LOCATION_EXAM,
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
    location_exam: [],
}

const examReducer = (state = initialState, action) => {
    switch(action.type){
        case GETDETAILEXAM:
            return {
                ...state,
                load_exam: action.payload.loading,
                detail_exam: action.payload.data
            }
        case GETEXAMQUESTIONSPG:
            return {
                ...state,
                load_exam: action.payload.loading,
                exam_pg: action.payload.data
            }
        case GETEXAMQUESTIONSESSAY:
            return {
                ...state,
                load_exam: action.payload.loading,
                exam_essay: action.payload.data
            }
        case GETEXAMBASEONTYPE:
            return {
                ...state,
                load_exam: action.payload.loading,
                exam_base_on_type: action.payload.data
            }
        case GETDETAILQUESTION:
            return {
                ...state,
                load_exam: action.payload.loading,
                detail_question: action.payload.data
            }
        case GETEXAMRESULTS:
            return {
                ...state,
                load_exam: action.payload.loading,
                exam_results: action.payload.data
            }
        case GETEXAMRESULTSANSWER:
            return {
                ...state,
                load_exam: action.payload.loading,
                exam_results_answer: action.payload.data
            }
        case GETSTUDENTSCORE:
            return {
                ...state,
                load_exam: action.payload.loading,
                student_score: action.payload.data
            }
        case GET_STUDENT_SCORE_DETAIL:
            return {
                ...state,
                load_exam: action.payload.loading,
                student_score_detail: action.payload.data
            }
        case CORRECT_STUDENT_ANSWER:
            return {
                ...state,
                load_exam: action.payload.loading,
                correct_student_answer: action.payload.data
            }
        case DETAIL_SCORE:
            return {
                ...state,
                load_exam: action.payload.loading,
                detail_score: action.payload.data
            }
        case DETAIL_ANSWER:
            return {
                ...state,
                load_exam: action.payload.loading,
                detail_answer: action.payload.data
            }
        case GET_LOCATION_EXAM:
            return {
                ...state,
                load_exam: action.payload.loading,
                location_exam: action.payload.data
            }
        default: 
            return state;
    }
}

export default examReducer;