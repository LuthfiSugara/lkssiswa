import { DATAJK, DATAKELAS, DATAJABATAN, DATAMAPEL } from "../types/setting";

const initialState = {
    loading: true,
    data_kelas: [],
    data_jk: [],
    data_jabatan: [],
    data_mapel: [],
}

const settingReducer = (state = initialState, action) => {
    switch(action.type){
        case DATAKELAS:
            return {
                ...state,
                loading: false,
                data_kelas: action.payload
            }
        case DATAJK:
            return {
                ...state,
                loading: false,
                data_jk: action.payload
            }
        case DATAJABATAN:
            return {
                ...state,
                loading: false,
                data_jabatan: action.payload
            }
        case DATAMAPEL:
            return {
                ...state,
                loading: false,
                data_mapel: action.payload
            }
        default: 
            return state;
    }
}

export default settingReducer;