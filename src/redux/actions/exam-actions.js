import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { baseUrl } from "../../utils/global";

import { 
    GETEXAMQUESTIONSPG,
    GETEXAMQUESTIONSESSAY,
    GETEXAMBASEONTYPE,
    GETDETAILQUESTION,
    GETDETAILEXAM,
    GETEXAMRESULTS,
    GETEXAMRESULTSANSWER,
    GETSTUDENTSCORE,
    GET_STUDENT_SCORE_DETAIL,
    CORRECT_STUDENT_ANSWER,
    DETAIL_SCORE,
    DETAIL_ANSWER,
    UPDATE_STUDENT_SCORE,
    UPDATE_DETAIL_ANSWER,
    CREATEEXAM,
} from "../types/exam";
import { ToastAndroid } from "react-native";
import { UseGetAction } from "../../utils/use-get-action";
import { UsePostAction } from "../../utils/use-post-action";

export const getStudentScore = (id_kelas, id_mapel) => 
    UseGetAction(
        'student-score',
        GETSTUDENTSCORE, 
        {id_kelas : id_kelas, id_mapel: id_mapel},
    );

export const getStudentScoreDetail = (id_ujian) => 
    UseGetAction(
        'student-score-detail',
        GET_STUDENT_SCORE_DETAIL, 
        {id_ujian : id_ujian},
    );

export const createExam = (data) => 
    UsePostAction(
        'create-exam',
        CREATEEXAM,
        undefined,
        data,
        false,
    );

export const getDetailExam = (id) => 
    UseGetAction(
        'detail-exam',
        GETDETAILEXAM, 
        {id: id},
    );

export const updateExam = (request, id) => async (dispatch) => {
    try{
        let token = "";
        await AsyncStorage.getItem('userData')
        .then(value => {
            if(value != null){
                let data = JSON.parse(value);
                token = data.access_token;
            }
        });

        const req = axios.post(
            `${baseUrl}/api/update-exam/${id}`, 
            request,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            }
        ).then(function(response){
            if(response.data.status === "success"){
                ToastAndroid.showWithGravityAndOffset(
                    response.data.message,
                    ToastAndroid.LONG,
                    ToastAndroid.TOP,
                    25,
                    50
                );
            }else{
                ToastAndroid.showWithGravityAndOffset(
                    response.data.message,
                    ToastAndroid.LONG,
                    ToastAndroid.TOP,
                    25,
                    50
                );
            }
            
            return response.data;
        }).catch(function(error){
            console.log(error);
        });

        return req;
    }catch(error){
        console.log(error);
    }
}

export const createExamQuestions = (request) => async (dispatch) => {
    try{
        let token = "";
        await AsyncStorage.getItem('userData')
        .then(value => {
            if(value != null){
                let data = JSON.parse(value);
                token = data.access_token;
            }
        });

        const req = axios.post(
            `${baseUrl}/api/create-exam-questions`, 
            request,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + token
                }
            }
        ).then(function(response){
            if(response.data.status === "success"){
                ToastAndroid.showWithGravityAndOffset(
                    response.data.message,
                    ToastAndroid.LONG,
                    ToastAndroid.TOP,
                    25,
                    50
                );
            }else{
                ToastAndroid.showWithGravityAndOffset(
                    response.data.message,
                    ToastAndroid.LONG,
                    ToastAndroid.TOP,
                    25,
                    50
                );
            }
            
            return response.data;
        }).catch(function(error){
            console.log(error);
        });

        return req;
    }catch(error){
        console.log(error);
    }
}

export const getExamQuestionsPG = (id, type) =>
    UseGetAction(
        'get-exam-questions',
        GETEXAMQUESTIONSPG,
        {id: id, type: type}
    );

export const getExamQuestionsEssay = (id, type) => 
    UseGetAction(
        'get-exam-questions',
        GETEXAMQUESTIONSESSAY,
        {id: id, type: type}
    );

export const getExamBaseOnType = (type, id_mapel, id_kelas, id_guru) => 
    UseGetAction(
        'get-all-exam-base-on-type',
        GETEXAMBASEONTYPE,
        {type: type, id_mapel: id_mapel, id_kelas: id_kelas, id_guru: id_guru}

    );

export const deleteExam = (id) => async (dispatch) => {
    try{
        let token = "";
        
        await AsyncStorage.getItem('userData')
        .then(value => {
            if(value != null){
                let data = JSON.parse(value);
                token = data.access_token;
            }
        });

        const req = axios.get(
            `${baseUrl}/api/delete-exam/${id}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            }
        ).then(function(response){
            if(response.data.status === "success"){
                ToastAndroid.showWithGravityAndOffset(
                    response.data.message,
                    ToastAndroid.LONG,
                    ToastAndroid.TOP,
                    25,
                    50
                );
            }else{
                ToastAndroid.showWithGravityAndOffset(
                    response.data.message,
                    ToastAndroid.LONG,
                    ToastAndroid.TOP,
                    25,
                    50
                );
            }
            
            return response.data;
        }).catch(function(error){
            console.log(error);
        });

        return req;
    }catch(error){
        console.log(error);
    }
}

export const getDetailQuestion = (id) => 
    UseGetAction(
        'detail-question',
        GETDETAILQUESTION,
        {id: id}
    );

export const deleteFileExam = (id) => async (dispatch) => {
    try{
        let token = "";
        
        await AsyncStorage.getItem('userData')
        .then(value => {
            if(value != null){
                let data = JSON.parse(value);
                token = data.access_token;
            }
        });

        const req = axios.get(
            `${baseUrl}/api/delete-file-exam/${id}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            }
        ).then(function(response){
            if(response.data.status === "success"){
                ToastAndroid.showWithGravityAndOffset(
                    response.data.message,
                    ToastAndroid.LONG,
                    ToastAndroid.TOP,
                    25,
                    50
                );
            }else{
                ToastAndroid.showWithGravityAndOffset(
                    response.data.message,
                    ToastAndroid.LONG,
                    ToastAndroid.TOP,
                    25,
                    50
                );
            }
            
            return response.data;
        }).catch(function(error){
            console.log(error);
        });

        return req;
    }catch(error){
        console.log(error);
    }
}

export const updateExamQuestion = (request, id) => async (dispatch) => {
    try{
        let token = "";
        await AsyncStorage.getItem('userData')
        .then(value => {
            if(value != null){
                let data = JSON.parse(value);
                token = data.access_token;
            }
        });

        const req = axios.post(
            `${baseUrl}/api/update-question/${id}`, 
            request,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + token
                }
            }
        ).then(function(response){
            if(response.data.status === "success"){
                ToastAndroid.showWithGravityAndOffset(
                    response.data.message,
                    ToastAndroid.LONG,
                    ToastAndroid.TOP,
                    25,
                    50
                );
            }else{
                ToastAndroid.showWithGravityAndOffset(
                    response.data.message,
                    ToastAndroid.LONG,
                    ToastAndroid.TOP,
                    25,
                    50
                );
            }
            
            return response.data;
        }).catch(function(error){
            console.log(error);
        });

        return req;
    }catch(error){
        console.log(error);
    }
}

export const createExamResults = (request) => async (dispatch) => {
    try{
        let token = "";
        await AsyncStorage.getItem('userData')
        .then(value => {
            if(value != null){
                let data = JSON.parse(value);
                token = data.access_token;
            }
        });

        const req = axios.post(
            `${baseUrl}/api/create-exam-results`, 
            request,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            }
        ).then(function(response){
            if(response.data.status === "success"){
                ToastAndroid.showWithGravityAndOffset(
                    response.data.message,
                    ToastAndroid.LONG,
                    ToastAndroid.TOP,
                    25,
                    50
                );
            }else{
                ToastAndroid.showWithGravityAndOffset(
                    response.data.message,
                    ToastAndroid.LONG,
                    ToastAndroid.TOP,
                    25,
                    50
                );
            }
            
            return response.data;
        }).catch(function(error){
            console.log(error);
        });

        return req;
    }catch(error){
        console.log(error);
    }
}

export const getExamResults = (idUjian, idSiswa) => {
    try{
        return async dispatch => {
            await AsyncStorage.getItem('userData')
            .then(value => {
                if(value != null){
                    let data = JSON.parse(value);
                    axios.get(
                        `${baseUrl}/api/get-exam-results/${idUjian}/${idSiswa}`, 
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + data.access_token
                            }
                        }
                    ).then(function(response){
                        if(response.data.status === "success"){
                            dispatch({
                                type: GETEXAMRESULTS,
                                payload: response.data.data,
                            });
                        }
                    }).catch(function(error){
                        console.log(error);
                    });
                }
            })
        }
    }catch(error){
        console.log(error);
    }
}

export const getExamResultsAnswer = (id_siswa, id_ujian, id_soal) => 
    UseGetAction(
        'get-exam-results-answer',
        GETEXAMRESULTSANSWER,
        {id_siswa: id_siswa, id_ujian: id_ujian, id_soal: id_soal}
    );

export const updateExamResultsAnswer = (request, id_siswa, id_ujian, id_soal) => async (dispatch) => {
    try{
        let token = "";
        await AsyncStorage.getItem('userData')
        .then(value => {
            if(value != null){
                let data = JSON.parse(value);
                token = data.access_token;
            }
        });

        const req = axios.post(
            `${baseUrl}/api/update-exam-results-answer/${id_siswa}/${id_ujian}/${id_soal}`, 
            request,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            }
        ).then(function(response){
            if(response.data.status === "success"){
                ToastAndroid.showWithGravityAndOffset(
                    response.data.message,
                    ToastAndroid.LONG,
                    ToastAndroid.TOP,
                    25,
                    50
                );
            }else{
                ToastAndroid.showWithGravityAndOffset(
                    response.data.message,
                    ToastAndroid.LONG,
                    ToastAndroid.TOP,
                    25,
                    50
                );
            }
            
            return response.data;
        }).catch(function(error){
            console.log(error);
        });

        return req;
    }catch(error){
        console.log(error);
    }
}

export const correctStudentAnswer = (id_ujian) => 
    UseGetAction(
        'correct-student-answer',
        CORRECT_STUDENT_ANSWER, 
        {id_ujian: id_ujian},
    );

export const detailScore = (id_ujian, id_siswa) => 
    UseGetAction(
        'detail-score',
        DETAIL_SCORE, 
        {id_ujian: id_ujian, id_siswa: id_siswa},
    );

export const detailAnswer = (id_ujian, id_siswa, id_soal) => 
    UseGetAction(
        'detail-answer',
        DETAIL_ANSWER, 
        {id_ujian: id_ujian, id_siswa: id_siswa, id_soal: id_soal},
    );

export const updateDetailAnswer = (request) => async (dispatch) => {
    try{
        let token = "";
        await AsyncStorage.getItem('userData')
        .then(value => {
            if(value != null){
                let data = JSON.parse(value);
                token = data.access_token;
            }
        });

        const req = axios.post(
            `${baseUrl}/api/update-detail-answer`, 
            request,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            }
        ).then(function(response){
            if(response.data.status === "success"){
                ToastAndroid.showWithGravityAndOffset(
                    response.data.message,
                    ToastAndroid.LONG,
                    ToastAndroid.TOP,
                    25,
                    50
                );
            }else{
                ToastAndroid.showWithGravityAndOffset(
                    response.data.message,
                    ToastAndroid.LONG,
                    ToastAndroid.TOP,
                    25,
                    50
                );
            }
            
            return response.data;
        }).catch(function(error){
            console.log(error);
        });

        return req;
    }catch(error){
        console.log(error);
    }
}

export const updateStudentScore = (data) => 
    UsePostAction(
        'update-student-score',
        UPDATE_STUDENT_SCORE, 
        undefined,
        data,
        false,
    );