import { 
    SIGNIN, 
    SIGNOUT, 
    ISLOGGEDIN, 
    REGISTER, 
    GET_PROFILE,
    GET_ALL_USER,
    GET_DETAIL_USER,
    GET_DETAIL_ADMIN,
    GET_ALL_ADMIN,
    GET_ALL_GURU,
    GET_ALL_SISWA,
    GETTEACHERBYID,
} from "../types/auth";

const initialState = {
    load_auth: true,
    access_token: "",
    sign_out: "",
    is_logged_in: true,
    status: "",
    message: "",
    profile: [],
    list_user: [],
    list_admin: [],
    list_guru: [],
    list_siswa: [],
    detail_user: [],
    teacher_by_id: [],
}

const userReducer = (state = initialState, action) => {
    switch(action.type){
        case SIGNIN:
            return {
                ...state,
                load_auth: false,
                access_token: action.payload
            }
        case SIGNOUT:
            return {
                ...state,
                load_auth: false,
                is_logged_in: action.payload
            }
        case REGISTER:
            return {
                ...state,
                load_auth: false,
                // message: action.payload
            }
        case ISLOGGEDIN:
            return {
                ...state,
                load_auth: false,
                is_logged_in: action.payload
            }
        case GET_PROFILE:
            return {
                ...state,
                load_auth: action.payload.loading,
                profile: action.payload.data
            }
        case GET_ALL_USER:
            return {
                ...state,
                load_auth: action.payload.loading,
                list_user: action.payload.data
            }
        case GET_ALL_ADMIN:
            return {
                ...state,
                load_auth: action.payload.loading,
                list_admin: action.payload.data
            }
        case GET_ALL_GURU:
            return {
                ...state,
                load_auth: action.payload.loading,
                list_guru: action.payload.data
            }
        case GET_ALL_SISWA:
            return {
                ...state,
                load_auth: action.payload.loading,
                list_siswa: action.payload.data
            }
        case GET_DETAIL_USER:
            return {
                ...state,
                load_auth: action.payload.loading,
                detail_user: action.payload.data,
            }
        case GETTEACHERBYID:
            return {
                ...state,
                load_auth: action.payload.loading,
                teacher_by_id: action.payload.data
            }
        default: 
            return state;
    }
}

export default userReducer;