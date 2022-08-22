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
    loading: true,
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
                loading: false,
                access_token: action.payload
            }
        case SIGNOUT:
            return {
                ...state,
                loading: false,
                is_logged_in: action.payload
            }
        case REGISTER:
            return {
                ...state,
                loading: false,
                // message: action.payload
            }
        case ISLOGGEDIN:
            return {
                ...state,
                loading: false,
                is_logged_in: action.payload
            }
        case GET_PROFILE:
            return {
                ...state,
                loading: false,
                profile: action.payload
            }
        case GET_ALL_USER:
            return {
                ...state,
                loading: false,
                list_user: action.payload
            }
        case GET_ALL_ADMIN:
            return {
                ...state,
                loading: false,
                list_admin: action.payload
            }
        case GET_ALL_GURU:
            return {
                ...state,
                loading: false,
                list_guru: action.payload
            }
        case GET_ALL_SISWA:
            return {
                ...state,
                loading: false,
                list_siswa: action.payload
            }
        case GET_DETAIL_USER:
            return {
                ...state,
                loading: false,
                detail_user: action.payload
            }
        case GETTEACHERBYID:
            return {
                ...state,
                loading: false,
                teacher_by_id: action.payload
            }
        default: 
            return state;
    }
}

export default userReducer;