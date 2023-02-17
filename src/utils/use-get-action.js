import { API } from './config/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UseGetAction = (url, type, queries) => async(dispatch) => {
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

        await dispatch({
            type: type,
            payload: {
                loading: true,
                data : [],
            }
        });
        
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        };

        const response = await API(url, config);
        
        if(response.data.status == 'success'){
            await dispatch({
                type: type,
                payload: {
                    loading: false,
                    data: response.data.data
                }
            });
        }

        return response.data;
    } catch (err) {
        console.log("error: ", err);
    }
}