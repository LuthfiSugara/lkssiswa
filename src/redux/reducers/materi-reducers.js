import { 
    GETMATERI,
    GETDETAILMATERI
} from "../types/materi";

const initialState = {
    load_materi: true,
    materi: [],
    detail_materi: [],
}

const materiReducer = (state = initialState, action) => {
    switch(action.type){
        case GETMATERI:
            return {
                ...state,
                load_materi: action.payload.loading,
                materi: action.payload.data
            }
        case GETDETAILMATERI:
            return {
                ...state,
                load_materi: action.payload.loading,
                detail_materi: action.payload.data
            }
        default: 
            return state;
    }
}

export default materiReducer;