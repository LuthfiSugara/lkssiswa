import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { baseUrl } from "../global";

export const API = axios.create({
    baseURL: baseUrl + '/api/',
});

export const getToken = async() => {
    let token = "";
    await AsyncStorage.getItem('userData')
    .then(value => {
        if(value != null){
            let data = JSON.parse(value);
            token = data.access_token;
        }
    });

    consosole.log(token);
}