import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';
export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});

export const postComment = (certificateId, rating, comment) => (dispatch) => {

    const newComment = {
        certificate: certificateId,
        rating: rating,
        comment: comment
    }

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'comments', {
            method: 'POST',
            body: JSON.stringify(newComment),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': bearer
            },
            credentials: 'same-origin'
        })
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(response => dispatch(addComment(response)))
        .catch(error => {

            alert('Your comment could not be posted\nError: ' + error.message);
        })
}

export const fetchCertificates = () => (dispatch) => {
    dispatch(certificatesLoading(true));

    return fetch(baseUrl + 'certificates')
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(certificates => dispatch(addCertificates(certificates)))
        .catch(error => dispatch(certificatesFailed(error.message)));
}

export const certificatesLoading = () => ({
    type: ActionTypes.CERTIFICATES_LOADING
});

export const certificatesFailed = (errmess) => ({
    type: ActionTypes.CERTIFICATES_FAILED,
    payload: errmess
});

export const addCertificates = (certificates) => ({
    type: ActionTypes.ADD_CERTIFICATES,
    payload: certificates
});

export const fetchLoggs = () => (dispatch) => {
    dispatch(loggsLoading(true));

    return fetch(baseUrl + 'loggs')
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(loggs => dispatch(addLoggs(loggs)))
        .catch(error => dispatch(loggsFailed(error.message)));
}

export const loggsLoading = () => ({
    type: ActionTypes.LOGGS_LOADING
});

export const loggsFailed = (errmess) => ({
    type: ActionTypes.LOGGS_FAILED,
    payload: errmess
});

export const addLoggs = (loggs) => ({
    type: ActionTypes.ADD_LOGGS,
    payload: loggs
});

export const deleteLoggs = () => (dispatch) => {
    const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch(baseUrl + 'loggs/', {
            method: "DELETE",
            headers: {
                'Authorization': bearer
            },
            credentials: "same-origin"
        })
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                throw error;
            })
        .then(response => response.json())
        .then(response => dispatch(addLoggs(response)))
        .catch(error => {
            alert('Logs could not be deleted\nError: ' + error.message);
        })
};

export const fetchComments = () => (dispatch) => {
    return fetch(baseUrl + 'comments')
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)))
        .catch(error => dispatch(commentsFailed(error.message)));
}

export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

export const fetchPromos = () => (dispatch) => {
    dispatch(promosLoading(true));

    return fetch(baseUrl + 'promotions')
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(promos => dispatch(addPromos(promos)))
        .catch(error => dispatch(promosFailed(error.message)));
}

export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errmess) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errmess
});

export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
});

export const fetchLeaders = () => (dispatch) => {
    dispatch(leadersLoading());
    return fetch(baseUrl + 'leaders')
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(leaders => dispatch(addLeaders(leaders)))
        .catch(error => dispatch(leadersFailed(error.message)));
}

export const leadersLoading = () => ({
    type: ActionTypes.LEADERS_LOADING
});

export const leadersFailed = (errmess) => ({
    type: ActionTypes.LEADERS_FAILED,
    payload: errmess
});

export const addLeaders = (leaders) => ({
    type: ActionTypes.ADD_LEADERS,
    payload: leaders
});

export const postFeedback = (feedback) => (dispatch) => {
    return fetch(baseUrl + 'feedback', {
            method: "POST",
            body: JSON.stringify(feedback),
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "same-origin"
        })
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                throw error;
            })
        .then(response => response.json())
        .then(response => {

            alert('Thank you for your feedback!\n' + JSON.stringify(response));
        })
        .catch(error => {

            alert('Your feedback could not be posted\nError: ' + error.message);
        });
};

export const requestLogin = (creds) => {
    return {
        type: ActionTypes.LOGIN_REQUEST,
        creds
    }
}

export const receiveLogin = (response) => {
    return {
        type: ActionTypes.LOGIN_SUCCESS,
        token: response.token
    }
}

export const loginError = (message) => {
    return {
        type: ActionTypes.LOGIN_FAILURE,
        message
    }
}

export const loginUser = (creds) => (dispatch) => {
    dispatch(requestLogin(creds));
    return fetch(baseUrl + 'users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(creds)
        })
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;

                    alert('Error: username or password is incorrect!' + error.message);

                }
            },
            error => {
                alert('Error: username or password is incorrect!' + error.message);
            })
        .then(response => response.json())
        .then(response => {
            if (response.success) {
                localStorage.setItem('token', response.token);
                localStorage.setItem('creds', JSON.stringify(creds));
                dispatch(fetchFavorites());
                dispatch(receiveLogin(response));
            } else {
                var error = new Error('Error ' + response.status);
                error.response = response;
                throw error;
            }
        })
        .catch(error => dispatch(loginError(error.message)))
};

export const requestSignup = (creds) => {
    return {
        type: ActionTypes.SIGNUP_REQUEST,
        creds
    }
}

export const receiveSignup = (response) => {
    return {
        type: ActionTypes.SIGNUP_SUCCESS,
        token: response.token
    }
}

export const signupError = (message) => {
    return {
        type: ActionTypes.SIGNUP_FAILURE,
        message
    }
}

export const signupUser = (creds) => (dispatch) => {
    dispatch(requestSignup(creds));

    return fetch(baseUrl + 'users/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(creds)
        })
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    alert('Error: could not sign you up!' + error.message);
                }
            },
            error => {
                //throw error;
                alert('Error: could not sign you up!' + error.message);
            })
        .then(response => response.json())
        .then(response => {
            if (response.success) {
                alert('Thank you for your sign up! You can log in now');
                dispatch(receiveSignup(response));
            } else {
                var error = new Error('Error ' + response.status);
                error.response = response;
                throw error;
            }
        })
        .catch(error => dispatch(signupError(error.message)))
};

export const requestLogout = () => {
    return {
        type: ActionTypes.LOGOUT_REQUEST
    }
}

export const receiveLogout = () => {
    return {
        type: ActionTypes.LOGOUT_SUCCESS
    }
}

export const logoutUser = () => (dispatch) => {
    dispatch(requestLogout())
    localStorage.removeItem('token');
    localStorage.removeItem('creds');
    dispatch(favoritesFailed("Error 401: Unauthorized"));
    dispatch(receiveLogout())
}

export const postFavorite = (certificateId) => (dispatch) => {

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'favorites/' + certificateId, {
            method: "POST",
            body: JSON.stringify({ "_id": certificateId }),
            headers: {
                "Content-Type": "application/json",
                'Authorization': bearer
            },
            credentials: "same-origin"
        })
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                throw error;
            })
        .then(response => response.json())
        .then(favorites => {

            dispatch(addFavorites(favorites));
        })
        .catch(error => dispatch(favoritesFailed(error.message)));
}

export const deleteFavorite = (certificateId) => (dispatch) => {

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'favorites/' + certificateId, {
            method: "DELETE",
            headers: {
                'Authorization': bearer
            },
            credentials: "same-origin"
        })
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                throw error;
            })
        .then(response => response.json())
        .then(favorites => {

            dispatch(addFavorites(favorites));
        })
        .catch(error => dispatch(favoritesFailed(error.message)));
};

export const fetchFavorites = () => (dispatch) => {
    dispatch(favoritesLoading(true));

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'favorites', {
            headers: {
                'Authorization': bearer
            },
        })
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(favorites => dispatch(addFavorites(favorites)))
        .catch(error => dispatch(favoritesFailed(error.message)));
}

export const favoritesLoading = () => ({
    type: ActionTypes.FAVORITES_LOADING
});

export const favoritesFailed = (errmess) => ({
    type: ActionTypes.FAVORITES_FAILED,
    payload: errmess
});

export const addFavorites = (favorites) => ({
    type: ActionTypes.ADD_FAVORITES,
    payload: favorites
});