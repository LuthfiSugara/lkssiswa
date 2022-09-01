import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { baseUrl } from "../../utils/global";

import { 
    GETMATERI,
    GETDETAILMATERI,
    UPDATEMATERI,
} from "../types/materi";
import { ToastAndroid } from "react-native";

export const addMateri = (request) => async (dispatch) => {
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
            `${baseUrl}/api/add-materi`, 
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

export const getMateri = (idMapel, idKelas, idGuru) => {
    try{
        return async dispatch => {
            await AsyncStorage.getItem('userData')
            .then(value => {
                if(value != null){
                    let data = JSON.parse(value);
                    axios.get(
                        `${baseUrl}/api/materi/${idMapel}/${idKelas}/${idGuru}`, 
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + data.access_token
                            }
                        }
                    ).then(function(response){
                        if(response.data.status === "success"){
                            dispatch({
                                type: GETMATERI,
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

export const getDetailMateri = (id) => {
    try{
        return async dispatch => {
            await AsyncStorage.getItem('userData')
            .then(value => {
                if(value != null){
                    let data = JSON.parse(value);
                    axios.get(
                        `${baseUrl}/api/detail-materi/${id}`, 
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + data.access_token
                            }
                        }
                    ).then(function(response){
                        console.log("response : ",response.data);
                        if(response.data.status === "success"){
                            dispatch({
                                type: GETDETAILMATERI,
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

export const deleteFileMateri = (id) => async (dispatch) => {
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
            `${baseUrl}/api/delete-detail-file-materi/${id}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            }
        ).then(function(response){
            console.log("response : ", response.data);
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

export const updateMateri = (request, id) => async (dispatch) => {
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
            `${baseUrl}/api/update-materi/${id}`,
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