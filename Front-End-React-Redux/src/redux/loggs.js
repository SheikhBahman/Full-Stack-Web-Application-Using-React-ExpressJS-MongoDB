import * as ActionTypes from './ActionTypes';

export const Loggs = (state = {
    isLoading: true,
    errMess: null,
    loggs: []
}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_LOGGS:
            return {...state, isLoading: false, errMess: null, loggs: action.payload };

        case ActionTypes.LOGGS_LOADING:
            return {...state, isLoading: true, errMess: null, loggs: [] };

        case ActionTypes.LOGGS_FAILED:
            return {...state, isLoading: false, errMess: action.payload, loggs: [] };

        default:
            return state;
    }
}