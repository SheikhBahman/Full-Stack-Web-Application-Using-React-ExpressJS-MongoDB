import * as ActionTypes from './ActionTypes';

export const Certificates = (state = {
    isLoading: true,
    errMess: null,
    certificates: []
}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_CERTIFICATES:
            return {...state, isLoading: false, errMess: null, certificates: action.payload };

        case ActionTypes.CERTIFICATES_LOADING:
            return {...state, isLoading: true, errMess: null, certificates: [] };

        case ActionTypes.CERTIFICATES_FAILED:
            return {...state, isLoading: false, errMess: action.payload, certificates: [] };

        default:
            return state;
    }
}