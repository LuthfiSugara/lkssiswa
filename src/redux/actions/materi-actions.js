import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { baseUrl } from "../../utils/global";

import { 
    GETMATERI,
    GETDETAILMATERI,
    UPDATEMATERI,
    ADDMATERI,
} from "../types/materi";
import { ToastAndroid } from "react-native";
import { UseGetAction } from "../../utils/use-get-action";
import { UsePostAction } from "../../utils/use-post-action";

export const addMateri = (data) => 
    UsePostAction(
        'add-materi',
        ADDMATERI,
        undefined,
        data,
        true,
    );

export const getMateri = (id_mapel, id_kelas, id_guru) => 
    UseGetAction(
        'materi',
        GETMATERI,
        {id_mapel: id_mapel, id_kelas: id_kelas, id_guru: id_guru}
    );

export const getDetailMateri = (id_materi) => 
    UseGetAction(
        'detail-materi',
        GETDETAILMATERI,
        {id_materi: id_materi}
    );

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

export const updateMateri = (data, id) =>
    UsePostAction(
        'update-materi',
        UPDATEMATERI,
        {id: id},
        data,
        true,
    );