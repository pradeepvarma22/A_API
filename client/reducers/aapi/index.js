const aapiReducer = (state, action) => {


    switch (action.type) {
        case AAPI_OPTIONS.API_STATUS: return {...state,apiStatus:action.payload };
        case AAPI_OPTIONS.API_KEY: return {...state,apiKey:action.payload };
        case AAPI_OPTIONS.ERROR: return { ...state, error: true, errorMessage: action.payload };
        case AAPI_OPTIONS.SET_LOADING: return { ...state, loading: action.payload };

        default: return state;
    }
}

const AAPI_INITIAL_STATE = {
    loading: false,
    apiStatus: false,
    apiKey: "",
    error: false,
    errorMessage: ""
}


const AAPI_OPTIONS = {
    API_STATUS: 'API_STATUS',
    API_KEY:'API_KEY',
    ERROR: 'ERROR',
    SET_LOADING: 'SET_LOADING'
}



export { aapiReducer, AAPI_INITIAL_STATE, AAPI_OPTIONS }