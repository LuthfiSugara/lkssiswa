
import { DETAILMAPEL } from "../types/mapel";

const initialState = {
    loading: true,
    detail_mapel: [],
}

const mapelReducer = (state = initialState, action) => {
    switch(action.type){
        case DETAILMAPEL:
            return {
                ...state,
                loading: false,
                detail_mapel: action.payload
            }
        default: 
            return state;
    }
}

export default mapelReducer;