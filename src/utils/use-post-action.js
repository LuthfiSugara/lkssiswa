import { API } from './config/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastAndroid } from 'react-native';

export const UsePostAction = (url, type, queries, request, isFile) => async(dispatch) => {
    try{
        let qr = '?';
        if(queries != undefined){
            for(let query in queries){
                qr += `${query}=${queries[query]}&`
            }
            url += qr;
        }

        let token = '';
        await AsyncStorage.getItem('userData')
        .then(value => {
            if(value != null){
                let data = JSON.parse(value);
                token = data.access_token;
            }
        });
        
        let config = {};

        isFile ? config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer ' + token
            }
        } : config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        };
        
        const response = await API.post(url, request, config);
        console.log("response post : ", response);
        if(response.data.status == 'success'){
            ToastAndroid.showWithGravityAndOffset(
                response.data.message,
                ToastAndroid.LONG,
                ToastAndroid.TOP,
                25,
                50
            );
        }

        return response.data;
    } catch (err) {
        console.log("error: ", err);
    }
}