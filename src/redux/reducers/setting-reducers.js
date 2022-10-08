import { 
    DATAJK, 
    DATAKELAS, 
    DATAJABATAN, 
    DATAMAPEL,
    GETCLASSBYTEACHERID,
    DETAILKELAS,
} from "../types/setting";

const initialState = {
    load_setting: true,
    data_kelas: [],
    detail_kelas: [],
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
                load_setting: action.payload.loading,
                data_kelas: action.payload.data
            }
        case GETCLASSBYTEACHERID:
            return {
                ...state,
                load_setting: action.payload.loading,
                class_by_teacher_id: action.payload.data
            }
        case DETAILKELAS:
            return {
                ...state,
                load_setting: action.payload.loading,
                detail_kelas: action.payload.data
            }
        case DATAJK:
            return {
                ...state,
                load_setting: action.payload.loading,
                data_jk: action.payload.data
            }
        case DATAJABATAN:
            return {
                ...state,
                load_setting: action.payload.loading,
                data_jabatan: action.payload.data
            }
        case DATAMAPEL:
            return {
                ...state,
                load_setting: action.payload.loading,
                data_mapel: action.payload.data
            }
        default: 
            return state;
    }
}

export default settingReducer;