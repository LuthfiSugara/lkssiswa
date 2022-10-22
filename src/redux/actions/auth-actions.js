import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { ToastAndroid } from "react-native";
import { baseUrl } from "../../utils/global";
import { UseGetAction } from "../../utils/use-get-action";
import { UsePostAction } from "../../utils/use-post-action";

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

export const getProfile = () => 
    UseGetAction(
        'profile',
        GET_PROFILE, 
        undefined,
    );

export const getDetailUser = (id) => 
    UseGetAction(
        'detail-user',
        GET_DETAIL_USER, 
        {id: id},
    );

export const getAllUser = () => 
    UseGetAction(
        'all-user',
        GET_ALL_USER, 
        undefined,
    );

export const getAllAdmin = () => 
    UseGetAction(
        'all-admin',
        GET_ALL_ADMIN, 
        undefined,
    );

// export const getAllAdmin = () => {
//     try{
//         return async dispatch => {
//             await AsyncStorage.getItem('userData')
//             .then(value => {
//                 if(value != null){
//                     let data = JSON.parse(value);
//                     axios.get(
//                         `${baseUrl}/api/all-admin`, 
//                         {
//                             headers: {
//                                 'Content-Type': 'application/json',
//                                 'Authorization': 'Bearer ' + data.access_token
//                             }
//                         }
//                     ).then(function(response){
//                         console.log("response data user : ", response.data);
//                         if(response.data.status === "success"){
//                             dispatch({
//                                 type: GET_ALL_ADMIN,
//                                 payload: response.data.data,
//                             });
//                         }
//                     }).catch(function(error){
//                         console.log(error);
//                     });
//                 }
//             })
//         }
//     }catch(error){
//         console.log(error);
//     }
// }

export const getAllSiswa = () => 
    UseGetAction(
        'all-siswa',
        GET_ALL_SISWA,
        undefined,
    );

export const getAllGuru = () => 
    UseGetAction(
        'all-guru',
        GET_ALL_GURU, 
        undefined,
    );

export const editProfileUser = (data) => 
    UsePostAction(
        'edit-user',
        EDIT_USER, 
        undefined,
        data,
        true,
    );

export const getTeacherById = (id_kelas, id_mapel) => 
    UseGetAction(
        'get-teacher-by-class-id',
        GETTEACHERBYID,
        {id_kelas: id_kelas, id_mapel: id_mapel}
    );