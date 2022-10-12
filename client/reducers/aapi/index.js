const aapiReducer = (state, action) => {


    switch (action.type) {
        case AAPI_OPTIONS.SET_PROVIDER_CONTRACT: return { ...state, providerContract: action.payload };
        case AAPI_OPTIONS.ISCONTRACTACTIVE: return { ...state, isContractActive: action.payload };
        case AAPI_OPTIONS.ERROR: return { ...state, error: true, errorMessage: action.payload };
        case AAPI_OPTIONS.SET_SIGNER_CONTRACT: return { ...state, signerContract: action.payload };
        default: return state;
    }
}

const AAPI_INITIAL_STATE = {
    providerContract: {},
    signerContract:{},
    isContractActive: false,
    error: false,
    errorMessage: ""
}


const AAPI_OPTIONS = {
    SET_PROVIDER_CONTRACT: "SET_PROVIDER_CONTRACT",
    SET_SIGNER_CONTRACT: "SET_SIGNER_CONTRACT",
    ISCONTRACTACTIVE :"ISCONTRACTACTIVE",
    ERROR: 'ERROR',
}



export { aapiReducer, AAPI_INITIAL_STATE, AAPI_OPTIONS }