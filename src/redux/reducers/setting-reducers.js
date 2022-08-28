import { 
    DATAJK, 
    DATAKELAS, 
    DATAJABATAN, 
    DATAMAPEL,
    GETCLASSBYTEACHERID
} from "../types/setting";

const initialState = {
    loading: true,
    data_kelas: [],
    data_jk: [],
    data_jabatan: [],
    data_mapel: [],
    class_by_teacher_id: [],
}

const settingReducer = (state = initialState, action) => {
    switch(action.type){
        case DATAKELAS:
            return {
                ...state,
                loading: false,
                data_kelas: action.payload
            }
        case GETCLASSBYTEACHERID:
            return {
                ...state,
                loading: false,
                class_by_teacher_id: action.payload
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