import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { ToastAndroid } from "react-native";
import { baseUrl } from "../../utils/global";

import {
    SIGNIN,
    SIGNOUT,
    ISLOGGEDIN,
    REGISTER,
    LOGIN,
    GET_PROFILE,
    GET_ALL_USER,
    GET_DETAIL_USER,
    GET_ALL_ADMIN,
    GET_ALL_GURU,
    EDIT_USER,
    GET_ALL_SISWA,
    GETTEACHERBYID,
} from '../types/auth';

export const signIn = (data) => {
    try{
        return async dispatch => {
            console.log(`utils : ${baseUrl}/api/login`);
            axios.post( 
                `${baseUrl}/api/login`, 
                data,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            ).then(function(response){
                if(response.data.status === "success"){
                    AsyncStorage.setItem('userData', JSON.stringify(response.data));

                    dispatch({
                        type: SIGNIN,
                        payload: response.data.access_token,
                    });

                    dispatch({
                        type: ISLOGGEDIN,
                        payload: true,
                    });

                    return response.data;
                }else{
                    ToastAndroid.showWithGravityAndOffset(
                        response.data.message,
                        ToastAndroid.LONG,
                        ToastAndroid.BOTTOM,
                        25,
                        50
                    );
                }
            }).catch(function(error){
                console.log(error);
            });
        }
    }catch(error){
        console.log(error);
    }
}

export const signOut = () => {
    try{
        return async dispatch => {
            await AsyncStorage.removeItem('userData');
    
            dispatch({
                type: SIGNOUT,
                payload: false,
            });
        }
    }catch(error){
        console.log(error);
    }
}

export const isLoggedIn = () => {
    try{
        return async dispatch => {
            await AsyncStorage.getItem('userData')
            .then(value => {
                if(value != null){
                    let data = JSON.parse(value);
                    axios.get(
                        `${baseUrl}/api/profile`, 
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + data.access_token
                            }
                        }
                    ).then(function(response){
                        if(response.data.status === "success"){
                            dispatch({
                                type: ISLOGGEDIN,
                                payload: true,
                            });
                        }else{
                            dispatch({
                                type: ISLOGGEDIN,
                                payload: false,
                            });

                            AsyncStorage.removeItem('userData');
                        }
                    }).catch(function(error){
                        console.log(error);
                        dispatch({
                            type: ISLOGGEDIN,
                            payload: false,
                        });

                        AsyncStorage.removeItem('userData');
                    });
                }else{
                    dispatch({
                        type: ISLOGGEDIN,
                        payload: false,
                    });
                }
            })

        }
    }catch(error){
        console.log(error);
    }
}

export const register = (request) => async (dispatch) => {
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
            `${baseUrl}/api/register`, 
            request,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
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

        dispatch({
            type: REGISTER,
            payload: req
        });

        return req;
    }catch(error){
        console.log(error);
    }
}

export const getProfile = () => {
    try{
        return async dispatch => {
            await AsyncStorage.getItem('userData')
            .then(value => {
                if(value != null){
                    let data = JSON.parse(value);
                    axios.get(
                        `${baseUrl}/api/profile`, 
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + data.access_token
                            }
                        }
                    ).then(function(response){
                        // console.log("respponse : ", response.data);
                        if(response.data.status === "success"){
                            dispatch({
                                type: GET_PROFILE,
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

export const getDetailUser = (id) => {
    try{
        return async dispatch => {
            await AsyncStorage.getItem('userData')
            .then(value => {
                if(value != null){
                    let data = JSON.parse(value);
                    axios.get(
                        `${baseUrl}/api/detail-user/${id}`, 
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + data.access_token
                            }
                        }
                    ).then(function(response){
                        if(response.data.status === "success"){
                            dispatch({
                                type: GET_DETAIL_USER,
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

export const getAllUser = () => {
    try{
        return async dispatch => {
            await AsyncStorage.getItem('userData')
            .then(value => {
                if(value != null){
                    let data = JSON.parse(value);
                    axios.get(
                        `${baseUrl}/api/all-user`, 
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + data.access_token
                            }
                        }
                    ).then(function(response){
                        console.log("response data user : ", response.data);
                        if(response.data.status === "success"){
                            dispatch({
                                type: GET_ALL_USER,
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

export const getAllAdmin = () => {
    try{
        return async dispatch => {
            await AsyncStorage.getItem('userData')
            .then(value => {
                if(value != null){
                    let data = JSON.parse(value);
                    axios.get(
                        `${baseUrl}/api/all-admin`, 
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + data.access_token
                            }
                        }
                    ).then(function(response){
                        console.log("response data user : ", response.data);
                        if(response.data.status === "success"){
                            dispatch({
                                type: GET_ALL_ADMIN,
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

export const getAllSiswa = () => {
    try{
        return async dispatch => {
            await AsyncStorage.getItem('userData')
            .then(value => {
                if(value != null){
                    let data = JSON.parse(value);
                    axios.get(
                        `${baseUrl}/api/all-siswa`, 
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + data.access_token
                            }
                        }
                    ).then(function(response){
                        console.log("response data user : ", response.data);
                        if(response.data.status === "success"){
                            dispatch({
                                type: GET_ALL_SISWA,
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

export const getAllGuru = () => {
    try{
        return async dispatch => {
            await AsyncStorage.getItem('userData')
            .then(value => {
                if(value != null){
                    let data = JSON.parse(value);
                    axios.get(
                        `${baseUrl}/api/all-guru`, 
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + data.access_token
                            }
                        }
                    ).then(function(response){
                        if(response.data.status === "success"){
                            dispatch({
                                type: GET_ALL_GURU,
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

export const editProfileUser = (id, request) => async (dispatch) => {
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
            `${baseUrl}/api/edit-user/${id}`, 
            request,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
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

export const getTeacherById = (idKelas, idMapel) => {
    try{
        return async dispatch => {
            console.log(`${baseUrl}/api/get-teacher-by-class-id/${idKelas}/${idMapel}`);
            await AsyncStorage.getItem('userData')
            .then(value => {
                if(value != null){
                    let data = JSON.parse(value);
                    axios.get(
                        `${baseUrl}/api/get-teacher-by-class-id/${idKelas}/${idMapel}`, 
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + data.access_token
                            }
                        }
                    ).then(function(response){
                        // console.log("data guru : ", response.data);
                        if(response.data.status === "success"){
                            dispatch({
                                type: GETTEACHERBYID,
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