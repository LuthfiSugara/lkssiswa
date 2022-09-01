import { 
    DETAILKELAS
} from "../types/class";

const initialState = {
    loading: true,
    detail_kelas: [],
}

const classReducer = (state = initialState, action) => {
    switch(action.type){
        case DETAILKELAS:
            return {
                ...state,
                loading: false,
                detail_kelas: action.payload
            }
        default: 
            return state;
    }
}

export default classReducer;