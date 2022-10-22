import { 
    DETAILKELAS
} from "../types/class";

const initialState = {
    load_class: true,
    detail_kelas: [],
}

const classReducer = (state = initialState, action) => {
    switch(action.type){
        case DETAILKELAS:
            return {
                ...state,
                loading: action.payload.loading,
                detail_kelas: action.payload.data
            }
        default: 
            return state;
    }
}

export default classReducer;