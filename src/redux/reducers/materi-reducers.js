import { 
    GETMATERI,
    GETDETAILMATERI
} from "../types/materi";

const initialState = {
    loading: true,
    materi: [],
    detail_materi: [],
}

const materiReducer = (state = initialState, action) => {
    switch(action.type){
        case GETMATERI:
            return {
                ...state,
                loading: false,
                materi: action.payload
            }
        case GETDETAILMATERI:
            return {
                ...state,
                loading: false,
                detail_materi: action.payload
            }
        default: 
            return state;
    }
}

export default materiReducer;