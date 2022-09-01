import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { baseUrl } from "../../utils/global";

import { 
    DETAILKELAS
} from "../types/class";
import { ToastAndroid } from "react-native";

export const getDetailClass = (id) => {
    try{
        return async dispatch => {
            await AsyncStorage.getItem('userData')
            .then(value => {
                if(value != null){
                    let data = JSON.parse(value);
                    axios.get(
                        `${baseUrl}/api/detail-kelas/${id}`, 
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + data.access_token
                            }
                        }
                    ).then(function(response){
                        if(response.data.status === "success"){
                            dispatch({
                                type: DETAILKELAS,
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